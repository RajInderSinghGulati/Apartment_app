const express = require('express');
const pollController = require('../controllers/pollController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, pollController.createPoll);
router.get('/:pollId', auth, pollController.getPollById);
router.get('/', auth, pollController.getAllPolls);
router.put('/:pollId', auth, pollController.updatePoll);
router.delete('/:pollId', auth, pollController.deletePoll);

router.post('/:pollId/vote', auth, pollController.votePoll);
router.get('/blog/:blogPostId', auth, pollController.getPollsByBlogPostId);
router.get('/:pollId/results', auth, pollController.getResultsByPollId);

module.exports = router;
