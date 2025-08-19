import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product', 'name price image stock');

    res.status(200).json({
      cart: {
        items: cart?.items.map(item => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
          stock: item.product.stock
        })) || [],
        total: cart?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({ 
        message: `Only ${product.stock} items available in stock` 
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [], total: 0 });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId.toString()
    );

    if (itemIndex >= 0) {
      // Check if adding more exceeds stock
      const newQuantity = cart.items[itemIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ 
          message: `Cannot add more than available stock (${product.stock})` 
        });
      }
      cart.items[itemIndex].quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    cart.total = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price image stock');

    res.status(200).json({
      cart: {
        items: populatedCart.items.map(item => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
          stock: item.product.stock
        })),
        total: populatedCart.total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    cart.total = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product', 'name price image stock');

    res.status(200).json({
      cart: {
        items: populatedCart.items.map(item => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
          stock: item.product.stock
        })),
        total: populatedCart.total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json({
      cart: {
        items: [],
        total: 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};