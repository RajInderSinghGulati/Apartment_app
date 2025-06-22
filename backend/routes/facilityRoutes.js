const express = require('express');
const facilityController = require('../controllers/facilityController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

// Static/specific routes FIRST
router.get('/search', auth, facilityController.searchFacilities);

// Parameterized routes AFTER
router.get('/:facilityId', auth, facilityController.getFacilityById);
router.put('/:facilityId', auth, adminOnly, facilityController.updateFacility);
router.delete('/:facilityId', auth, adminOnly, facilityController.deleteFacility);

// General routes LAST
router.get('/', auth, facilityController.getAllFacilities);
router.post('/', auth, adminOnly, facilityController.createFacility);

module.exports = router;
