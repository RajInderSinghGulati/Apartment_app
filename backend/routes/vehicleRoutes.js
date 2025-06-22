const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Static/specific routes FIRST
router.get('/search', auth, vehicleController.searchVehicles);

// Parameterized routes AFTER
router.get('/:vehicleId', auth, vehicleController.getVehicleById);
router.put('/:vehicleId', auth, vehicleController.updateVehicle);
router.delete('/:vehicleId', auth, vehicleController.deleteVehicle);

// General routes LAST
router.get('/', auth, vehicleController.getAllVehicles);
router.post('/', auth, vehicleController.createVehicle);

module.exports = router;
