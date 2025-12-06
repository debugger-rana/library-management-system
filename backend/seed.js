const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ username: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    // Create admin user
    await User.create({
      username: 'admin',
      password: 'admin123',
      name: 'System Administrator',
      email: 'admin@library.com',
      phone: '1234567890',
      role: 'admin'
    });

    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
