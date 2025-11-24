import api from "@/api/api";

const REVIEW_ENDPOINTS = {
    POST_REVIEW: '/Review', 
    UPLOAD_IMAGE: (reviewId) => `/Review/${reviewId}/upload-image`,
};

/**
 * 1. Cria a avaliação inicial no Back-end (sem a URL da imagem).
 * @param {Object} initialReviewData - Dados da avaliação (título, notas, etc., sem imageURL).
 * @returns {Promise<Object>} A avaliação recém-criada (incluindo o ID).
 */
export async function postReview(initialReviewData) {
    try {
        const response = await api.post(REVIEW_ENDPOINTS.POST_REVIEW, initialReviewData); 
        return response.data; 
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Falha ao criar avaliação inicial.";
        throw new Error(errorMessage);
    }
}


/**
 * 2. Envia a imagem e anexa-a à avaliação existente.
 * @param {number} reviewId - O ID da avaliação recém-criada.
 * @param {File} imageFile - O objeto File da imagem.
 * @returns {Promise<Object>} A avaliação atualizada (com a imageURL).
 */
export async function uploadReviewImage(reviewId, imageFile) {
    const formData = new FormData();
    
    formData.append('image', imageFile, imageFile.name); 

    try {
        const url = REVIEW_ENDPOINTS.UPLOAD_IMAGE(reviewId);
        
        const response = await api.post(url, formData); 
        
        return response.data; 

    } catch (error) {
        console.error("Falha ao enviar imagem da avaliação:", error.response || error);
        const errorMessage = error.response?.data?.message || "Não foi possível anexar a imagem à avaliação.";
        throw new Error(errorMessage);
    }
}