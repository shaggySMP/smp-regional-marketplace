const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');

// @desc    Get items with optional filtering
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  const { country, category, search } = req.query;
  
  let query = {};
  
  // Apply country filter if provided
  if (country) {
    query.country = country;
  }
  
  // Apply category filter if provided
  if (category) {
    query.category = category;
  }
  
  // Apply search filter if provided
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  const items = await Item.find(query).populate('sellerId', 'email');
  
  res.json(items);
});

// @desc    Get item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('sellerId', 'email profilePhoto');
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// @desc    Create new item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { title, price, description, category, images } = req.body;
  
  const item = new Item({
    title,
    price,
    description,
    category,
    images,
    sellerId: req.user._id,
    country: req.user.country,
  });
  
  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const { title, price, description, category, images, isSold } = req.body;
  
  const item = await Item.findById(req.params.id);
  
  if (item) {
    // Check if user is the owner of the item
    if (item.sellerId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    
    item.title = title || item.title;
    item.price = price || item.price;
    item.description = description || item.description;
    item.category = category || item.category;
    item.images = images || item.images;
    item.isSold = isSold !== undefined ? isSold : item.isSold;
    
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (item) {
    // Check if user is the owner of the item or admin
    if (item.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('User not authorized');
    }
    
    await item.remove();
    res.json({ message: 'Item removed' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Mark item as sold
// @route   PUT /api/items/:id/sold
// @access  Private
const markItemAsSold = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (item) {
    // Check if user is the owner of the item
    if (item.sellerId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    
    item.isSold = true;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Mark item as received
// @route   PUT /api/items/:id/received
// @access  Private
const markItemAsReceived = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  
  if (item) {
    // Check if user is the owner of the item
    if (item.sellerId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    
    item.isReceived = true;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  markItemAsSold,
  markItemAsReceived,
};
