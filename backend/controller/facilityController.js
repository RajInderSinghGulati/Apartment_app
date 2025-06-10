const Facility = require('../models/Facility');

// Create facility
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

// Get facility by ID
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

// Get all facilities (optionally by society)
exports.getAllFacilities = async (req, res) => {
  try {
    const { societyId } = req.query;
    const filter = societyId ? { society: societyId } : {};
    const facilities = await Facility.find(filter).populate('society');
    res.status(200).json(facilities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update facility
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

// Delete facility
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

// Search facilities by name or description
exports.searchFacilities = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });
    const facilities = await Facility.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json(facilities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
