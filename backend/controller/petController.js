const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  try {
    const { name, type, avatar, house } = req.body;
    const newPet = new Pet({ name, type, avatar, house });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const { petId } = req.params;
    const pet = await Pet.findById(petId).populate('house');
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const updates = req.body;
    const pet = await Pet.findByIdAndUpdate(petId, { $set: updates }, { new: true });
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const deleted = await Pet.deleteOne({ _id: petId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
