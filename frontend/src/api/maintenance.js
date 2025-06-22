import API from './axios';

export const fetchMaintenances = () => API.get('/maintenance');
export const fetchMaintenanceById = (maintenanceId) => API.get(`/maintenance/${maintenanceId}`);
export const createMaintenance = (data) => API.post('/maintenance', data);
export const updateMaintenance = (maintenanceId, data) => API.put(`/maintenance/${maintenanceId}`, data);
export const deleteMaintenance = (maintenanceId) => API.delete(`/maintenance/${maintenanceId}`);
export const changeMaintenanceStatus = (maintenanceId, status) =>
  API.put(`/maintenance/${maintenanceId}/status`, { status });
export const assignMaintenanceToStaff = (maintenanceId, staffId) =>
  API.put(`/maintenance/${maintenanceId}/assign`, { staffId });
