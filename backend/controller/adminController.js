const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdmin = async (req, res) => {
  try {
    const { name, avatar, email, phoneNum, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, avatar, email, phoneNum, password: hashedPassword });
    await newAdmin.save();
    const adminObj = newAdmin.toObject();
    delete adminObj.password;
    res.status(201).json(adminObj);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email or phone number already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    const adminObj = admin.toObject();
    delete adminObj.password;
    res.status(200).json(adminObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const admin = await Admin.findByIdAndUpdate(adminId, { $set: updates }, { new: true });
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    const adminObj = admin.toObject();
    delete adminObj.password;
    res.status(200).json(adminObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const deleted = await Admin.deleteOne({ _id: adminId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ adminId: admin._id, email: admin.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
