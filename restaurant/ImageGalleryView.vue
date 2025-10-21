<template>
  <div class="grid grid-cols-4 gap-2 **h-96**">
    <div class="col-span-3 h-full rounded-lg overflow-hidden shadow-lg relative isolate">
      <img :src="mainImage" alt="Imagem principal do restaurante"
        class="w-full h-full **object-cover** transition duration-300 hover:scale-[1.01] hover:z-30" />
    </div>

    <div class="col-span-1 grid grid-rows-3 gap-2">
      <div v-for="(thumb, index) in thumbnails" :key="index"
        class="rounded-lg overflow-hidden shadow-md cursor-pointer transition duration-150 hover:opacity-90 relative">
        <img :src="thumb" :alt="`Miniatura ${index + 1}`"
          class="w-full h-full **object-cover** transition duration-300 hover:scale-[1.05]" />
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
    default: () => [],
  },
});
</script>