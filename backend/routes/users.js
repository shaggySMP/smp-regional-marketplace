const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.route('/profile/:id').get(getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

module.exports = router;
