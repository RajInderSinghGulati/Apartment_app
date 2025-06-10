const express = require('express');
const houseController = require('../controllers/houseController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

router.post('/', auth, adminOnly, houseController.createHouse);
router.get('/:houseId', auth, houseController.getHouseById);
router.put('/:houseId', auth, adminOnly, houseController.updateHouse);
router.delete('/:houseId', auth, adminOnly, houseController.deleteHouse);

router.get('/society/:societyId', auth, houseController.getHousesBySocietyId);
router.get('/search', auth, houseController.searchHouses);

module.exports = router;
