const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  try {
    const { user, title, message, type, link, urgent } = req.body;
    const newNotification = new Notification({ user, title, message, type, link, urgent });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId).populate('user');
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { user: userId } : {};
    const notifications = await Notification.find(filter).populate('user');
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const updates = req.body;
    const notification = await Notification.findByIdAndUpdate(notificationId, { $set: updates }, { new: true });
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const deleted = await Notification.deleteOne({ _id: notificationId });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
