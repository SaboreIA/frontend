<template>
  <section class="section-card">
    <header class="section-header">
      <h2>Imagens</h2>
      <p>Insira as imagens.</p>
    </header>

    <ImageCropInput
      label="Imagem de capa"
      description="Use uma foto ampla e convidativa"
      :required="true"
      :model-value="modelValue.coverImage"
      :aspect-ratio="16 / 9"
      @update:model-value="(file) => updateImage('coverImage', file)"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <ImageCropInput
        label="Imagem 1"
        description="Ex: Área interna ou fachada"
        :model-value="modelValue.image1"
        :aspect-ratio="4 / 3"
        @update:model-value="(file) => updateImage('image1', file)"
      />
      <ImageCropInput
        label="Imagem 2"
        description="Ex: Detalhe do cardápio"
        :model-value="modelValue.image2"
        :aspect-ratio="4 / 3"
        @update:model-value="(file) => updateImage('image2', file)"
      />
      <ImageCropInput
        label="Imagem 3"
        description="Ex: Ambiente ou equipe"
        :model-value="modelValue.image3"
        :aspect-ratio="4 / 3"
        @update:model-value="(file) => updateImage('image3', file)"
      />
    </div>
  </section>
</template>

<script setup>
import ImageCropInput from './ImageCropInput.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateImage = (field, file) => {
  emit('update:modelValue', { ...props.modelValue, [field]: file });
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

</style>
