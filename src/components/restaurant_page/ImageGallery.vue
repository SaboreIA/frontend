<template>
  <div class="grid grid-cols-4 gap-2 h-full w-full">
    
    <div class="col-span-3 h-full w-full rounded-lg overflow-hidden shadow-lg relative group bg-gray-100">
      <img 
        :src="currentMainImage" 
        alt="Imagem principal"
        class="w-full h-full object-cover block transition-transform duration-500 ease-in-out group-hover:scale-105 transform-gpu" 
      />
    </div>

    <div class="col-span-1 h-full grid grid-rows-3 gap-2">
      <div v-for="(thumb, index) in allThumbnails" :key="index"
        @click="handleThumbnailClick(thumb)" 
        :class="[
          'w-full h-full rounded-lg overflow-hidden shadow-md cursor-pointer relative group bg-gray-100', 
          { 'ring-2 ring-yellow-600 ring-offset-1': currentMainImage === thumb }
        ]">
        
        <img 
          :src="thumb" 
          :alt="`Miniatura ${index + 1}`"
          class="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-110 transform-gpu" 
        />
        
        <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, computed } from 'vue';

const props = defineProps({
  mainImage: { type: String, required: true },
  thumbnails: { type: Array, default: () => [] },
});

const allThumbnails = computed(() => props.thumbnails.slice(0, 3));
const currentMainImage = ref(props.mainImage);

const handleThumbnailClick = (clickedThumb) => {
  if (currentMainImage.value === clickedThumb) {
    currentMainImage.value = props.mainImage;
  } else {
    currentMainImage.value = clickedThumb;
  }
};

watch(() => props.mainImage, (newVal) => {
    currentMainImage.value = newVal;
}, { immediate: true });
</script>