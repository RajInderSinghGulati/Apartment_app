const express = require('express');
const societyController = require('../controllers/societyController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

router.post('/', auth, adminOnly, societyController.createSociety);
router.get('/:societyId', auth, societyController.getSocietyById);
router.put('/:societyId', auth, adminOnly, societyController.updateSociety);
router.delete('/:societyId', auth, adminOnly, societyController.deleteSociety);

router.get('/search/name', auth, societyController.searchSocietyByName);

module.exports = router;
