const IssueRequest = require('../models/IssueRequest');
const Book = require('../models/Book');
const Member = require('../models/Member');

// Get all issue requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await IssueRequest.find()
      .populate('book')
      .populate('member')
      .populate('processedBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching issue requests',
      error: error.message
    });
  }
};

// Create new issue request
exports.createRequest = async (req, res) => {
  try {
    const { bookId, memberId, serialNo } = req.body;

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
        message: 'Book is not available'
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
        message: 'Member is not active'
      });
    }

    // Generate request ID
    const count = await IssueRequest.countDocuments();
    const requestId = `REQ${String(count + 1).padStart(5, '0')}`;

    const issueRequest = new IssueRequest({
      requestId,
      book: bookId,
      member: memberId,
      serialNo: serialNo || book.serialNo,
      requestDate: new Date()
    });

    await issueRequest.save();

    const populatedRequest = await IssueRequest.findById(issueRequest._id)
      .populate('book')
      .populate('member');

    res.status(201).json({
      success: true,
      message: 'Issue request created successfully',
      data: populatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating issue request',
      error: error.message
    });
  }
};

// Approve issue request
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const issueRequest = await IssueRequest.findById(id);
    if (!issueRequest) {
      return res.status(404).json({
        success: false,
        message: 'Issue request not found'
      });
    }

    if (issueRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Request has already been processed'
      });
    }

    issueRequest.status = 'approved';
    issueRequest.remarks = remarks;
    issueRequest.processedBy = req.user.id;
    issueRequest.processedDate = new Date();

    await issueRequest.save();

    const populatedRequest = await IssueRequest.findById(issueRequest._id)
      .populate('book')
      .populate('member')
      .populate('processedBy', 'name');

    res.json({
      success: true,
      message: 'Issue request approved',
      data: populatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving request',
      error: error.message
    });
  }
};

// Reject issue request
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const issueRequest = await IssueRequest.findById(id);
    if (!issueRequest) {
      return res.status(404).json({
        success: false,
        message: 'Issue request not found'
      });
    }

    if (issueRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Request has already been processed'
      });
    }

    issueRequest.status = 'rejected';
    issueRequest.remarks = remarks;
    issueRequest.processedBy = req.user.id;
    issueRequest.processedDate = new Date();

    await issueRequest.save();

    const populatedRequest = await IssueRequest.findById(issueRequest._id)
      .populate('book')
      .populate('member')
      .populate('processedBy', 'name');

    res.json({
      success: true,
      message: 'Issue request rejected',
      data: populatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting request',
      error: error.message
    });
  }
};

// Delete issue request
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const issueRequest = await IssueRequest.findByIdAndDelete(id);
    if (!issueRequest) {
      return res.status(404).json({
        success: false,
        message: 'Issue request not found'
      });
    }

    res.json({
      success: true,
      message: 'Issue request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting request',
      error: error.message
    });
  }
};
