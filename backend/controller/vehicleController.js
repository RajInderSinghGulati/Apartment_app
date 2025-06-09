const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  try {
    const { model, plateNum, usedBy } = req.body;
    const newVehicle = new Vehicle({ model, plateNum, usedBy });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Plate number already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

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

exports.deleteVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const deleted = await Vehicle.deleteOne({ _id: vehicleId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
