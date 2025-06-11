const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/:userId', auth, userController.getUserById);
router.put('/:userId', auth, userController.updateUser);
router.delete('/:userId', auth, userController.deleteUser);

router.post('/login', userController.loginUser);

router.get('/house/:houseId', auth, userController.getUsersByHouseId);

router.put('/:userId/assign-house/:houseId', auth, userController.addMemberToHouse);
router.put('/:userId/remove-house', auth, userController.removeMemberFromHouse);
router.post('/signup', userController.signupUser);

module.exports = router;
