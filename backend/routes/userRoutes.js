const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const router = express.Router();

// Static/specific routes FIRST
router.get('/search', auth, userController.searchUser);
router.get('/house/:houseId', auth, userController.getUsersByHouseId);
router.put('/:userId/assign-house/:houseId', auth, userController.addMemberToHouse);
router.put('/:userId/remove-house', auth, userController.removeMemberFromHouse);
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

// Parameterized routes AFTER
router.get('/:userId', auth, userController.getUserById);
router.put('/:userId', auth, userController.updateUser);
router.delete('/:userId', auth, userController.deleteUser);

// General routes LAST
router.post('/', userController.createUser);

module.exports = router;
