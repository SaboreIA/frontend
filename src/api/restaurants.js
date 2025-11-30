import api from "./api";

export const createRestaurant = (payload) => api.post("/restaurants", payload);

export const fetchRestaurantById = (restaurantId) => {
  if (!restaurantId) {
    throw new Error("restaurantId é obrigatório para buscar o restaurante");
  }
  return api.get(`/restaurants/${restaurantId}`);
};

export const updateRestaurant = (restaurantId, payload) => {
  if (!restaurantId) {
    throw new Error("restaurantId é obrigatório para atualizar o restaurante");
  }
  console.log('🌐 API updateRestaurant - URL:', `/restaurants/${restaurantId}`);
  console.log('🌐 API updateRestaurant - Payload:', payload);
  return api.put(`/restaurants/${restaurantId}`, payload);
};

export const deleteRestaurant = (restaurantId) => {
  if (!restaurantId) {
    throw new Error("restaurantId é obrigatório para excluir o restaurante");
  }
  return api.delete(`/restaurants/${restaurantId}`);
};

export const uploadRestaurantImages = (restaurantId, files) => {
  if (!restaurantId) {
    throw new Error("restaurantId é obrigatório para enviar imagens");
  }

  const formData = new FormData();

  if (files.coverImage) formData.append("coverImage", files.coverImage);
  if (files.image1) formData.append("image1", files.image1);
  if (files.image2) formData.append("image2", files.image2);
  if (files.image3) formData.append("image3", files.image3);

  return api.post(`/restaurants/${restaurantId}/upload-all-images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const searchRestaurants = (userInput) => {
  if (!userInput || userInput.trim() === "") {
    throw new Error("userInput é obrigatório para buscar restaurantes");
  }
  return api.post("/restaurants/search", { userInput: userInput.trim() });
};
