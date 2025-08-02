const Review = require('../models/Review');
const Item = require('../models/Item');
const Offer = require('../models/Offer');
const asyncHandler = require('express-async-handler');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { itemId, rating, comment } = req.body;
  
  // Check if item exists
  const item = await Item.findById(itemId);
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  // Check if user is not the seller
  if (item.sellerId.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Cannot review your own item');
  }
  
  // Check if item is sold and received
  if (!item.isSold || !item.isReceived) {
    res.status(400);
    throw new Error('Cannot review an item that is not sold and received');
  }
  
  // Check if there's an accepted offer for this item between these users
  const offer = await Offer.findOne({
    itemId: item._id,
    buyerId: req.user._id,
    status: 'accepted'
  });
  
  if (!offer) {
    res.status(400);
    throw new Error('Cannot review an item without an accepted offer');
  }
  
  // Check if review already exists
  const existingReview = await Review.findOne({
    reviewerId: req.user._id,
    reviewedUserId: item.sellerId,
    itemId: item._id
  });
  
  if (existingReview) {
    res.status(400);
    throw new Error('Review already exists for this item');
  }
  
  // Create review
  const review = new Review({
    reviewerId: req.user._id,
    reviewedUserId: item.sellerId,
    itemId: item._id,
    rating,
    comment,
  });
  
  const createdReview = await review.save();
  
  // Populate related fields before sending response
  await createdReview.populate('reviewerId', 'email');
  await createdReview.populate('reviewedUserId', 'email');
  await createdReview.populate('itemId', 'title');
  
  res.status(201).json(createdReview);
});

// @desc    Get reviews for a user
// @route   GET /api/reviews/user/:userId
// @access  Public
const getUserReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ reviewedUserId: req.params.userId })
    .populate('reviewerId', 'email profilePhoto')
    .populate('itemId', 'title');
  
  res.json(reviews);
});

module.exports = {
  createReview,
  getUserReviews,
};
