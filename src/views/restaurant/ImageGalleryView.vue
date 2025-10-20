<template>
  <div class="grid grid-cols-4 gap-2 h-96">
    <div class="col-span-3 h-full rounded-lg overflow-hidden shadow-lg">
      <img
        :src="mainImage"
        alt="Imagem principal do restaurante"
        class="w-full h-full object-cover transition duration-300 hover:scale-[1.01]"
      />
    </div>

    <div class="col-span-1 flex flex-col gap-2">
      <div
        v-for="(thumb, index) in thumbnails"
        :key="index"
        class="h-1/3 rounded-lg overflow-hidden shadow-md cursor-pointer transition duration-150 hover:opacity-90"
      >
        <img
          :src="thumb"
          :alt="`Miniatura ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  mainImage: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Array,
    default: () => [], // Espera um array de URLs
  },
});
</script>