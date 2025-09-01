const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
    trim: true, // Removes whitespace from the beginning and end
    lowercase: true // Stores the email in lowercase
  },
  password: {
    type: String,
    required: true
  }
});

// Create and export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;
