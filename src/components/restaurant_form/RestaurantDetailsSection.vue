<template>
  <section class="section-card">
    <header class="section-header">
      <h2>Informações Gerais</h2>
      <p>Defina nome, telefone, descrição e links principais.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label class="field">
        <span>Nome do restaurante *</span>
        <input
          type="text"
          :value="modelValue.name"
          @input="updateField('name', $event.target.value)"
          placeholder="Don Mantelli Restaurante"
          required
        />
      </label>

      <label class="field">
        <span>Telefone *</span>
        <input
          type="text"
          :value="modelValue.phoneNumber"
          @input="updateField('phoneNumber', $event.target.value)"
          placeholder="(14) 3304-0007"
        />
      </label>
    </div>

    <label class="field">
      <span>Descrição *</span>
      <textarea
        rows="4"
        :value="modelValue.description"
        @input="updateField('description', $event.target.value)"
        placeholder="Descreva o estilo do restaurante e diferenciais"
      ></textarea>
    </label>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label class="field">
        <span>Site</span>
        <input
          type="text"
          :value="modelValue.site"
          @input="updateField('site', $event.target.value)"
          placeholder="https://www.donmantelli.com.br"
        />
      </label>

      <label class="field">
        <span>Link do cardápio</span>
        <input
          type="text"
          :value="modelValue.menu"
          @input="updateField('menu', $event.target.value)"
          placeholder="https://www.instagram.com/donmantelli/"
        />
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

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
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

.field input,
.field textarea {
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field textarea {
  resize: vertical;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
}
</style>
