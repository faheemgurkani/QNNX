import express from 'express';
const router = express.Router();
import CatalogItem from '../models/CatalogItem.js';

// Create
router.post('/', async (req, res) => {
  try {
    const { name, description, category, pricePKR, stock, fulfilmentType, isActive, providerId } = req.body;

    if (!providerId || !name || !pricePKR) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const item = new CatalogItem({
      providerId,
      name,
      description,
      category,
      pricePKR,
      stock,
      fulfilmentType,
      isActive
    });

    await item.save();
    res.json(item);
  } catch (err) {
    console.error("❌ Catalog POST error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// List
router.get('/', async (req, res) => {
  try {
    const { providerId } = req.query;
    if (!providerId) return res.json([]);
    const items = await CatalogItem.find({ providerId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle active
router.patch('/:id/toggle', async (req, res) => {
  try {
    const item = await CatalogItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    item.isActive = !item.isActive;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await CatalogItem.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
