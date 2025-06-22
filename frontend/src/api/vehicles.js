import API from './axios';

export const fetchVehicles = () => API.get('/vehicles');
export const fetchVehicleById = (vehicleId) => API.get(`/vehicles/${vehicleId}`);
export const createVehicle = (data) => API.post('/vehicles', data);
export const updateVehicle = (vehicleId, data) => API.put(`/vehicles/${vehicleId}`, data);
export const deleteVehicle = (vehicleId) => API.delete(`/vehicles/${vehicleId}`);
export const searchVehicles = (q) => API.get(`/vehicles/search?q=${q}`);
