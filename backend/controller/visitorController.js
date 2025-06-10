const Visitor = require('../models/Visitor');

exports.createVisitor = async (req, res) => {
  try {
    const { name, date, house, avatar, vehiclePlate, status } = req.body;
    const newVisitor = new Visitor({ name, date, house, avatar, vehiclePlate, status });
    await newVisitor.save();
    res.status(201).json(newVisitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVisitorById = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const visitor = await Visitor.findById(visitorId).populate('house');
    if (!visitor) return res.status(404).json({ error: "Visitor not found" });
    res.status(200).json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllVisitors = async (req, res) => {
  try {
    const { houseId } = req.query;
    const filter = houseId ? { house: houseId } : {};
    const visitors = await Visitor.find(filter).populate('house');
    res.status(200).json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const updates = req.body;
    const visitor = await Visitor.findByIdAndUpdate(visitorId, { $set: updates }, { new: true });
    if (!visitor) return res.status(404).json({ error: "Visitor not found" });
    res.status(200).json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const deleted = await Visitor.deleteOne({ _id: visitorId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Visitor not found" });
    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const visitor = await Visitor.findByIdAndUpdate(visitorId, { status: "Approved" }, { new: true });
    if (!visitor) return res.status(404).json({ error: "Visitor not found" });
    res.status(200).json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const visitor = await Visitor.findByIdAndUpdate(visitorId, { status: "Rejected" }, { new: true });
    if (!visitor) return res.status(404).json({ error: "Visitor not found" });
    res.status(200).json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
