const express = require('express');
const router = express.Router();
const {
  getMembers,
  getMember,
  getMemberByNumber,
  createMember,
  updateMember,
  extendMembership,
  cancelMembership,
  deleteMember
} = require('../controllers/memberController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, getMembers)
  .post(protect, admin, createMember);

router.get('/number/:membershipNo', protect, getMemberByNumber);

router.route('/:id')
  .get(protect, getMember)
  .put(protect, admin, updateMember)
  .delete(protect, admin, deleteMember);

router.put('/:id/extend', protect, admin, extendMembership);
router.put('/:id/cancel', protect, admin, cancelMembership);

module.exports = router;
