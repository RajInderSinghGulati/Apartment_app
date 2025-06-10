const House = require('../models/House');

exports.createHouse = async (req, res) => {
  try {
    const { block, number, society, members, staff, vehicles, pets } = req.body;
    const newHouse = new House({ block, number, society, members, staff, vehicles, pets });
    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHouseById = async (req, res) => {
  try {
    const { houseId } = req.params;
    const house = await House.findById(houseId)
      .populate('members staff vehicles pets society');
    if (!house) return res.status(404).json({ error: "House not found" });
    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const updates = req.body;
    const house = await House.findByIdAndUpdate(houseId, { $set: updates }, { new: true });
    if (!house) return res.status(404).json({ error: "House not found" });
    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const deleted = await House.deleteOne({ _id: houseId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "House not found" });
    }
    res.status(200).json({ message: "House deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHousesBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;
    const houses = await House.find({ society: societyId })
      .populate('members staff vehicles pets');
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchHouses = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "No search query provided" });
    const houses = await House.find({
      $or: [
        { block: { $regex: q, $options: 'i' } },
        { number: { $regex: q, $options: 'i' } }
      ]
    }).populate('members staff vehicles pets');
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
