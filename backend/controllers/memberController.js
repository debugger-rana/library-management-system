    const Member = require('../models/Member');

// @desc    Get all members
// @route   GET /api/members
// @access  Private
const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get member by membership number
// @route   GET /api/members/number/:membershipNo
// @access  Private
const getMemberByNumber = async (req, res) => {
  try {
    const member = await Member.findOne({ membershipNo: req.params.membershipNo });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create member
// @route   POST /api/members
// @access  Private/Admin
const createMember = async (req, res) => {
  try {
    // Generate membership number
    const count = await Member.countDocuments();
    const membershipNo = `MEM${String(count + 1).padStart(5, '0')}`;

    const member = await Member.create({
      ...req.body,
      membershipNo
    });

    res.status(201).json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private/Admin
const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Extend membership
// @route   PUT /api/members/:id/extend
// @access  Private/Admin
const extendMembership = async (req, res) => {
  try {
    const { months } = req.body;
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    const currentExpiry = new Date(member.expiryDate);
    currentExpiry.setMonth(currentExpiry.getMonth() + (months || 6));
    member.expiryDate = currentExpiry;
    member.isActive = true;

    await member.save();

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel membership
// @route   PUT /api/members/:id/cancel
// @access  Private/Admin
const cancelMembership = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    member.isActive = false;
    await member.save();

    res.json({
      success: true,
      data: member
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Private/Admin
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: 'Member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getMembers,
  getMember,
  getMemberByNumber,
  createMember,
  updateMember,
  extendMembership,
  cancelMembership,
  deleteMember
};
