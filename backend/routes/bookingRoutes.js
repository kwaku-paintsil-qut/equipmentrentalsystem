const express = require('express');
const router = express.Router();

const { createBooking, getAllBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.post('/', protect, createBooking);
router.get('/',protect, allowRoles('staff','manager'), getAllBooking);

module.exports = router;
