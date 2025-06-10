const Pet = require('../models/Pet');

// Create pet
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

// Get pet by ID
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

// Get all pets (optionally by house)
exports.getAllPets = async (req, res) => {
  try {
    const { houseId } = req.query;
    const filter = houseId ? { house: houseId } : {};
    const pets = await Pet.find(filter).populate('house');
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update pet
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

// Delete pet
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

// Search pets by name or type
exports.searchPets = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });
    const pets = await Pet.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { type: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
