const express = require('express');
const router = express.Router();
const {
  getUsers,
  banUser,
  suspendUser,
  getItems,
  approveItem,
  rejectItem,
  deleteItem,
  getChatLogs,
  createStaff,
} = require('../controllers/adminController');
const { protect, admin, staff } = require('../middleware/auth');

// User management
router.route('/users')
  .get(protect, admin, getUsers);

router.route('/users/:id/ban')
  .put(protect, admin, banUser);

router.route('/users/:id/suspend')
  .put(protect, admin, suspendUser);

// Item management
router.route('/items')
  .get(protect, staff, getItems);

router.route('/items/:id/approve')
  .put(protect, staff, approveItem);

router.route('/items/:id/reject')
  .put(protect, staff, rejectItem);

router.route('/items/:id')
  .delete(protect, admin, deleteItem);

// Chat monitoring
router.route('/chats')
  .get(protect, admin, getChatLogs);

// Staff management
router.route('/staff')
  .post(protect, admin, createStaff);

module.exports = router;
