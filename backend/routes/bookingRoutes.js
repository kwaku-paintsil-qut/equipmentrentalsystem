const express = require('express');
const router = express.Router();

const { createBooking, getAllBooking, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, createBooking);
router.get('/',protect, allowRoles('staff','manager'), getAllBooking);
router.patch('/:id/status', protect, allowRoles('staff', 'manager'), updateBookingStatus);

module.exports = router;
