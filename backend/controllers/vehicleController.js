const Vehicle = require('../models/Vehicle');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { model, plateNum, usedBy } = req.body;
    const newVehicle = new Vehicle({ model, plateNum, usedBy });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Plate number already exists" });
    res.status(500).json({ error: err.message });
  }
};

// Get vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findById(vehicleId).populate('usedBy');
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all vehicles (optionally by house)
exports.getAllVehicles = async (req, res) => {
  try {
    const { houseId } = req.query;
    const filter = houseId ? { usedBy: houseId } : {};
    const vehicles = await Vehicle.find(filter).populate('usedBy');
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const updates = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { $set: updates }, { new: true });
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const deleted = await Vehicle.deleteOne({ _id: vehicleId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchVehicles = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });
    const vehicles = await Vehicle.find({
      $or: [
        { model: { $regex: q, $options: 'i' } },
        { plateNum: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
