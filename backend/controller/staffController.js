const Staff = require('../models/Staff');

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

exports.getStaffById = async (req, res) => {
  try {
    const { StaffId } = req.params;
    const Staff = await Staff.findById(StaffId).populate('houseContracted');
    if (!Staff) return res.status(404).json({ error: "Staff not found" });
    res.status(200).json(Staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { StaffId } = req.params;
    const updates = req.body;
    const Staff = await Staff.findByIdAndUpdate(StaffId, { $set: updates }, { new: true });
    if (!Staff) return res.status(404).json({ error: "Staff not found" });
    res.status(200).json(Staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { StaffId } = req.params;
    const deleted = await Staff.deleteOne({ _id: StaffId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Staff not found" });
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
