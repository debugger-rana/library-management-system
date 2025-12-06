const express = require('express');
const router = express.Router();
const {
  getBooks,
  searchBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, getBooks)
  .post(protect, admin, createBook);

router.get('/search', protect, searchBooks);

router.route('/:id')
  .get(protect, getBook)
  .put(protect, admin, updateBook)
  .delete(protect, admin, deleteBook);

module.exports = router;
