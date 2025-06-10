const express = require('express');
const petController = require('../controllers/petController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, petController.createPet);
router.get('/:petId', auth, petController.getPetById);
router.get('/', auth, petController.getAllPets);
router.put('/:petId', auth, petController.updatePet);
router.delete('/:petId', auth, petController.deletePet);

router.get('/search', auth, petController.searchPets);

module.exports = router;
