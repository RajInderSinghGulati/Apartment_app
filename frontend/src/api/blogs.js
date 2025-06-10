import API from './axios';

export const fetchBlogs = () => API.get('/blogs');
export const fetchBlogById = (blogPostId) => API.get(`/blogs/${blogPostId}`);
export const createBlog = (data) => API.post('/blogs', data);
export const updateBlog = (blogPostId, data) => API.put(`/blogs/${blogPostId}`, data);
export const deleteBlog = (blogPostId) => API.delete(`/blogs/${blogPostId}`);
export const fetchBlogsByUser = (userId) => API.get(`/blogs/user/${userId}`);
export const likeBlog = (blogPostId, userId) => API.post(`/blogs/${blogPostId}/like`, { userId });
export const commentOnBlog = (blogPostId, comment) => API.post(`/blogs/${blogPostId}/comment`, comment);
export const deleteComment = (blogPostId, commentId) => API.delete(`/blogs/${blogPostId}/comment/${commentId}`);
