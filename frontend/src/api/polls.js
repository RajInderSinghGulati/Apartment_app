import API from './axios';

export const fetchPolls = () => API.get('/polls');
export const fetchPollById = (pollId) => API.get(`/polls/${pollId}`);
export const createPoll = (data) => API.post('/polls', data);
export const updatePoll = (pollId, data) => API.put(`/polls/${pollId}`, data);
export const deletePoll = (pollId) => API.delete(`/polls/${pollId}`);
export const votePoll = (pollId, voteData) => API.post(`/polls/${pollId}/vote`, voteData);
export const fetchPollsByBlogPost = (blogPostId) => API.get(`/polls/blog/${blogPostId}`);
export const fetchPollResults = (pollId) => API.get(`/polls/${pollId}/results`);
