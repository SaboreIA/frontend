import api from './api';

export const fetchTags = () => api.get('/Tag');
