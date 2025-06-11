const express = require('express');
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Static/specific routes FIRST
router.get('/user/:userId', auth, blogController.getBlogPostsByUserId);
router.post('/:blogPostId/like', auth, blogController.likeBlogPost);
router.post('/:blogPostId/comment', auth, blogController.commentOnBlogPost);
router.delete('/:blogPostId/comment/:commentId', auth, blogController.deleteComment);
// If you support voting on polls attached to blogs:
router.post('/:blogPostId/vote', auth, blogController.votePoll); // <-- Add this if needed

// Parameterized and general routes AFTER
router.get('/:blogPostId', auth, blogController.getBlogPostById);
router.put('/:blogPostId', auth, blogController.updateBlogPost);
router.delete('/:blogPostId', auth, blogController.deleteBlogPost);
router.get('/', auth, blogController.getAllBlogPosts);
router.post('/', auth, blogController.createBlogPost);

module.exports = router;
