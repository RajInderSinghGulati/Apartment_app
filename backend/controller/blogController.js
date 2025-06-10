const BlogPost = require('../models/BlogPost');

exports.createBlogPost = async (req, res) => {
  try {
    const { author, house, content, media, mediaType, poll } = req.body;
    const newBlogPost = new BlogPost({ author, house, content, media, mediaType, poll });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const blogPost = await BlogPost.findById(blogPostId)
      .populate('author house poll likes comments.author');
    if (!blogPost) return res.status(404).json({ error: "Blog post not found" });
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find()
      .populate('author house poll likes comments.author');
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const updates = req.body;
    const blogPost = await BlogPost.findByIdAndUpdate(blogPostId, { $set: updates }, { new: true });
    if (!blogPost) return res.status(404).json({ error: "Blog post not found" });
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const deleted = await BlogPost.deleteOne({ _id: blogPostId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Blog post not found" });
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await BlogPost.find({ author: userId })
      .populate('author house poll likes comments.author');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.likeBlogPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const { userId } = req.body;
    const blogPost = await BlogPost.findByIdAndUpdate(
      blogPostId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    if (!blogPost) return res.status(404).json({ error: "Blog post not found" });
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.commentOnBlogPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const { author, text } = req.body;
    const blogPost = await BlogPost.findByIdAndUpdate(
      blogPostId,
      { $push: { comments: { author, text } } },
      { new: true }
    ).populate('comments.author');
    if (!blogPost) return res.status(404).json({ error: "Blog post not found" });
    res.status(200).json(blogPost.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { blogPostId, commentId } = req.params;
    const blogPost = await BlogPost.findByIdAndUpdate(
      blogPostId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    if (!blogPost) return res.status(404).json({ error: "Blog post not found" });
    res.status(200).json(blogPost.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
