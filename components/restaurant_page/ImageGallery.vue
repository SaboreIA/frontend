<template>
  <div class="grid grid-cols-4 gap-2 h-96">
    <div class="col-span-3 h-full rounded-lg overflow-hidden shadow-lg relative isolate">
      <img :src="currentMainImage" alt="Imagem principal do restaurante"
        class="w-full h-full object-cover transition duration-300 hover:scale-[1.01] hover:z-30" />
    </div>

    <div class="col-span-1 grid grid-rows-3 gap-2">
      <div v-for="(thumb, index) in allThumbnails" :key="index"
        @click="currentMainImage = thumb" 
        :class="['rounded-lg overflow-hidden shadow-md cursor-pointer transition duration-150 hover:opacity-90 relative', 
                 { 'ring-2 ring-yellow-600 ring-offset-2': currentMainImage === thumb }
        ]">
        <img :src="thumb" :alt="`Miniatura ${index + 1}`"
          class="w-full h-full object-cover transition duration-300 hover:scale-[1.05]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, computed } from 'vue';

const props = defineProps({
  mainImage: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Array,
    default: () => [],
  },
});

const allThumbnails = computed(() => {
    return props.thumbnails.slice(0, 3);
});

const currentMainImage = ref(props.mainImage);

watch(() => props.mainImage, (newMainImage) => {
    currentMainImage.value = newMainImage;
}, { immediate: true });
</script>