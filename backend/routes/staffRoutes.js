const express = require('express');
const staffController = require('../controllers/staffController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

// Static/specific routes FIRST
router.get('/search', auth, staffController.searchStaff);

// Parameterized routes AFTER
router.get('/:staffId', auth, staffController.getStaffById);
router.put('/:staffId', auth, adminOnly, staffController.updateStaff);
router.delete('/:staffId', auth, adminOnly, staffController.deleteStaff);

// General routes LAST
router.get('/', auth, staffController.getAllStaff);
router.post('/', auth, adminOnly, staffController.createStaff);

module.exports = router;
