import mongoose from "mongoose";

const CatalogItemSchema = new mongoose.Schema({
  providerId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  pricePKR: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  fulfilmentType: { type: String, default: "GOODS" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model("CatalogItem", CatalogItemSchema)
