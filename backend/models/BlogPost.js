const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
  content: { type: String, required: true },
  media: { type: String },
  mediaType: { type: String, enum: ['image', 'video', null], default: null },
  poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
