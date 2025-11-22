<template>
  <div class="gallery-grid">
    <figure class="main-panel group">
      <img
        :src="displayedMainImage"
        alt="Imagem principal"
        class="main-panel__image"
      />
    </figure>

    <div class="thumbs-column">
      <button
        v-for="(thumb, index) in allThumbnails"
        :key="index"
        type="button"
        @click="handleThumbnailClick(thumb)"
        :class="['thumb-card group', { 'thumb-card--active': currentMainImage === thumb }]"
      >
        <img
          :src="thumb"
          :alt="`Miniatura ${index + 1}`"
          loading="lazy"
          class="thumb-card__image"
        />
        <span class="thumb-card__overlay"></span>
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

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
  gap: 0.75rem;
  width: 100%;
  height: clamp(260px, 40vw, 430px);
}

.main-panel {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background: #f8fafc;
  box-shadow: 0 25px 50px -20px rgba(15, 23, 42, 0.35);
}

.main-panel__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.main-panel:hover .main-panel__image {
  transform: scale(1);
}


.thumbs-column {
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  height: 100%;
}

.thumb-card {
  position: relative;
  border: none;
  background: transparent;
  border-radius: 0.85rem;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 20px 35px -25px rgba(15, 23, 42, 0.6);
  height: 100%;
}

.thumb-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.thumb-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumb-card:hover .thumb-card__image {
  transform: scale(1.005);
}

.thumb-card:hover .thumb-card__overlay {
  opacity: 1;
}

.thumb-card--active {
  outline: 3px solid #f97316;
  outline-offset: 3px;
}

@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: 4fr;
    height: auto;
  }

  .thumbs-column {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: auto;
    height: auto;
  }

  .thumb-card {
    padding-bottom: 65%;
    height: auto;
  }
}

@media (max-width: 640px) {
  .thumbs-column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }

  .thumb-card {
    padding-bottom: 75%;
  }
}
</style>