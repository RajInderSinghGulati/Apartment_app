const express = require('express');
const staffController = require('../controllers/staffController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

router.post('/', auth, adminOnly, staffController.createStaff);
router.get('/:staffId', auth, staffController.getStaffById);
router.get('/', auth, staffController.getAllStaff);
router.put('/:staffId', auth, adminOnly, staffController.updateStaff);
router.delete('/:staffId', auth, adminOnly, staffController.deleteStaff);

router.get('/search', auth, staffController.searchStaff);

module.exports = router;
