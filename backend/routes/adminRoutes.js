const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');
const router = express.Router();

router.post('/', adminOnly, adminController.createAdmin);
router.get('/:adminId', auth, adminOnly, adminController.getAdminById);
router.get('/', auth, adminOnly, adminController.getAllAdmins);
router.put('/:adminId', auth, adminOnly, adminController.updateAdmin);
router.delete('/:adminId', auth, adminOnly, adminController.deleteAdmin);

router.post('/login', adminController.loginAdmin);

module.exports = router;
