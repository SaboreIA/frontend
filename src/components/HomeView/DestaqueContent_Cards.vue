<template>
  <div
    class="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div class="relative">
      <img
        :src="restaurante.coverImageUrl"
        :alt="`Imagem de ${restaurante.name}`"
        class="w-full h-48 object-cover"
      />
      
      <div
        :class="[
          'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md',
          statusDisplay.class
        ]"
      >
        {{ statusDisplay.text }}
      </div>
      </div>

    <div class="p-5">
      <div class="flex justify-between items-start mb-2">
        <h2 class="text-xl font-semibold text-gray-900 truncate">
          {{ restaurante.name }}
        </h2>
        <div class="flex items-center space-x-1">
          <svg
            class="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="text-gray-700 font-bold">{{ restaurante.nota || restaurante.rating || 'N/A' }}</span>
        </div>
      </div>

      <span
        class="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium mb-3"
      >
        {{ restaurante.tipo || restaurante.type || 'Sem Categoria' }}
      </span>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ restaurante.description }}
      </p>

      <button
        @click="handleClick"
        class="w-full bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition duration-150"
      >
        Ver Detalhes
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  restaurante: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const statusDisplay = computed(() => {
  const isActive = props.restaurante.isActive;
  
  if (isActive === true) {
    return { text: 'ABERTO', class: 'bg-green-600 text-white' };
  } else if (isActive === false) {
    return { text: 'FECHADO', class: 'bg-red-600 text-white' };
  } else {
    return { text: 'INDISPONÍVEL', class: 'bg-gray-400 text-white' }; 
  }
});

const handleClick = () => {
  const restaurantId = props.restaurante.id;

  router.push({
    name: 'restaurante-detalhe',
    params: { id: restaurantId } 
  });
};
</script>