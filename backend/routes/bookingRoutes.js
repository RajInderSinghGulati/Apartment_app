const express = require('express');
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, bookingController.createBooking);
router.get('/:bookingId', auth, bookingController.getBookingById);
router.get('/', auth, bookingController.getAllBookings);
router.put('/:bookingId', auth, bookingController.updateBooking);
router.delete('/:bookingId', auth, bookingController.deleteBooking);

router.get('/search', auth, bookingController.searchBookings);

module.exports = router;
