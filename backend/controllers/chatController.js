const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');

// @desc    Get all chats for a user
// @route   GET /api/chats
// @access  Private
const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ participants: req.user._id })
    .populate('itemId', 'title images')
    .populate('participants', 'email profilePhoto');
  
  res.json(chats);
});

// @desc    Get messages for a chat
// @route   GET /api/chats/:id/messages
// @access  Private
const getChatMessages = asyncHandler(async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  
  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }
  
  // Check if user is a participant in the chat
  if (!chat.participants.includes(req.user._id)) {
    res.status(401);
    throw new Error('Not authorized to view this chat');
  }
  
  const messages = await Message.find({ chatId: req.params.id })
    .populate('senderId', 'email');
  
  res.json(messages);
});

// @desc    Send a message in a chat
// @route   POST /api/chats/:id/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { text, isOffer, offerAmount } = req.body;
  
  const chat = await Chat.findById(req.params.id);
  
  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }
  
  // Check if user is a participant in the chat
  if (!chat.participants.includes(req.user._id)) {
    res.status(401);
    throw new Error('Not authorized to send messages in this chat');
  }
  
  const message = new Message({
    chatId: req.params.id,
    senderId: req.user._id,
    text,
    isOffer: isOffer || false,
    offerAmount: offerAmount || undefined,
  });
  
  const createdMessage = await message.save();
  
  // Populate sender info before sending response
  await createdMessage.populate('senderId', 'email');
  
  res.status(201).json(createdMessage);
});

// @desc    Create a chat for an item
// @route   POST /api/chats
// @access  Private
const createChat = asyncHandler(async (req, res) => {
  const { itemId } = req.body;
  
  // Check if item exists
  const item = await Item.findById(itemId);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // Check if chat already exists between these users for this item
  let chat = await Chat.findOne({
    itemId: item._id,
    participants: { $all: [req.user._id, item.sellerId] }
  });
  
  // If chat doesn't exist, create it
  if (!chat) {
    chat = new Chat({
      itemId: item._id,
      participants: [req.user._id, item.sellerId]
    });
    
    const createdChat = await chat.save();
    
    // Populate item and participants before sending response
    await createdChat.populate('itemId', 'title');
    await createdChat.populate('participants', 'email');
    
    res.status(201).json(createdChat);
  } else {
    // If chat exists, return it
    await chat.populate('itemId', 'title');
    await chat.populate('participants', 'email');
    
    res.json(chat);
  }
});

module.exports = {
  getChats,
  getChatMessages,
  sendMessage,
  createChat,
};
