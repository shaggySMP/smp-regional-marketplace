const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Chat', chatSchema);
