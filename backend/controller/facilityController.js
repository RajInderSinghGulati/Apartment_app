const Facility = require('../models/Facility');

exports.createFacility = async (req, res) => {
  try {
    const { name, society, description, avatar } = req.body;
    const newFacility = new Facility({ name, society, description, avatar });
    await newFacility.save();
    res.status(201).json(newFacility);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFacilityById = async (req, res) => {
  try {
    const { facilityId } = req.params;
    const facility = await Facility.findById(facilityId).populate('society');
    if (!facility) return res.status(404).json({ error: "Facility not found" });
    res.status(200).json(facility);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFacilitiesBySociety = async (req, res) => {
  try {
    const { societyId } = req.query;
    const facilities = await Facility.find({society : societyId})
    res.status(200).json(facilities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateFacility = async (req, res) => {
  try {
    const { facilityId } = req.params;
    const updates = req.body;
    const facility = await Facility.findByIdAndUpdate(facilityId, { $set: updates }, { new: true });
    if (!facility) return res.status(404).json({ error: "Facility not found" });
    res.status(200).json(facility);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    const { facilityId } = req.params;
    const deleted = await Facility.deleteOne({ _id: facilityId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Facility not found" });
    res.status(200).json({ message: "Facility deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
