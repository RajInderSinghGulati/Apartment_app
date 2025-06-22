const express = require('express');
const societyController = require('../controllers/societyController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly'); 
const router = express.Router();

// Static/specific routes FIRST
router.get('/search/name', auth, societyController.searchSocietyByName);

// Parameterized routes AFTER
router.get('/:societyId', auth, societyController.getSocietyById);
router.put('/:societyId', auth, adminOnly, societyController.updateSociety);
router.delete('/:societyId', auth, adminOnly, societyController.deleteSociety);

// General routes LAST
router.get('/', auth, societyController.getAllSocieties);
router.post('/', auth, adminOnly, societyController.createSociety);

module.exports = router;
