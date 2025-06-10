const express = require('express');
const visitorController = require('../controllers/visitorController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

router.post('/', auth, visitorController.createVisitor);
router.get('/:visitorId', auth, visitorController.getVisitorById);
router.get('/', auth, visitorController.getAllVisitors);
router.put('/:visitorId', auth, visitorController.updateVisitor);
router.delete('/:visitorId', auth, adminOnly, visitorController.deleteVisitor);

router.put('/:visitorId/approve', auth, adminOnly, visitorController.approveVisitor);
router.put('/:visitorId/reject', auth, adminOnly, visitorController.rejectVisitor);

module.exports = router;
