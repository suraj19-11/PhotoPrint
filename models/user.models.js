const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String
    
    
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // You can increase security here
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  address: {
    type: String
    
  },
  phone: {
    type: String
    
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;
