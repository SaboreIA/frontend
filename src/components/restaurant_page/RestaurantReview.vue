<template>
  <div
    v-if="model"
    class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
    :class="model ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    style="backdrop-filter: blur(2px)"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300"
      :class="model ? 'scale-100' : 'scale-95'"
      @click.stop
    >
      <div class="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-semibold text-gray-800">
            Avaliar Restaurante
          </h3>

          <button
            type="button"
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 text-3xl leading-none"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <p class="text-sm text-yellow-600 font-medium mt-1">
          {{ restaurantName || "Restaurante Desconhecido" }}
        </p>
      </div>

      <form @submit.prevent="submitReview" class="p-6 space-y-6">
        <div class="flex items-center space-x-4 pb-4 border-b border-gray-100">
          <img
            class="h-12 w-12 rounded-full object-cover"
            :src="userPhoto"
            alt="Foto do Usuário"
          />

          <div>
            <p class="text-lg font-semibold text-gray-800">{{ userName }}</p>
            <p class="text-sm text-gray-500">Avaliando agora</p>
          </div>
        </div>

        <div class="space-y-6">
          <RatingGroup
            label="Comida"
            name="comida"
            v-model:rating="formData.ratings.comida"
          />
          <RatingGroup
            label="Ambiente"
            name="ambiente"
            v-model:rating="formData.ratings.ambiente"
          />
          <RatingGroup
            label="Atendimento"
            name="atendimento"
            v-model:rating="formData.ratings.atendimento"
          />
          <RatingGroup
            label="Preços"
            name="precos"
            v-model:rating="formData.ratings.precos"
          />
        </div>

        <div>
          <label for="review-title" class="block text-gray-700 font-medium mb-2">
            Título da Avaliação
          </label>
          <input
            type="text"
            id="review-title"
            v-model="formData.review_title"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Ex: 'Comida excelente e serviço impecável!'"
            required
          />
        </div>

        <div>
          <label for="review-text" class="block text-gray-700 font-medium mb-2">
            Comentário da Avaliação
          </label>
          <textarea
            id="review-text"
            v-model="formData.review_text"
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Escreva sua opinião detalhada..."
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2">
            Subir Imagem (Opcional)
          </label>

          <div class="flex items-center space-x-4">
            <label
              for="image-upload"
              class="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 cursor-pointer transition"
            >
              <svg
                class="w-5 h-5 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Escolher Imagem
            </label>

            <input
              type="file"
              id="image-upload"
              @change="handleFileUpload"
              class="hidden"
              accept="image/*"
              ref="fileInputRef"
            />

            <span class="text-sm text-gray-500 truncate max-w-xs">
              {{ fileName || "Nenhum arquivo selecionado." }}
            </span>
          </div>

          <p
            v-if="uploadStatus.loading"
            class="text-sm text-blue-500 mt-2"
          >
            Fazendo upload da imagem...
          </p>

          <p
            v-if="uploadStatus.error"
            class="text-sm text-red-500 mt-2"
          >
            Erro no upload: {{ uploadStatus.error }}
          </p>
        </div>

        <div
          v-if="validationError"
          class="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-medium"
        >
          ⚠️ {{ validationError }}
        </div>

        <div class="pt-4 flex justify-end">
          <button
            type="submit"
            :disabled="isSubmitting || uploadStatus.loading"
            :class="[
              'font-semibold py-3 px-6 rounded-lg transition shadow-md',
              (isSubmitting || uploadStatus.loading)
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            ]"
          >
            {{
              isSubmitting
                ? "Enviando..."
                : uploadStatus.loading
                ? "Carregando Imagem..."
                : "Enviar Avaliação"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineModel } from "vue";
import RatingGroup from "./RatingGroup.vue";
import { uploadReviewImage, postReview } from "@/api/services/reviewService.js";

const model = defineModel({ type: Boolean, default: false });

const props = defineProps({
  restaurantName: { type: String, default: "Restaurante Desconhecido" },
  restaurantId: { type: Number, required: true },
  userId: { type: Number, required: true },
  userName: { type: String, required: true },
  userPhoto: { type: String, required: true, default: "URL_PADRAO_AVATAR" },
});

const emit = defineEmits(["reviewSubmitted"]);

const fileName = ref(null);
const fileToUpload = ref(null);
const fileInputRef = ref(null);

const validationError = ref(null);
const isSubmitting = ref(false);

const uploadStatus = reactive({
  loading: false,
  error: null,
});

const defaultFormData = {
  review_title: "",
  review_text: "",
  image_url: null,
  ratings: {
    comida: null,
    ambiente: null,
    atendimento: null,
    precos: null,
  },
};

const formData = reactive({ ...defaultFormData });

function closeModal() {
  if (model.value) resetForm();
  model.value = false;
}

function resetForm() {
  Object.keys(defaultFormData).forEach((key) => {
    if (typeof defaultFormData[key] === "object" && defaultFormData[key] !== null) {
      Object.assign(formData[key], defaultFormData[key]);
    } else {
      formData[key] = defaultFormData[key];
    }
  });
  fileName.value = null;
  fileToUpload.value = null;
  validationError.value = null;
  uploadStatus.loading = false;
  uploadStatus.error = null;
  if (fileInputRef.value) fileInputRef.value.value = null;
}

function handleFileUpload(event) {
  const file = event.target.files?.[0];
  fileName.value = file?.name || null;
  fileToUpload.value = file || null;
}

function calculateAvgRating(ratings) {
  const validRatings = Object.values(ratings).filter(
    (r) => typeof r === "number" && r >= 1 && r <= 5
  );
  if (!validRatings.length) return null;
  return validRatings.reduce((a, b) => a + b, 0) / validRatings.length;
}

function isFormValid() {
  const unrated = Object.values(formData.ratings).some((r) => r === null);
  if (unrated) {
    validationError.value = "Por favor, avalie todas as 4 categorias.";
    return false;
  }
  validationError.value = null;
  return true;
}

async function submitReview() {
  if (isSubmitting.value || uploadStatus.loading || !isFormValid()) return;

  isSubmitting.value = true;
  uploadStatus.error = null;
  let createdReviewId = null;

  try {
    const avgRating = calculateAvgRating(formData.ratings);

    const reviewPayload = {
      title: formData.review_title,
      comment: formData.review_text,
      imageUrl: null,
      rating1: formData.ratings.comida,
      rating2: formData.ratings.ambiente,
      rating3: formData.ratings.atendimento,
      rating4: formData.ratings.precos,
      avgRating,
      userId: props.userId,
      restaurantId: props.restaurantId,
      userName: props.userName,
    };

    const createdReview = await postReview(reviewPayload);
    createdReviewId = createdReview.id;
    let finalReview = createdReview;

    if (fileToUpload.value) {
      uploadStatus.loading = true;
      finalReview = await uploadReviewImage(createdReviewId, fileToUpload.value);
      uploadStatus.loading = false;
    }

    model.value = false;

    emit("reviewSubmitted", {
      ...reviewPayload,
      ...finalReview,
      id: createdReviewId,
      userName: props.userName,
      userPhoto: props.userPhoto,
      reviewImageUrl: formData.image_url, 
    });

    resetForm();
  } catch (error) {
    console.error("Falha na submissão completa:", error);

    const apiErrorMessage =
      error.response?.data?.message ||
      error.message ||
      "Falha ao enviar avaliação. Verifique sua conexão e tente novamente.";

    validationError.value = apiErrorMessage;
  } finally {
    isSubmitting.value = false;
    uploadStatus.loading = false;
  }
}
</script>

<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
