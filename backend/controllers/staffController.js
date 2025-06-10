const Staff = require('../models/Staff');

// Create staff
exports.createStaff = async (req, res) => {
  try {
    const { name, phoneNum, role, houseContracted, avatar } = req.body;
    const newStaff = new Staff({ name, phoneNum, role, houseContracted, avatar });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Phone number already exists" });
    res.status(500).json({ error: err.message });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const { staffId } = req.params;
    const staff = await Staff.findById(staffId).populate('houseContracted');
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all staff (optionally by house)
exports.getAllStaff = async (req, res) => {
  try {
    const { houseId } = req.query;
    const filter = houseId ? { houseContracted: houseId } : {};
    const staff = await Staff.find(filter).populate('houseContracted');
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const updates = req.body;
    const staff = await Staff.findByIdAndUpdate(staffId, { $set: updates }, { new: true });
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const { staffId } = req.params;
    const deleted = await Staff.deleteOne({ _id: staffId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search staff by name or phone number
exports.searchStaff = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });
    const staff = await Staff.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { phoneNum: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
