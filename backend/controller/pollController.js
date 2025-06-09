const Poll = require('../models/Poll');

exports.createPoll = async (req, res) => {
  try {
    const { question, options, createdBy, blogPost } = req.body;
    const newPoll = new Poll({ question, options, createdBy, blogPost });
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPollById = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId).populate('createdBy blogPost votes.user');
    if (!poll) return res.status(404).json({ error: "Poll not found" });
    res.status(200).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const updates = req.body;
    const poll = await Poll.findByIdAndUpdate(pollId, { $set: updates }, { new: true });
    if (!poll) return res.status(404).json({ error: "Poll not found" });
    res.status(200).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const deleted = await Poll.deleteOne({ _id: pollId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Poll not found" });
    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
