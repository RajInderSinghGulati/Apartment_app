const express = require('express');
const maintenanceController = require('../controllers/maintenanceController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

router.post('/', auth, maintenanceController.createMaintenance);
router.get('/:maintenanceId', auth, maintenanceController.getMaintenanceById);
router.get('/', auth, maintenanceController.getAllMaintenances);
router.put('/:maintenanceId', auth, maintenanceController.updateMaintenance);
router.delete('/:maintenanceId', auth, adminOnly, maintenanceController.deleteMaintenance);

router.put('/:maintenanceId/status', auth, adminOnly, maintenanceController.changeMaintenanceStatus);
router.put('/:maintenanceId/assign', auth, adminOnly, maintenanceController.assignMaintenanceToStaff);

module.exports = router;
