const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getOverdueBooks,
  getPopularBooks,
  getMemberActivity,
  getFineReport
} = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

router.get('/dashboard', protect, getDashboardStats);
router.get('/overdue', protect, getOverdueBooks);
router.get('/popular-books', protect, getPopularBooks);
router.get('/member-activity', protect, getMemberActivity);
router.get('/fines', protect, getFineReport);

module.exports = router;
