<template>
  <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100 mb-6 flex items-center">
    
    <img 
      :src="restaurantIconUrl" 
      :alt="`Logo ${restaurantName}`" 
      class="w-16 h-16 rounded-full mr-4 object-cover border border-yellow-600 p-1"
    />
    
    <div>
      <h2 class="font-bold text-xl text-gray-800">{{ restaurantName }}</h2>
      
      <p class="text-sm text-gray-500">Avaliação Geral:
        <span class="flex items-center mt-1">
          <span 
            v-for="n in 5" 
            :key="n" 
            :class="['w-4 h-4 rounded-full mr-1', n <= generalRating ? 'bg-yellow-600' : 'bg-gray-300']">
          </span>
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    restaurantName: {
        type: String,
        required: true,
        default: 'Restaurante Desconhecido'
    },
    restaurantIconUrl: {
        type: String,
        required: true,
        default: 'https://via.placeholder.com/60/FFD700/000000?text=Logo'
    },
    generalRating: {
        type: Number,
        required: true,
        default: 4,
        validator: (value) => value >= 0 && value <= 5
    }
});
</script>

<style scoped>
</style>