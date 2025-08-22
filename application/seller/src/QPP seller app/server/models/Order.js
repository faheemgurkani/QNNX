import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qapId: String,
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'CatalogItem' },
    qty: Number,
    pricePKR: Number
  }],
  totals: {
    subtotal: Number,
    grandTotalPKR: Number
  },
  status: { type: String, enum: ['PENDING','CONFIRMED','FULFILLED','COMPLETED','CANCELLED'], default: 'PENDING' },
  paymentStatus: { type: String, enum: ['PENDING','CAPTURED','REFUNDED','FAILED'], default: 'PENDING' },
  shipping: {
    address: String,
    city: String,
    province: String,
    postalCode: String
  },
  service: {
    slotStart: Date,
    slotEnd: Date,
    locationType: String,
    location: String
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
