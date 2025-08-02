const express = require('express');
const router = express.Router();
const {
  getChats,
  getChatMessages,
  sendMessage,
  createChat,
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getChats)
  .post(protect, createChat);

router.route('/:id/messages')
  .get(protect, getChatMessages)
  .post(protect, sendMessage);

module.exports = router;
