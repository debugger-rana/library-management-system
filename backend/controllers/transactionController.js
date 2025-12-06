const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Member = require('../models/Member');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('book', 'title author serialNo')
      .populate('member', 'name membershipNo')
      .sort('-createdAt');

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('book')
      .populate('member');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Issue book
// @route   POST /api/transactions/issue
// @access  Private
const issueBook = async (req, res) => {
  try {
    const { bookId, memberId, issueDate, dueDate, remarks } = req.body;

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book not available'
      });
    }

    // Check if member exists and is active
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    if (!member.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Member membership is not active'
      });
    }

    // Generate transaction ID
    const count = await Transaction.countDocuments();
    const transactionId = `TXN${String(count + 1).padStart(6, '0')}`;

    // Create transaction
    const transaction = await Transaction.create({
      transactionId,
      book: bookId,
      member: memberId,
      serialNo: book.serialNo,
      type: 'issue',
      issueDate: issueDate || new Date(),
      dueDate,
      status: 'issued',
      remarks,
      issuedBy: req.user._id
    });

    // Update book availability
    book.availableCopies -= 1;
    if (book.availableCopies === 0) {
      book.isAvailable = false;
    }
    await book.save();

    // Update member books issued count
    member.booksIssued += 1;
    await member.save();

    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('book')
      .populate('member');

    res.status(201).json({
      success: true,
      data: populatedTransaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Return book
// @route   PUT /api/transactions/:id/return
// @access  Private
const returnBook = async (req, res) => {
  try {
    const { returnDate, remarks } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    if (transaction.status === 'returned') {
      return res.status(400).json({
        success: false,
        message: 'Book already returned'
      });
    }

    // Update transaction
    transaction.returnDate = returnDate || new Date();
    transaction.status = 'returned';
    transaction.remarks = remarks || transaction.remarks;
    transaction.returnedBy = req.user._id;

    // Calculate fine
    transaction.calculateFine();
    await transaction.save();

    // Update book availability
    const book = await Book.findById(transaction.book);
    book.availableCopies += 1;
    book.isAvailable = true;
    await book.save();

    // Update member books issued count
    const member = await Member.findById(transaction.member);
    member.booksIssued -= 1;
    await member.save();

    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('book')
      .populate('member');

    res.json({
      success: true,
      data: populatedTransaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Pay fine
// @route   PUT /api/transactions/:id/pay-fine
// @access  Private
const payFine = async (req, res) => {
  try {
    const { finePaid, remarks } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    transaction.finePaid = finePaid;
    transaction.remarks = remarks || transaction.remarks;
    await transaction.save();

    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('book')
      .populate('member');

    res.json({
      success: true,
      data: populatedTransaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get active issues
// @route   GET /api/transactions/active
// @access  Private
const getActiveIssues = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: 'issued' })
      .populate('book', 'title author serialNo')
      .populate('member', 'name membershipNo')
      .sort('-issueDate');

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTransactions,
  getTransaction,
  issueBook,
  returnBook,
  payFine,
  getActiveIssues
};
