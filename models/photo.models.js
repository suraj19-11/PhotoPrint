const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  customization: {
    copies: { type: Number, default: 1 },
    size: { type: String, enum: ['A1', 'A2', 'A3', 'A4', 'A5'], required: true },
    colorMode: { type: String, enum: ['Coloured', 'b/W'], required: true }
  },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  address: {
    fullAddress: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photo', photoSchema);
