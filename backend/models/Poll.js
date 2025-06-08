const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  votes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    option: { type: String, required: true }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', PollSchema);
