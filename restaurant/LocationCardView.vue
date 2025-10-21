<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
    
    <div class="bg-gray-200 h-40 flex items-center justify-center rounded-lg shadow-inner cursor-pointer hover:opacity-90 transition">
      <span class="text-lg font-bold text-gray-600">MAPA DO GOOGLE</span>
    </div>
    
    <div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Endereço</h3>
      <p class="text-gray-600 whitespace-pre-line">{{ address }}</p>
      
      <a :href="mapLink" target="_blank" class="mt-2 inline-block text-yellow-600 hover:text-yellow-700 text-sm font-medium transition">
        Ver no mapa
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  address: String,
  mapLink: String,
});
</script>