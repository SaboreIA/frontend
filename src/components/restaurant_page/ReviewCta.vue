<template>
  <div class="flex flex-wrap items-center gap-4">
    <div 
      v-if="hasReviews" 
      class="flex items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm border border-gray-200"
    >
      <div class="flex items-center text-yellow-500 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.06 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.289-3.959z"/>
        </svg>
      </div>

      <span class="text-gray-800 font-semibold text-sm">
        {{ averageRating.toFixed(1) }}
      </span>
      <span class="text-gray-500 text-sm ml-1">
        ({{ totalReviews }} avaliações)
      </span>
    </div>

    <span 
      class="text-sm font-medium text-gray-600 hover:text-yellow-600 cursor-pointer transition"
      @click="$emit('scrollToComments')"
    >
      Veja os comentários
    </span>

    <button 
      @click="$emit('requestReview')" 
      :class="[
        'px-4 py-2 rounded-lg text-sm font-bold shadow-md transition duration-150 border-2 border-transparent',
        primaryColor === 'bg-yellow-600'
          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      ]"
    >
      Faça uma avaliação
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  primaryColor: { type: String, default: 'bg-amber-600' },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
});

const emit = defineEmits(['requestReview', 'scrollToComments']);

const hasReviews = computed(() => props.totalReviews > 0);
</script>
