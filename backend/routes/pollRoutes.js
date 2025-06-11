const express = require('express');
const pollController = require('../controllers/pollController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Static/specific routes FIRST
router.get('/blog/:blogPostId', auth, pollController.getPollsByBlogPostId);
router.post('/:pollId/vote', auth, pollController.votePoll);
router.get('/:pollId/results', auth, pollController.getResultsByPollId);

// Parameterized routes AFTER
router.get('/:pollId', auth, pollController.getPollById);
router.put('/:pollId', auth, pollController.updatePoll);
router.delete('/:pollId', auth, pollController.deletePoll);

// General routes LAST
router.get('/', auth, pollController.getAllPolls);
router.post('/', auth, pollController.createPoll);

module.exports = router;
