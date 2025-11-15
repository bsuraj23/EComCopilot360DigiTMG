const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');

const connectDB = require('./config/db');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  },
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Headphones',
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Smart+Watch',
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 19.99,
    category: 'Clothing',
    stock: 100,
    image: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=T-Shirt',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes for all terrains',
    price: 79.99,
    category: 'Sports',
    stock: 45,
    image: 'https://via.placeholder.com/300/FFFF00/000000?text=Running+Shoes',
  },
  {
    name: 'JavaScript Book',
    description: 'Comprehensive guide to modern JavaScript',
    price: 39.99,
    category: 'Books',
    stock: 75,
    image: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=JS+Book',
  },
  {
    name: 'Coffee Maker',
    description: 'Automatic coffee maker with programmable timer',
    price: 59.99,
    category: 'Home & Kitchen',
    stock: 25,
    image: 'https://via.placeholder.com/300/00FFFF/000000?text=Coffee+Maker',
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap',
    price: 29.99,
    category: 'Sports',
    stock: 60,
    image: 'https://via.placeholder.com/300/FFA500/FFFFFF?text=Yoga+Mat',
  },
  {
    name: 'Building Blocks Set',
    description: 'Creative building blocks for kids',
    price: 34.99,
    category: 'Toys',
    stock: 40,
    image: 'https://via.placeholder.com/300/800080/FFFFFF?text=Building+Blocks',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    console.log('Cleared existing data');

    // Insert users
    await User.insertMany(users);
    console.log('Users seeded');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded');

    console.log('Database seeded successfully!');
    console.log('\nYou can now login with:');
    console.log('Admin - email: admin@ecommerce.com, password: admin123');
    console.log('User - email: john@example.com, password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
