<template>
  <section class="section-card">
    <header class="section-header">
      <h2>Endereço</h2>
      <p>Defina endereço.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label class="field">
        <span>Rua *</span>
        <input
          type="text"
          :value="modelValue.street"
          @input="updateField('street', $event.target.value)"
          placeholder="Rua XV de Novembro"
        />
      </label>

      <label class="field">
        <span>Número *</span>
        <input
          type="text"
          :value="modelValue.number"
          @input="updateField('number', $event.target.value)"
          placeholder="497"
        />
      </label>

      <label class="field">
        <span>Complemento</span>
        <input
          type="text"
          :value="modelValue.complement"
          @input="updateField('complement', $event.target.value)"
          placeholder="Esquina com ..."
        />
      </label>

      <label class="field">
        <span>CEP *</span>
        <input
          type="text"
          :value="modelValue.zipCode"
          @input="updateField('zipCode', $event.target.value)"
          placeholder="17500-050"
        />
      </label>

      <label class="field">
        <span>Cidade *</span>
        <input
          type="text"
          :value="modelValue.city"
          @input="updateField('city', $event.target.value)"
          placeholder="Marília"
        />
      </label>

      <label class="field">
        <span>Estado *</span>
        <input
          type="text"
          :value="modelValue.state"
          @input="updateField('state', $event.target.value)"
          placeholder="SP"
        />
      </label>

      <label class="field">
        <span>País *</span>
        <input
          type="text"
          :value="modelValue.country"
          @input="updateField('country', $event.target.value)"
          placeholder="Brasil"
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
</style>
