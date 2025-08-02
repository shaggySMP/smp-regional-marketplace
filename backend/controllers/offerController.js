const Offer = require('../models/Offer');
const Item = require('../models/Item');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// @desc    Create a new offer
// @route   POST /api/offers
// @access  Private
const createOffer = asyncHandler(async (req, res) => {
  const { itemId, amount } = req.body;
  
  // Check if item exists
  const item = await Item.findById(itemId);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // Check if user is not the seller
  if (item.sellerId.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Cannot make an offer on your own item');
  }
  
  // Check if item is not already sold
  if (item.isSold) {
    res.status(400);
    throw new Error('Cannot make an offer on a sold item');
  }
  
  // Check if chat exists between buyer and seller for this item
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
    await chat.save();
  }
  
  // Create offer
  const offer = new Offer({
    itemId: item._id,
    buyerId: req.user._id,
    sellerId: item.sellerId,
    amount,
    chatId: chat._id,
  });
  
  const createdOffer = await offer.save();
  
  // Also create a message in the chat to represent the offer
  const message = new Message({
    chatId: chat._id,
    senderId: req.user._id,
    text: `Offer: $${amount}`,
    isOffer: true,
    offerAmount: amount,
  });
  
  await message.save();
  
  // Populate related fields before sending response
  await createdOffer.populate('itemId', 'title');
  await createdOffer.populate('buyerId', 'email');
  await createdOffer.populate('sellerId', 'email');
  
  res.status(201).json(createdOffer);
});

// @desc    Update offer status
// @route   PUT /api/offers/:id/status
// @access  Private
const updateOfferStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const offer = await Offer.findById(req.params.id);
  
  if (!offer) {
    res.status(404);
    throw new Error('Offer not found');
  }
  
  // Check if user is the seller of the item
  if (offer.sellerId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this offer');
  }
  
  // Check if status is valid
  if (!['accepted', 'rejected'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }
  
  offer.status = status;
  const updatedOffer = await offer.save();
  
  // If offer is accepted, mark item as sold
  if (status === 'accepted') {
    const item = await Item.findById(offer.itemId);
    if (item) {
      item.isSold = true;
      await item.save();
    }
  }
  
  // Populate related fields before sending response
  await updatedOffer.populate('itemId', 'title');
  await updatedOffer.populate('buyerId', 'email');
  await updatedOffer.populate('sellerId', 'email');
  
  res.json(updatedOffer);
});

module.exports = {
  createOffer,
  updateOfferStatus,
};
