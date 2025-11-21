import api from './api';

export const createRestaurant = (payload) => api.post('/restaurants', payload);

export const uploadRestaurantImages = (restaurantId, files) => {
	if (!restaurantId) {
		throw new Error('restaurantId é obrigatório para enviar imagens');
	}

	const formData = new FormData();

	if (files.coverImage) formData.append('coverImage', files.coverImage);
	if (files.image1) formData.append('image1', files.image1);
	if (files.image2) formData.append('image2', files.image2);
	if (files.image3) formData.append('image3', files.image3);

	return api.post(`/Restaurants/${restaurantId}/upload-all-images`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};
