import API from './axios';

export const fetchNotifications = () => API.get('/notifications');
export const fetchNotificationById = (notificationId) => API.get(`/notifications/${notificationId}`);
export const createNotification = (data) => API.post('/notifications', data);
export const updateNotification = (notificationId, data) => API.put(`/notifications/${notificationId}`, data);
export const deleteNotification = (notificationId) => API.delete(`/notifications/${notificationId}`);
