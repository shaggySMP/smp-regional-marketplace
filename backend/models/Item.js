const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics', 
      'Furniture', 
      'Clothing', 
      'Books', 
      'Sports', 
      'Home & Garden', 
      'Toys & Games', 
      'Other'
    ]
  },
  images: [{
    type: String
  }],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  country: {
    type: String,
    required: true,
    enum: ['Latvia', 'Estonia', 'Lithuania']
  },
  isSold: {
    type: Boolean,
    default: false
  },
  isReceived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
