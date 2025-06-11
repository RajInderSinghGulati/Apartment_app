const express = require('express');
const petController = require('../controllers/petController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Static/specific routes FIRST
router.get('/search', auth, petController.searchPets);

// Parameterized routes AFTER
router.get('/:petId', auth, petController.getPetById);
router.put('/:petId', auth, petController.updatePet);
router.delete('/:petId', auth, petController.deletePet);

// General routes LAST
router.get('/', auth, petController.getAllPets);
router.post('/', auth, petController.createPet);

module.exports = router;
