const Booking = require('../models/Booking');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { house, facility, timeStart, timeEnd } = req.body;
    const newBooking = new Booking({ house, facility, timeStart, timeEnd });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate('house facility');
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings (optionally by house or facility)
exports.getAllBookings = async (req, res) => {
  try {
    const { houseId, facilityId } = req.query;
    const filter = {};
    if (houseId) filter.house = houseId;
    if (facilityId) filter.facility = facilityId;
    const bookings = await Booking.find(filter).populate('house facility');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updates = req.body;
    const booking = await Booking.findByIdAndUpdate(bookingId, { $set: updates }, { new: true });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deleted = await Booking.deleteOne({ _id: bookingId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel booking (alias for delete)
exports.cancelBooking = exports.deleteBooking;

// Search bookings (by house, facility, or date)
exports.searchBookings = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });
    const bookings = await Booking.find({
      $or: [
        { timeStart: { $regex: q, $options: 'i' } },
        { timeEnd: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
