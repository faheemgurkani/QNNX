import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
    features: ['Bluetooth 5.0', '30-hour battery life', 'Noise cancellation', 'Built-in mic'],
    category: 'Electronics',
    countInStock: 15,
    rating: 4.5,
    reviewCount: 128,
    isNew: true
  },
  {
    name: 'Smartphone X Pro',
    price: 899.99,
    description: 'Latest flagship smartphone with advanced camera system',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    features: ['6.7" OLED display', 'Triple camera system', '128GB storage', '5G capable'],
    category: 'Electronics',
    countInStock: 8,
    rating: 4.8,
    reviewCount: 245,
    discount: 10
  },
  {
    name: 'Smart Watch Series 5',
    price: 249.99,
    description: 'Feature-packed smartwatch with health monitoring',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    features: ['Heart rate monitor', 'GPS', 'Water resistant', '7-day battery'],
    category: 'Electronics',
    countInStock: 12,
    rating: 4.3,
    reviewCount: 89,
    isNew: true
  },
  {
    name: 'Wireless Charging Pad',
    price: 29.99,
    description: 'Fast wireless charging pad for Qi-enabled devices',
    image: 'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg',
    features: ['10W fast charging', 'LED indicator', 'Compact design'],
    category: 'Electronics',
    countInStock: 25,
    rating: 4.0,
    reviewCount: 56
  },
  {
    name: 'Premium Laptop Backpack',
    price: 49.99,
    description: 'Durable backpack with padded laptop compartment',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    features: ['Fits 15" laptop', 'Multiple compartments', 'Water-resistant'],
    category: 'Accessories',
    countInStock: 20,
    rating: 4.2,
    reviewCount: 42,
    discount: 15
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    description: 'Insulated water bottle that keeps drinks cold for 24 hours',
    image: 'https://images.pexels.com/photos/6606354/pexels-photo-6606354.jpeg',
    features: ['24-hour cold retention', 'Leak-proof lid', 'BPA-free'],
    category: 'Accessories',
    countInStock: 30,
    rating: 4.6,
    reviewCount: 112
  },
  {
    name: 'Advanced Fitness Tracker',
    price: 79.99,
    description: 'Track your steps, sleep, and workouts with this fitness band',
    image: 'https://images.pexels.com/photos/3763878/pexels-photo-3763878.jpeg',
    features: ['Step counter', 'Sleep tracker', 'Heart rate monitor', 'Water resistant'],
    category: 'Electronics',
    countInStock: 18,
    rating: 4.4,
    reviewCount: 76,
    isNew: true
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    description: 'Compact speaker with surprisingly powerful sound',
    image: 'https://images.pexels.com/photos/2040809/pexels-photo-2040809.jpeg',
    features: ['12-hour battery', 'IPX7 waterproof', 'Bluetooth 5.0'],
    category: 'Electronics',
    countInStock: 14,
    rating: 4.7,
    reviewCount: 203,
    discount: 20
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();