<template>
  <div
    class="grid gap-3 w-full auto-rows-auto lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:h-[clamp(260px,40vw,430px)]"
  >
    <figure
      class="group relative w-full rounded-2xl overflow-hidden bg-slate-50 aspect-[4/3] lg:h-full lg:aspect-auto"
    >
      <img
        :src="displayedMainImage"
        alt="Imagem principal"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
    </figure>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 gap-2 sm:gap-3 lg:h-full"
    >
      <button
        v-for="(thumb, index) in allThumbnails"
        :key="index"
        type="button"
        @click="handleThumbnailClick(thumb)"
        :class="[
          'relative h-0 pb-[75%] sm:pb-[65%] lg:pb-0 lg:h-full rounded-xl overflow-hidden bg-transparent cursor-pointer transition-outline duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500',
          currentMainImage === thumb ? 'outline outline-4 outline-offset-4 outline-amber-500/80' : ''
        ]"
      >
        <img
          :src="thumb"
          :alt="`Miniatura ${index + 1}`"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
        <span class="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, computed } from 'vue';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter,Arial" font-size="22" fill="%239ca3af">Sem imagem</text></svg>';

const props = defineProps({
  mainImage: { type: String, required: true },
  thumbnails: { type: Array, default: () => [] },
});

const allThumbnails = computed(() => props.thumbnails.slice(0, 3));
const currentMainImage = ref(props.mainImage);
const displayedMainImage = computed(
  () => currentMainImage.value || allThumbnails.value[0] || PLACEHOLDER_IMAGE
);

const handleThumbnailClick = (clickedThumb) => {
  if (currentMainImage.value === clickedThumb) {
    currentMainImage.value = props.mainImage;
  } else {
    currentMainImage.value = clickedThumb;
  }
};

watch(
  () => props.mainImage,
  (newVal) => {
    currentMainImage.value = newVal;
  },
  { immediate: true }
);
</script>
