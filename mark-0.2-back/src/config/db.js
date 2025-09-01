const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' }); // Correct path to .env

const connectDB = async () => {
  try {
    // Use the MONGO_URI from the .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit the process with a failure code
    process.exit(1);
  }
};

module.exports = connectDB;