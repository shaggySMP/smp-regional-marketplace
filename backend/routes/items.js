const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  markItemAsSold,
  markItemAsReceived,
} = require('../controllers/itemController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getItems)
  .post(protect, createItem);

router.route('/:id')
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

router.route('/:id/sold')
  .put(protect, markItemAsSold);

router.route('/:id/received')
  .put(protect, markItemAsReceived);

module.exports = router;
