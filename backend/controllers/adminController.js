const User = require('../models/User');
const Item = require('../models/Item');
const Chat = require('../models/Chat');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Ban a user
// @route   PUT /api/admin/users/:id/ban
// @access  Private/Admin
const banUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  user.isBanned = true;
  const updatedUser = await user.save();
  
  res.json({ message: `User ${updatedUser.email} has been banned` });
});

// @desc    Suspend a user
// @route   PUT /api/admin/users/:id/suspend
// @access  Private/Admin
const suspendUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  user.isSuspended = true;
  const updatedUser = await user.save();
  
  res.json({ message: `User ${updatedUser.email} has been suspended` });
});

// @desc    Get all items
// @route   GET /api/admin/items
// @access  Private/Admin
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({}).populate('sellerId', 'email');
  res.json(items);
});

// @desc    Approve an item
// @route   PUT /api/admin/items/:id/approve
// @access  Private/Admin or Staff
const approveItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // In a real implementation, you might have an 'approved' field
  // For now, we'll just return a success message
  res.json({ message: `Item ${item.title} has been approved` });
});

// @desc    Reject an item
// @route   PUT /api/admin/items/:id/reject
// @access  Private/Admin or Staff
const rejectItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // In a real implementation, you might have a 'rejected' field
  // For now, we'll just return a success message
  res.json({ message: `Item ${item.title} has been rejected` });
});

// @desc    Delete an item
// @route   DELETE /api/admin/items/:id
// @access  Private/Admin
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  await item.remove();
  res.json({ message: `Item ${item.title} has been removed` });
});

// @desc    Get chat logs
// @route   GET /api/admin/chats
// @access  Private/Admin
const getChatLogs = asyncHandler(async (req, res) => {
  const chats = await Chat.find({}).populate('itemId', 'title').populate('participants', 'email');
  res.json(chats);
});

// @desc    Create staff account
// @route   POST /api/admin/staff
// @access  Private/Admin
const createStaff = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  
  // Check if user exists
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Create user with staff role
  const user = await User.create({
    email,
    password: hashedPassword,
    country: 'Latvia', // Default country for staff
    role: role || 'staff',
  });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = {
  getUsers,
  banUser,
  suspendUser,
  getItems,
  approveItem,
  rejectItem,
  deleteItem,
  getChatLogs,
  createStaff,
};
