const express = require('express');
const router = express.Router();
const issueRequestController = require('../controllers/issueRequestController');
const { protect, admin } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/', issueRequestController.getAllRequests);
router.post('/', issueRequestController.createRequest);
router.put('/:id/approve', admin, issueRequestController.approveRequest);
router.put('/:id/reject', admin, issueRequestController.rejectRequest);
router.delete('/:id', admin, issueRequestController.deleteRequest);

module.exports = router;
