const express = require('express');
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Static/specific routes FIRST
router.get('/search', auth, bookingController.searchBookings);

// Parameterized routes AFTER
router.get('/:bookingId', auth, bookingController.getBookingById);
router.put('/:bookingId', auth, bookingController.updateBooking);
router.delete('/:bookingId', auth, bookingController.deleteBooking);

// General routes LAST
router.get('/', auth, bookingController.getAllBookings);
router.post('/', auth, bookingController.createBooking);

module.exports = router;
