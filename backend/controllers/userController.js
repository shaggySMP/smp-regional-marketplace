const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    user.country = req.body.country || user.country;
    user.profilePhoto = req.body.profilePhoto || user.profilePhoto;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      country: updatedUser.country,
      profilePhoto: updatedUser.profilePhoto,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};
