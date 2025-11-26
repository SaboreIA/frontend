<template>
  <div class="mt-6 flex flex-col md:flex-row gap-8 items-start">

    <div
      v-if="loading"
      class="text-center pr-8 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0"
    >
      <p class="text-4xl font-extrabold text-gray-900">...</p>
      <p class="text-sm font-semibold mt-1 text-yellow-600">Carregando</p>
      <p class="text-xs text-gray-500 mt-1">Buscando avaliações...</p>
    </div>

    <div
      v-else-if="totalReviews > 0"
      class="flex-shrink-0 text-center pr-8 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0"
    >
      <p class="text-4xl font-extrabold text-gray-900">{{ averageRating }}</p>
      <p class="text-sm font-semibold mt-1 text-yellow-600">{{ excellentText }}</p>
      <p class="text-xs text-gray-500 mt-1">Baseado em {{ totalReviews }} avaliações</p>
    </div>

    <div v-if="totalReviews > 0" class="flex-grow w-full">
      <h4 class="text-sm font-semibold text-gray-700 mb-3 uppercase">
        Distribuição de Avaliações
      </h4>
      
      <div
        v-for="rating in ratingsData"
        :key="rating.label"
        class="flex items-center space-x-2 mb-2"
      >
        <span class="text-xs font-medium text-gray-600 w-24 text-right">
          {{ rating.label }}
        </span>
        
        <div class="flex-grow bg-gray-200 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500 bg-yellow-500"
            :style="{ width: rating.percentage }"
          ></div>
        </div>

        <span class="text-xs text-gray-500 w-16 text-left">
          {{ rating.percentage }}
        </span>
      </div>
    </div>

    <div v-else-if="!loading" class="text-gray-500 italic">
      Ainda não há avaliações para exibir as estatísticas.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  averageRating: {
    type: [Number, String],
    required: true,
  },
  totalReviews: {
    type: Number,
    required: true,
  },
  ratingsData: {
    type: Array,
    required: true,
    default: () => [],
  },
  excellentText: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
