const express = require('express');
const router = express.Router();
const {
  createOffer,
  updateOfferStatus,
} = require('../controllers/offerController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(protect, createOffer);

router.route('/:id/status')
  .put(protect, updateOfferStatus);

module.exports = router;
