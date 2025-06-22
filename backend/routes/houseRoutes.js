const express = require('express');
const houseController = require('../controllers/houseController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

// Static/specific routes FIRST
router.get('/society/:societyId', auth, houseController.getHousesBySocietyId);
router.get('/search', auth, houseController.searchHouses);

// Parameterized routes AFTER
router.get('/:houseId', auth, houseController.getHouseById);
router.put('/:houseId', auth, adminOnly, houseController.updateHouse);
router.delete('/:houseId', auth, adminOnly, houseController.deleteHouse);

// General routes LAST
router.get('/', auth, houseController.getAllHouses);
router.post('/', auth, adminOnly, houseController.createHouse);

module.exports = router;
