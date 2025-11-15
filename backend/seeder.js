require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Order = require('./src/models/Order');

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  }
];

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    price: 79.99,
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
    numReviews: 120,
    image: 'https://via.placeholder.com/300?text=Headphones'
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    rating: 4.3,
    numReviews: 85,
    image: 'https://via.placeholder.com/300?text=Smart+Watch'
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes with excellent cushioning',
    price: 89.99,
    category: 'Sports',
    stock: 100,
    rating: 4.7,
    numReviews: 200,
    image: 'https://via.placeholder.com/300?text=Running+Shoes'
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with 12-cup capacity',
    price: 49.99,
    category: 'Home & Kitchen',
    stock: 40,
    rating: 4.4,
    numReviews: 150,
    image: 'https://via.placeholder.com/300?text=Coffee+Maker'
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap',
    price: 29.99,
    category: 'Sports',
    stock: 75,
    rating: 4.6,
    numReviews: 95,
    image: 'https://via.placeholder.com/300?text=Yoga+Mat'
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with USB charging port',
    price: 34.99,
    category: 'Home & Kitchen',
    stock: 60,
    rating: 4.2,
    numReviews: 75,
    image: 'https://via.placeholder.com/300?text=Desk+Lamp'
  },
  {
    name: 'Backpack',
    description: 'Water-resistant backpack with laptop compartment',
    price: 59.99,
    category: 'Other',
    stock: 45,
    rating: 4.5,
    numReviews: 110,
    image: 'https://via.placeholder.com/300?text=Backpack'
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI',
    price: 24.99,
    category: 'Electronics',
    stock: 80,
    rating: 4.3,
    numReviews: 140,
    image: 'https://via.placeholder.com/300?text=Wireless+Mouse'
  }
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdProducts = await Product.insertMany(products);

    console.log('Data Imported!');
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdProducts.length} products`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
