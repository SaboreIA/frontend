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
          <label
            for="review-title"
            class="block text-gray-700 font-medium mb-2"
          >
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

          <p v-if="uploadStatus.loading" class="text-sm text-blue-500 mt-2">
            Fazendo upload da imagem...
          </p>

          <p v-if="uploadStatus.error" class="text-sm text-red-500 mt-2">
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
              isSubmitting || uploadStatus.loading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-yellow-600 text-white hover:bg-yellow-700',
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

      <Transition name="modal-fade">
        <div
          v-if="isCropping"
          class="fixed inset-0 z-50 flex items-center justify-center px-6 py-10 bg-black/60 backdrop-blur-sm"
        >
          <div class="absolute inset-0" @click="cancelCrop"></div>
          <div
            class="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/30"
          >
            <div
              class="bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-500 px-6 py-4 flex items-center justify-between"
            >
              <div>
                <h3 class="text-lg font-semibold text-white">Ajustar imagem</h3>
                <p class="text-sm text-white/80">
                  Reposicione e dê zoom para ajustar a imagem da sua avaliação.
                </p>
              </div>
              <button
                @click="cancelCrop"
                class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                &times;
              </button>
            </div>

            <div class="p-6 bg-white">
              <div
                class="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] items-start"
              >
                <div
                  class="relative w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner"
                >
                  <img
                    v-if="imageToCrop"
                    :src="imageToCrop"
                    ref="cropperImage"
                    alt="Imagem para recorte"
                    class="max-h-[480px] w-full object-contain select-none"
                  />
                  <div
                    v-else
                    class="flex items-center justify-center h-80 text-gray-400 text-sm"
                  >
                    Carregando imagem...
                  </div>
                </div>

                <div class="space-y-6">
                  <div>
                    <h4
                      class="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                    >
                      Pré-visualização
                    </h4>
                    <div class="mt-3 flex items-center justify-center">
                      <div
                        class="w-36 h-36 rounded-md border border-yellow-400 shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center"
                      >
                        <img
                          v-if="previewImage"
                          :src="previewImage"
                          alt="Pré-visualização"
                          class="w-full h-full object-cover"
                        />
                        <div v-else class="w-14 h-14 bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <button
                      type="button"
                      class="flex-1 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                      @click="cancelCrop"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold"
                      :disabled="isProcessingCrop"
                      @click="confirmCrop"
                    >
                      <span v-if="isProcessingCrop">Processando...</span>
                      <span v-else>Confirmar recorte</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineModel, nextTick, onBeforeUnmount } from "vue";
import RatingGroup from "./RatingGroup.vue";
import { uploadReviewImage, postReview } from "@/api/services/reviewService.js";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

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
const originalFileName = ref(null);
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

// Cropping state
const isCropping = ref(false);
const imageToCrop = ref(null);
const previewImage = ref(null);
const isProcessingCrop = ref(false);
const cropper = ref(null);
const cropperImage = ref(null);

function closeModal() {
  if (model.value) resetForm();
  model.value = false;
}

function resetForm() {
  Object.keys(defaultFormData).forEach((key) => {
    if (
      typeof defaultFormData[key] === "object" &&
      defaultFormData[key] !== null
    ) {
      Object.assign(formData[key], defaultFormData[key]);
    } else {
      formData[key] = defaultFormData[key];
    }
  });
  fileName.value = null;
  fileToUpload.value = null;
  originalFileName.value = null;
  validationError.value = null;
  uploadStatus.loading = false;
  uploadStatus.error = null;
  if (fileInputRef.value) fileInputRef.value.value = null;
  cancelCrop(false);
}

function handleFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  fileName.value = file.name || null;
  originalFileName.value = file.name || "upload.jpg";

  // Open cropper modal instead of setting file directly
  const reader = new FileReader();
  reader.onload = (e) => {
    imageToCrop.value = e.target?.result || null;
    if (!imageToCrop.value) return;
    isCropping.value = true;
    previewImage.value = null;
    nextTick(() => {
      initializeCropper();
    });
  };
  reader.readAsDataURL(file);
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
      finalReview = await uploadReviewImage(
        createdReviewId,
        fileToUpload.value
      );
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

// Cropper helpers
const resetFileInput = () => {
  if (fileInputRef.value) fileInputRef.value.value = null;
};

const cancelCrop = (resetPreview = true) => {
  if (cropper.value) {
    try {
      cropper.value.destroy();
    } catch (e) {
      /* ignore */
    }
    cropper.value = null;
  }
  isCropping.value = false;
  imageToCrop.value = null;
  if (resetPreview) previewImage.value = null;
  isProcessingCrop.value = false;
  resetFileInput();
};

const initializeCropper = () => {
  const imageElement = cropperImage.value;
  if (!imageElement) return;
  cropper.value = new Cropper(imageElement, {
    aspectRatio: 16 / 9,
    viewMode: 2,
    autoCropArea: 1,
    dragMode: "move",
    background: false,
    guides: false,
    highlight: false,
    movable: true,
    zoomable: true,
    scalable: false,
    responsive: true,
    minContainerHeight: 320,
    crop: () => updatePreview(),
    ready: () => updatePreview(),
  });
};

const updatePreview = () => {
  if (!cropper.value) return;
  const canvas = cropper.value.getCroppedCanvas({
    width: 800,
    height: 450,
    fillColor: "#fff",
  });
  if (!canvas) return;
  previewImage.value = canvas.toDataURL("image/png");
};

const confirmCrop = () => {
  if (!cropper.value) return;
  isProcessingCrop.value = true;
  const canvas = cropper.value.getCroppedCanvas({
    width: 1200,
    height: 675,
    fillColor: "#fff",
  });
  if (!canvas) {
    isProcessingCrop.value = false;
    return;
  }

  canvas.toBlob(
    async (blob) => {
      if (!blob) {
        isProcessingCrop.value = false;
        return;
      }

      try {
        // Convert blob to File so uploadReviewImage can handle it like a file input
        const filename = originalFileName.value || "upload.jpg";
        const file = new File([blob], filename, { type: blob.type });
        fileToUpload.value = file;
        fileName.value = filename;
        // Set preview to show user the chosen/cropped image
        previewImage.value = canvas.toDataURL("image/jpeg", 0.92);
        cancelCrop(false);
      } catch (err) {
        console.error("Erro ao processar crop:", err);
        uploadStatus.error = err.message || "Erro ao processar imagem.";
        cancelCrop(true);
      } finally {
        isProcessingCrop.value = false;
      }
    },
    "image/jpeg",
    0.92
  );
};

onBeforeUnmount(() => {
  cancelCrop(false);
});
</script>

<style scoped>
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
.transition-all {
  transition: all 0.3s ease-in-out;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
