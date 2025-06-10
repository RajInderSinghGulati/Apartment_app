const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, vehicleController.createVehicle);
router.get('/:vehicleId', auth, vehicleController.getVehicleById);
router.get('/', auth, vehicleController.getAllVehicles);
router.put('/:vehicleId', auth, vehicleController.updateVehicle);
router.delete('/:vehicleId', auth, vehicleController.deleteVehicle);

router.get('/search', auth, vehicleController.searchVehicles);

module.exports = router;
