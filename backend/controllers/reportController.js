const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Member = require('../models/Member');

// @desc    Get dashboard statistics
// @route   GET /api/reports/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const availableBooks = await Book.countDocuments({ isAvailable: true });
    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({ isActive: true });
    const activeIssues = await Transaction.countDocuments({ status: 'issued' });
    const overdueBooks = await Transaction.countDocuments({
      status: 'issued',
      dueDate: { $lt: new Date() }
    });
    const totalFines = await Transaction.aggregate([
      { $match: { fine: { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: '$fine' } } }
    ]);
    const unpaidFines = await Transaction.aggregate([
      { $match: { fine: { $gt: 0 }, finePaid: false } },
      { $group: { _id: null, total: { $sum: '$fine' } } }
    ]);

    res.json({
      success: true,
      data: {
        books: {
          total: totalBooks,
          available: availableBooks,
          issued: totalBooks - availableBooks
        },
        members: {
          total: totalMembers,
          active: activeMembers
        },
        transactions: {
          activeIssues,
          overdueBooks
        },
        fines: {
          total: totalFines[0]?.total || 0,
          unpaid: unpaidFines[0]?.total || 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get overdue books report
// @route   GET /api/reports/overdue
// @access  Private
const getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await Transaction.find({
      status: 'issued',
      dueDate: { $lt: new Date() }
    })
      .populate('book', 'title author serialNo')
      .populate('member', 'name membershipNo phone email')
      .sort('dueDate');

    res.json({
      success: true,
      count: overdueBooks.length,
      data: overdueBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get popular books
// @route   GET /api/reports/popular-books
// @access  Private
const getPopularBooks = async (req, res) => {
  try {
    const popularBooks = await Transaction.aggregate([
      { $group: { _id: '$book', issueCount: { $sum: 1 } } },
      { $sort: { issueCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' }
    ]);

    res.json({
      success: true,
      data: popularBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get member activity report
// @route   GET /api/reports/member-activity
// @access  Private
const getMemberActivity = async (req, res) => {
  try {
    const memberActivity = await Transaction.aggregate([
      { $group: { _id: '$member', totalIssues: { $sum: 1 } } },
      { $sort: { totalIssues: -1 } },
      {
        $lookup: {
          from: 'members',
          localField: '_id',
          foreignField: '_id',
          as: 'memberDetails'
        }
      },
      { $unwind: '$memberDetails' }
    ]);

    res.json({
      success: true,
      data: memberActivity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get fine collection report
// @route   GET /api/reports/fines
// @access  Private
const getFineReport = async (req, res) => {
  try {
    const fineTransactions = await Transaction.find({ fine: { $gt: 0 } })
      .populate('book', 'title author')
      .populate('member', 'name membershipNo')
      .sort('-returnDate');

    const summary = await Transaction.aggregate([
      { $match: { fine: { $gt: 0 } } },
      {
        $group: {
          _id: null,
          totalFines: { $sum: '$fine' },
          paidFines: {
            $sum: { $cond: [{ $eq: ['$finePaid', true] }, '$fine', 0] }
          },
          unpaidFines: {
            $sum: { $cond: [{ $eq: ['$finePaid', false] }, '$fine', 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        transactions: fineTransactions,
        summary: summary[0] || { totalFines: 0, paidFines: 0, unpaidFines: 0 }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getOverdueBooks,
  getPopularBooks,
  getMemberActivity,
  getFineReport
};
