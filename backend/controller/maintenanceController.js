const Maintenance = require('../models/Maintenance');

exports.createMaintenance = async (req, res) => {
  try {
    const { houseId, issue, description, resolvedStatus, date, avatar } = req.body;
    const newMaintenance = new Maintenance({ houseId, issue, description, resolvedStatus, date, avatar });
    await newMaintenance.save();
    res.status(201).json(newMaintenance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMaintenanceById = async (req, res) => {
  try {
    const { maintenanceId } = req.params;
    const maintenance = await Maintenance.findById(maintenanceId).populate('houseId');
    if (!maintenance) return res.status(404).json({ error: "Maintenance not found" });
    res.status(200).json(maintenance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMaintenance = async (req, res) => {
  try {
    const { maintenanceId } = req.params;
    const updates = req.body;
    const maintenance = await Maintenance.findByIdAndUpdate(maintenanceId, { $set: updates }, { new: true });
    if (!maintenance) return res.status(404).json({ error: "Maintenance not found" });
    res.status(200).json(maintenance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMaintenance = async (req, res) => {
  try {
    const { maintenanceId } = req.params;
    const deleted = await Maintenance.deleteOne({ _id: maintenanceId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Maintenance not found" });
    res.status(200).json({ message: "Maintenance deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
