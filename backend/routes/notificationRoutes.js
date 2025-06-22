const express = require('express');
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, notificationController.createNotification);
router.get('/:notificationId', auth, notificationController.getNotificationById);
router.get('/', auth, notificationController.getAllNotifications);
router.put('/:notificationId', auth, notificationController.updateNotification);
router.delete('/:notificationId', auth, notificationController.deleteNotification);

module.exports = router;
