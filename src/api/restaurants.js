import api from './api';

export const createRestaurant = (payload) => api.post('/restaurants', payload);
