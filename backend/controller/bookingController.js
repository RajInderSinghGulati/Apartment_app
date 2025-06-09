const Booking = require('../models/Booking');

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

exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate('house facility');
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
