const express = require('express');
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Static/specific routes FIRST
router.get('/user/:userId', auth, blogController.getBlogPostsByUserId);
router.post('/:blogPostId/like', auth, blogController.likeBlogPost);
router.post('/:blogPostId/comment', auth, blogController.commentOnBlogPost);
router.post('/:blogPostId/vote', auth, blogController.votePoll);
router.delete('/:blogPostId/comment/:commentId', auth, blogController.deleteComment);

// Parameterized routes AFTER
router.get('/:blogPostId', auth, blogController.getBlogPostById);
router.put('/:blogPostId', auth, blogController.updateBlogPost);
router.delete('/:blogPostId', auth, blogController.deleteBlogPost);

// General routes LAST
router.get('/', auth, blogController.getAllBlogPosts);
router.post('/', auth, blogController.createBlogPost);

module.exports = router;
