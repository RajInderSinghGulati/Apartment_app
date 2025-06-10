const express = require('express');
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, blogController.createBlogPost);
router.get('/:blogPostId', auth, blogController.getBlogPostById);
router.get('/', auth, blogController.getAllBlogPosts);
router.put('/:blogPostId', auth, blogController.updateBlogPost);
router.delete('/:blogPostId', auth, blogController.deleteBlogPost);

router.get('/user/:userId', auth, blogController.getBlogPostsByUserId);
router.post('/:blogPostId/like', auth, blogController.likeBlogPost);
router.post('/:blogPostId/comment', auth, blogController.commentOnBlogPost);
router.delete('/:blogPostId/comment/:commentId', auth, blogController.deleteComment);

module.exports = router;
