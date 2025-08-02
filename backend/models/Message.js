const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  isOffer: {
    type: Boolean,
    default: false
  },
  offerAmount: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
