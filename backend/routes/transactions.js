const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  issueBook,
  returnBook,
  payFine,
  getActiveIssues
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getTransactions);
router.get('/active', protect, getActiveIssues);
router.post('/issue', protect, issueBook);

router.route('/:id')
  .get(protect, getTransaction);

router.put('/:id/return', protect, returnBook);
router.put('/:id/pay-fine', protect, payFine);

module.exports = router;
