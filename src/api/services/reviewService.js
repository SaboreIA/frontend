import api from "@/api/api";

const REVIEW_ENDPOINTS = {
  POST_REVIEW: "/Review",
  UPLOAD_IMAGE: (reviewId) => `/Review/${reviewId}/upload-image`,
};

export async function postReview(initialReviewData) {
  try {
    const response = await api.post(
      REVIEW_ENDPOINTS.POST_REVIEW,
      initialReviewData
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Falha ao criar avaliação inicial.";
    throw new Error(errorMessage);
  }
}

export async function uploadReviewImage(reviewId, imageFile) {
  const formData = new FormData();
  // Backend expects the file field to be named 'imageFile'
  formData.append("imageFile", imageFile, imageFile.name);

  try {
    const url = REVIEW_ENDPOINTS.UPLOAD_IMAGE(reviewId);
    const response = await api.post(url, formData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Não foi possível anexar a imagem à avaliação.";
    throw new Error(errorMessage);
  }
}
