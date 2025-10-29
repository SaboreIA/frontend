<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
    :class="modelValue ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    style="backdrop-filter: blur(2px)"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300"
      :class="modelValue ? 'scale-100' : 'scale-95'"
      @click.stop
    >
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-semibold text-gray-800">
            Avaliar Restaurante
          </h3>
          <button
            type="button"
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        <p class="text-sm text-indigo-600 font-medium mt-1">
          Restaurante: **{{
            restaurantNameProp || "Restaurante Desconhecido"
          }}**
        </p>
      </div>

      <form @submit.prevent="submitReview" class="p-6 space-y-6">
        <div class="flex items-center space-x-4 pb-4 border-b border-gray-100">
          <img
            class="h-12 w-12 rounded-full object-cover"
            :src="formData.user_photo"
            alt="Foto do Usuário"
          />
          <div>
            <p class="text-lg font-semibold text-gray-800">
              {{ formData.user_name }}
            </p>
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
          <label for="review-text" class="block text-gray-700 font-medium mb-2"
            >Comentário Final (Review)</label
          >
          <textarea
            id="review-text"
            v-model="formData.review_text"
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            placeholder="Escreva sua opinião detalhada..."
            required
          ></textarea>
        </div>

        <div>
          <label for="image-upload" class="block text-gray-700 font-medium mb-2"
            >Subir Imagem (Opcional)</label
          >
          <div class="flex items-center space-x-4">
            <label
              for="image-upload"
              class="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 cursor-pointer transition duration-150"
            >
              <svg
                class="w-5 h-5 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
            />
            <span class="text-sm text-gray-500 truncate max-w-xs">{{
              fileName || "Nenhum arquivo selecionado."
            }}</span>
          </div>
        </div>

        <div class="pt-4 flex justify-end">
          <button
            type="submit"
            class="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md"
          >
            Enviar Avaliação
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, watch, defineProps, defineEmits} from "vue";

const RatingGroup = {
  props: ["label", "name", "rating"],
  emits: ["update:rating"],
  template: `
    <div class="rating-group flex justify-between items-center">
      <label class="text-gray-700 font-medium">{{ label }}</label>
      
      <div class="flex space-x-2 rating-input-container"> 
        <div v-for="i in 5" :key="i" class="flex items-center">
          <input 
            type="radio" 
            :id="name + '-' + (6 - i)" 
            :name="name + '-rating'" 
            :value="6 - i" 
            :checked="rating === (6 - i)"
            @change="$emit('update:rating', 6 - i)"
            class="rating-input peer" 
            required 
          />
          <label :for="name + '-' + (6 - i)" class="rating-label">{{ 6 - i }}</label>
        </div>
      </div>
    </div>
  `,
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  restaurantNameProp: {
    type: String,
    default: "Restaurante Desconhecido",
  },
  userName: {
    type: String,
    default: "Avaliador Exemplo",
  },
  userPhoto: {
    type: String,
    default: "https://i.pravatar.cc/150?img=47",
  },
});

const emit = defineEmits(["update:modelValue", "reviewSubmitted"]);

const fileName = ref(null);

const defaultFormData = {
  restaurante: props.restaurantNameProp,
  user_name: props.userName,
  user_photo: props.userPhoto,
  review_text: "",
  image_url: null,
  ratings: {
    comida: null,
    ambiente: null,
    atendimento: null,
    precos: null,
  },
};

const formData = reactive({
  ...JSON.parse(JSON.stringify(defaultFormData)),
  user_name: props.userName,
  user_photo: props.userPhoto,
});

const initialFormData = JSON.parse(JSON.stringify(formData));

function closeModal() {
  emit("update:modelValue", false);
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
    formData.image_url =
      "https://images.unsplash.com/photo-1517248135460-49c7d41f71a0?q=80&w=1740&auto=format&fit=crop";
  } else {
    fileName.value = null;
    formData.image_url = null;
  }
}

function submitReview() {
  emit("update:modelValue", false);

  const submittedData = {
    ...JSON.parse(JSON.stringify(formData)),
    restaurante: props.restaurantNameProp,
    date: new Date().toISOString(),
  };

  emit("reviewSubmitted", submittedData);

  console.log("Avaliação enviada (emitida para o pai):", submittedData);

  resetForm();
}

function resetForm() {
  Object.keys(initialFormData).forEach((key) => {
    if (key !== "user_name" && key !== "user_photo" && key !== "restaurante") {
      formData[key] = initialFormData[key];
    }
  });

  formData.restaurante = props.restaurantNameProp;
  formData.user_name = props.userName;
  formData.user_photo = props.userPhoto;

  fileName.value = null;
  const fileInput = document.getElementById("image-upload");
  if (fileInput) fileInput.value = null;
}

watch(
  () => props.restaurantNameProp,
  (newVal) => {
    formData.restaurante = newVal;
  }
);

watch(
  () => props.userName,
  (newVal) => {
    formData.user_name = newVal;
  }
);

watch(
  () => props.userPhoto,
  (newVal) => {
    formData.user_photo = newVal;
  }
);
</script>

<style scoped>
.rating-input {
  display: none;
}
.rating-label {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;
  border: 2px solid #d1d5db;
  color: #4b5563;
  user-select: none;
}

.rating-input-container {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.rating-group input:checked + .rating-label,
.rating-group input:checked ~ input + .rating-label,
.rating-group input:hover + .rating-label,
.rating-group input:hover ~ input + .rating-label {
  background-color: #fbbf24;
  border-color: #fbbf24;
  color: white;
  transform: scale(1.1);
}

.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
