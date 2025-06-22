const express = require('express');
const visitorController = require('../controllers/visitorController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

// Static/specific routes FIRST
router.put('/:visitorId/approve', auth, adminOnly, visitorController.approveVisitor);
router.put('/:visitorId/reject', auth, adminOnly, visitorController.rejectVisitor);

// Parameterized routes AFTER
router.get('/:visitorId', auth, visitorController.getVisitorById);
router.put('/:visitorId', auth, visitorController.updateVisitor);
router.delete('/:visitorId', auth, adminOnly, visitorController.deleteVisitor);

// General routes LAST
router.get('/', auth, visitorController.getAllVisitors);
router.post('/', auth, visitorController.createVisitor);

module.exports = router;
