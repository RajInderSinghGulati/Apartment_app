const Society = require('../models/Society');

exports.createSociety = async (req, res) => {
    try {
        const { name, address, avatar } = req.body;
        const newSociety = new Society({ name, address, avatar });
        await newSociety.save();
        res.status(201).json(newSociety);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSocietyById = async (req, res) => {
    try {
        const { societyId } = req.params;
        const society = await Society.findById(societyId);
        if (!society) return res.status(404).json({ error: "Society not found" });
        res.status(200).json(society);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSociety = async (req, res) => {
    try {
        const { societyId } = req.params;
        const updates = req.body;
        const society = await Society.findByIdAndUpdate(
            societyId,
            { $set: updates },
            { new: true }
        );
        if (!society) return res.status(404).json({ error: "Society not found" });
        res.status(200).json(society);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSociety = async (req, res) => {
    try {
        const { societyId } = req.params;
        const deleted = await Society.deleteOne({ _id: societyId });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: "Society not found" });
        }
        res.status(200).json({ message: "Society deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};