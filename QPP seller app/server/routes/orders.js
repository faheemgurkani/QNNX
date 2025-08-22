import express from 'express';
const router = express.Router();
import Order from '../models/Order.js';
import CatalogItem from '../models/CatalogItem.js';

// Create order (simple)
router.post('/', async (req, res) => {
  try {
    const order = new Order({ ...req.body, status: 'PENDING' });
    await order.save();
    res.json(order);
  } catch (err) { res.status(500).send(err.message) }
});

// List orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ providerId: req.query.providerId }).populate('items.itemId');
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Confirm
router.post('/:id/confirm', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.itemId');
    if (!order) return res.status(404).send('Order not found');
    for (let it of order.items) {
      if (it.itemId.stock < it.qty) return res.status(400).json({ error: 'OUT_OF_STOCK' });
    }
    for (let it of order.items) {
      it.itemId.stock -= it.qty;
      await it.itemId.save();
    }
    order.status = 'CONFIRMED';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Complete
router.post('/:id/complete', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = 'COMPLETED';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Cancel
router.post('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = 'CANCELLED';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
