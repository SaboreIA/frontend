<template>
  <div class="image-input">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-gray-800">
          {{ label }}<span v-if="required" class="text-red-500"> *</span>
        </p>
        <p v-if="description" class="text-xs text-gray-500 mt-0.5">{{ description }}</p>
      </div>

      <button
        v-if="modelValue"
        type="button"
        class="text-xs font-semibold text-rose-600 hover:text-rose-700"
        @click="clearImage"
      >
        Remover
      </button>
    </div>

    <div class="upload-card" :class="{ 'upload-card--filled': previewUrl }" @click="triggerFileSelect">
      <div v-if="previewUrl" class="preview-wrapper">
        <img :src="previewUrl" :alt="label" class="preview-image" />
      </div>
      <div v-else class="placeholder">
        <svg class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <p class="text-sm font-semibold text-gray-700 mt-3">Selecionar imagem</p>
        <p class="text-xs text-gray-500">PNG ou JPG até 5 MB</p>
      </div>
      <div class="upload-overlay">Trocar imagem</div>
    </div>

    <input ref="fileInput" type="file" class="sr-only" accept="image/*" @change="handleFileChange" />

    <transition name="fade">
      <div v-if="isCropping" class="crop-modal">
        <div class="crop-content">
          <header class="crop-header">
            <h3>Recortar {{ label.toLowerCase() }}</h3>
            <button type="button" class="close-btn" @click="cancelCrop">&times;</button>
          </header>
          <div class="crop-body">
            <img ref="cropperImage" :src="imageToCrop" alt="Pré-visualização de corte" />
          </div>
          <footer class="crop-footer">
            <button type="button" class="ghost-btn" @click="cancelCrop">Cancelar</button>
            <button type="button" class="primary-btn" :disabled="isProcessing" @click="confirmCrop">
              {{ isProcessing ? 'Processando...' : 'Aplicar corte' }}
            </button>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch, nextTick } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const props = defineProps({
  modelValue: {
    type: [File, null],
    default: null,
  },
  initialPreview: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: '',
  },
  aspectRatio: {
    type: Number,
    default: 4 / 3,
  },
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const cropperImage = ref(null);
const previewUrl = ref('');
const objectUrl = ref('');
const isCropping = ref(false);
const imageToCrop = ref('');
const cropperInstance = ref(null);
const isProcessing = ref(false);

const triggerFileSelect = () => {
  fileInput.value?.click();
};

const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imageToCrop.value = e.target?.result || '';
    if (!imageToCrop.value) return;
    isCropping.value = true;
    nextTick(initCropper);
  };
  reader.readAsDataURL(file);
  event.target.value = '';
};

const initCropper = () => {
  if (!cropperImage.value) return;
  destroyCropper();
  cropperInstance.value = new Cropper(cropperImage.value, {
    aspectRatio: props.aspectRatio,
    viewMode: 2,
    dragMode: 'move',
    autoCropArea: 1,
    background: false,
    guides: false,
    minContainerHeight: 360,
  });
};

const confirmCrop = () => {
  if (!cropperInstance.value) return;
  isProcessing.value = true;
  const width = 1600;
  const height = Math.round(width / props.aspectRatio);
  const canvas = cropperInstance.value.getCroppedCanvas({
    width,
    height,
    imageSmoothingQuality: 'high',
    fillColor: '#fff',
  });

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        isProcessing.value = false;
        return;
      }
      const file = new File([blob], `restaurant-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
      emit('update:modelValue', file);
      setPreviewFromFile(file);
      closeCropper();
    },
    'image/jpeg',
    0.9
  );
};

const closeCropper = () => {
  isProcessing.value = false;
  destroyCropper();
  isCropping.value = false;
  imageToCrop.value = '';
};

const cancelCrop = () => {
  closeCropper();
};

const destroyCropper = () => {
  if (cropperInstance.value) {
    cropperInstance.value.destroy();
    cropperInstance.value = null;
  }
};

const clearPreview = () => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value);
    objectUrl.value = '';
  }
  previewUrl.value = '';
};

const setPreviewFromFile = (file) => {
  clearPreview();
  if (file instanceof File) {
    objectUrl.value = URL.createObjectURL(file);
    previewUrl.value = objectUrl.value;
  }
};

const applyInitialPreview = () => {
  if (props.modelValue) return;
  previewUrl.value = props.initialPreview || '';
};

const clearImage = () => {
  emit('update:modelValue', null);
  clearPreview();
  applyInitialPreview();
};

watch(
  () => props.modelValue,
  (newFile) => {
    if (!newFile) {
      clearPreview();
      applyInitialPreview();
      return;
    }
    setPreviewFromFile(newFile);
  },
  { immediate: true }
);

watch(
  () => props.initialPreview,
  () => {
    if (!props.modelValue) {
      previewUrl.value = props.initialPreview || '';
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  destroyCropper();
  clearPreview();
});
</script>

<style scoped>
.image-input {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.upload-card {
  position: relative;
  border: 2px dashed #fbbf24;
  border-radius: 1.25rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(249, 250, 251, 1), rgba(255, 247, 237, 0.8));
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.upload-card--filled {
  border-style: solid;
}

.upload-card:hover {
  border-color: #f59e0b;
  transform: translateY(-1px);
}

.preview-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  text-align: center;
}

.upload-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  color: white;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  text-transform: uppercase;
}

.upload-card:hover .upload-overlay {
  opacity: 1;
}

.crop-modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 2000;
}

.crop-content {
  width: min(900px, 100%);
  background: #fff;
  border-radius: 1.5rem;
  padding: 1rem 1.5rem 1.5rem;
  box-shadow: 0 20px 50px -20px rgba(15, 23, 42, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.crop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crop-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  border: none;
  background: transparent;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  color: #9ca3af;
}

.crop-body {
  max-height: 60vh;
  overflow: hidden;
  border-radius: 1rem;
}

.crop-body img {
  width: 100%;
  display: block;
}

.crop-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.ghost-btn,
.primary-btn {
  border-radius: 9999px;
  padding: 0.6rem 1.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.ghost-btn {
  background: #f3f4f6;
  color: #374151;
}

.primary-btn {
  background: #d97706;
  color: white;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
