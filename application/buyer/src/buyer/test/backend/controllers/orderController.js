import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    // Get user cart with product details
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product', 'name price stock');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    // Check stock for all items before processing
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${product.name}. Only ${product.stock} available.` 
        });
      }
    }

    // Update product stocks
    const bulkOps = cart.items.map(item => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { stock: -item.quantity } }
      }
    }));

    await Product.bulkWrite(bulkOps);

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        name: item.product.name
      })),
      paymentDetails: req.body.paymentDetails,
      shippingAddress: req.body.shippingAddress,
      total: cart.total,
      status: 'processing'
    });

    // Clear cart by modifying and saving the existing document
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json({ 
      message: 'Order created successfully',
      order 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to create order',
      error: error.message 
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name image');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name image');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};