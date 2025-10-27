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
          Restaurante: {{ restaurantNameProp || 'Restaurante Desconhecido' }}
        </p>
      </div>

      <form @submit.prevent="submitReview" class="p-6 space-y-6">
        <div
          class="flex items-center space-x-4 pb-4 border-b border-gray-100"
        >
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
          <label
            for="review-text"
            class="block text-gray-700 font-medium mb-2"
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
          <label
            for="image-upload"
            class="block text-gray-700 font-medium mb-2"
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
import { ref, reactive, watch, defineProps, defineEmits } from "vue";

// --- SUB-COMPONENTES EMBUTIDOS ---

// 1. Componente para o grupo de avaliação (RatingGroup)
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

// **IMPORTANTE**: O ReviewElipse e ReviewCTA não são usados DENTRO deste componente (RestaurantReview)
// Eles seriam usados no componente RestaurantPageView, para exibir os reviews.
// Então, não há necessidade de defini-los aqui. Se você precisar do card de review final,
// ele deve ser um componente SEPARADO no RestaurantPageView.


// --- PROPS E EMITS PARA V-MODEL E NOME DO RESTAURANTE ---

const props = defineProps({
  modelValue: { // v-model usa modelValue como padrão (true/false para abrir/fechar)
    type: Boolean,
    default: false
  },
  restaurantNameProp: { // Prop para receber o nome do restaurante do componente pai
    type: String,
    default: 'Restaurante Desconhecido'
  }
});

const emit = defineEmits(['update:modelValue', 'reviewSubmitted']); 


// --- ESTADO REATIVO DO FORMULÁRIO ---

const fileName = ref(null);

// Definição do estado inicial do formulário
const defaultFormData = {
  restaurante: props.restaurantNameProp, 
  user_name: "Avaliador Exemplo",
  user_photo: "https://i.pravatar.cc/150?img=47", // Foto de exemplo
  review_text: "",
  image_url: null, 
  ratings: {
    comida: null,    // Nova categoria
    ambiente: null,  // Nova categoria
    atendimento: null, // Nova categoria
    precos: null,    // Nova categoria (era custo, agora preços)
  },
};

// Cria uma cópia profunda para permitir um reset completo
const initialFormData = JSON.parse(JSON.stringify(defaultFormData)); 
const formData = reactive({ ...initialFormData });


// --- MÉTODOS ---

function closeModal() {
  emit('update:modelValue', false); // Fecha o modal
  // Opcional: Você pode resetar o formulário ao fechar sem enviar
  // resetForm(); 
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
    // SIMULAÇÃO: No mundo real, você faria um upload para um servidor e receberia uma URL real
    formData.image_url =
      "https://images.unsplash.com/photo-1517248135460-49c7d41f71a0?q=80&w=1740&auto=format&fit=crop"; // Exemplo de URL
  } else {
    fileName.value = null;
    formData.image_url = null;
  }
}

function submitReview() {
  // 1. Fecha o modal
  emit('update:modelValue', false); 

  // 2. Prepara os dados da avaliação para serem enviados
  const submittedData = {
    ...JSON.parse(JSON.stringify(formData)), // Garante uma cópia independente
    restaurante: props.restaurantNameProp, // Garante que o nome do restaurante esteja atualizado
    date: new Date().toISOString(), // Adiciona a data/hora do envio
  };

  // 3. Emite o evento 'reviewSubmitted' para o componente pai
  emit('reviewSubmitted', submittedData); 
  
  console.log("Avaliação enviada (emitida para o pai):", submittedData);

  // 4. Reseta o formulário para a próxima avaliação
  resetForm(); 
}

function resetForm() {
  // Limpa o formulário, retorna aos valores iniciais
  Object.assign(formData, JSON.parse(JSON.stringify(initialFormData)));
  // Garante que o nome do restaurante no formulário esteja atualizado com a prop
  formData.restaurante = props.restaurantNameProp; 
  
  fileName.value = null;
  const fileInput = document.getElementById("image-upload");
  if (fileInput) fileInput.value = null;
}

// Watcher para atualizar o nome do restaurante no formulário caso a prop mude dinamicamente
watch(() => props.restaurantNameProp, (newVal) => {
  formData.restaurante = newVal;
  // Se o modal estiver aberto e o nome mudar, isso atualiza o formulário.
  // Se ele estiver fechado e for reaberto, o resetForm já pega o valor da prop.
});
</script>

<style scoped>
/* --- ESTILOS PARA O RATING GROUP NO MODAL --- */

/* Esconde o input de rádio nativo */
.rating-input {
  display: none;
}
/* Estiliza o label para parecer uma bolinha */
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
  border: 2px solid #d1d5db; /* gray-300 */
  color: #4b5563; /* gray-600 */
  user-select: none;
}

/* IMPORTANTE: Aplica flex-direction: row-reverse APENAS no contêiner das bolinhas. */
.rating-input-container {
  flex-direction: row-reverse;
  /* Garante que o espaçamento entre as bolinhas seja respeitado */
  justify-content: flex-start;
}


/* O seletor `~` (irmão subsequente) preenche as bolinhas anteriores na ordem invertida. */
.rating-group input:checked + .rating-label,
.rating-group input:checked ~ input + .rating-label,
.rating-group input:hover + .rating-label,
.rating-group input:hover ~ input + .rating-label {
  background-color: #fbbf24; /* amber-500 */
  border-color: #fbbf24;
  color: white;
  transform: scale(1.1);
}

/* Regras de Transição (Melhoram a UX do modal) */
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>