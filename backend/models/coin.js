const mongoose = require('mongoose');

// Define the schema for the cryptocurrency prices
const cryptoPriceSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true, // Coin name (e.g., 'solana', 'ethereum')
    unique: true,
    trim: true,
  },
  price: {
    usd: {
      type: Number,
      required: true, // Price in USD
    },
    inr: {
      type: Number,
      required: true, // Price in INR
    },
  },
//   lastUpdated: {
//     type: Date,
//     default: Date.now, // Time when the price was last updated
//   },
}, {
  timestamps: true // Correct way to enable timestamps
});

// Create the model from the schema
const CryptoPrice = mongoose.model('CryptoPrice', cryptoPriceSchema);

module.exports = CryptoPrice;
