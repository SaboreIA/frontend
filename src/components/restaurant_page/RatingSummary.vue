<template>
  <div class="mt-6 flex flex-col md:flex-row gap-8 items-start">
    
    <div class="flex-shrink-0 text-center pr-8 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0">
      <p class="text-4xl font-extrabold text-gray-900">{{ averageRating }}</p>
      <p class="text-sm font-semibold mt-1 text-yellow-600">{{ excellentText }}</p> 
      <p class="text-xs text-gray-500 mt-1">Baseado em {{ totalReviews }} avaliações</p>
    </div>

    <div class="flex-grow w-full">
      <h4 class="text-sm font-semibold text-gray-700 mb-3 uppercase">Distribuição da Nota</h4>
      
      <div v-for="rating in ratingsData" :key="rating.label" class="flex items-center space-x-2 mb-2">
        <span class="text-xs font-medium text-gray-600 w-16 text-right">{{ rating.label }}</span>
        
        <div class="flex-grow bg-gray-200 rounded-full h-2">
          <div 
            :class="[
                'h-2 rounded-full transition-all duration-500', 
                'bg-yellow-500'
            ]"
            :style="{ width: rating.percentage }"
          ></div>
        </div>
        
        <span class="text-xs text-gray-500 w-8">{{ rating.percentage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  averageRating: {
    type: [String, Number],
    required: true,
  },
  
  excellentText: {
    type: String,
    default: 'Muito Bom',
  },
  
  totalReviews: {
    type: [String, Number],
    default: 120,
  },
  
  ratingsData: {
    type: Array,
    default: () => [
        { label: 'Excelente', percentage: '70%' },
        { label: 'Muito Bom', percentage: '15%' },
        { label: 'Bom', percentage: '10%' },
        { label: 'Média', percentage: '3%' },
        { label: 'Ruim', percentage: '2%' },
    ],
    validator: (value) => value.every(rating => rating.label && rating.percentage),
  },
});
</script>