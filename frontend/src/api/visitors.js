import API from './axios';

export const fetchVisitors = () => API.get('/visitors');
export const approveVisitor = (visitorId) => API.put(`/visitors/${visitorId}/approve`);
export const rejectVisitor = (visitorId) => API.put(`/visitors/${visitorId}/reject`);
export const fetchVisitorById = (visitorId) => API.get(`/visitors/${visitorId}`);
export const createVisitor = (data) => API.post('/visitors', data);
export const updateVisitor = (visitorId, data) => API.put(`/visitors/${visitorId}`, data);
export const deleteVisitor = (visitorId) => API.delete(`/visitors/${visitorId}`);

