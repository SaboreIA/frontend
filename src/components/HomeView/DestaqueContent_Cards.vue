<template>
  <div
    class="bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <img
      :src="restaurante.imgUrl"
      :alt="`Imagem de ${restaurante.nome}`"
      class="w-full h-48 object-cover"
    />

    <div class="p-5">
      <div class="flex justify-between items-start mb-2">
        <h2 class="text-xl font-semibold text-gray-900 truncate">
          {{ restaurante.nome }}
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
          <span class="text-gray-700 font-bold">{{ restaurante.nota }}</span>
        </div>
      </div>

      <span
        class="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium mb-3"
      >
        {{ restaurante.tipo }}
      </span>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ restaurante.descricao }}
      </p>

      <button
        class="w-full bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition duration-150"
      >
        Ver Detalhes
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  restaurante: {
    type: Object,
    required: true,
  },
});
</script>