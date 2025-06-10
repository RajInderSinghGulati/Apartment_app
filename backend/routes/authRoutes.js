const express = require('express');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const router = express.Router();

// User Auth
router.post('/login', userController.loginUser);

// Admin Auth
router.post('/admin/login', adminController.loginAdmin);

module.exports = router;
