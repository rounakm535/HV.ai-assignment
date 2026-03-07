const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} = require('../controllers/leaveController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Employee routes
router.post('/apply', protect, authorize('employee'), applyLeave);
router.get('/my', protect, authorize('employee'), getMyLeaves);

// Employer routes
router.get('/all', protect, authorize('employer'), getAllLeaves);
router.put('/:id/approve', protect, authorize('employer'), approveLeave);
router.put('/:id/reject', protect, authorize('employer'), rejectLeave);

module.exports = router;
