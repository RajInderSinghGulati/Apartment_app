const express = require('express');
const facilityController = require('../controllers/facilityController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

router.post('/', auth, adminOnly, facilityController.createFacility);
router.get('/:facilityId', auth, facilityController.getFacilityById);
router.get('/', auth, facilityController.getAllFacilities);
router.put('/:facilityId', auth, adminOnly, facilityController.updateFacility);
router.delete('/:facilityId', auth, adminOnly, facilityController.deleteFacility);

router.get('/search', auth, facilityController.searchFacilities);

module.exports = router;
