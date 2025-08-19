import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const paymentDetailsSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'cash'],
  },
  phone: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
  },
  cardName: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    paymentDetails: paymentDetailsSchema,
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;