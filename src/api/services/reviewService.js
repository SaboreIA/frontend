import api from "@/api/api";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post('/upload/review-photo', formData, {});
    return response.data.imageUrl;
  } catch (error) {
    console.error("Falha ao enviar imagem:", error);
    throw new Error("Não foi possível completar o upload da imagem.");
  }
}

export async function postReview(reviewData) {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
