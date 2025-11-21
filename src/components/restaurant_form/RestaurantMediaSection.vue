<template>
  <section class="section-card">
    <header class="section-header">
      <h2>Imagens</h2>
      <p>Envie os arquivos que serão enviados ao Cloudinary após o cadastro.</p>
    </header>

    <label class="field">
      <span>Imagem de capa *</span>
      <input
        type="file"
        accept="image/*"
        @change="handleFileChange('coverImage', $event)"
      />
      <small class="helper" v-if="modelValue.coverImage">{{ modelValue.coverImage.name }}</small>
    </label>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <label class="field">
        <span>Imagem 1</span>
        <input type="file" accept="image/*" @change="handleFileChange('image1', $event)" />
        <small class="helper" v-if="modelValue.image1">{{ modelValue.image1.name }}</small>
      </label>

      <label class="field">
        <span>Imagem 2</span>
        <input type="file" accept="image/*" @change="handleFileChange('image2', $event)" />
        <small class="helper" v-if="modelValue.image2">{{ modelValue.image2.name }}</small>
      </label>

      <label class="field">
        <span>Imagem 3</span>
        <input type="file" accept="image/*" @change="handleFileChange('image3', $event)" />
        <small class="helper" v-if="modelValue.image3">{{ modelValue.image3.name }}</small>
      </label>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleFileChange = (field, event) => {
  const file = event.target.files?.[0] || null;
  emit('update:modelValue', { ...props.modelValue, [field]: file });
  event.target.value = '';
};
</script>

<style scoped>
.section-card {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header h2 {
  font-size: 1.15rem;
  font-weight: 600;
  color: #111827;
}

.section-header p {
  font-size: 0.9rem;
  color: #6b7280;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.field input {
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field input:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
}

.helper {
  font-size: 0.8rem;
  color: #6b7280;
}
</style>
