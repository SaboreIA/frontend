<template>
  <section class="section-card">
    <header class="section-header">
      <h2>Funcionamento & Tags</h2>
      <p>Selecione dias, horários e tags.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label class="field">
        <span>Dia de abertura *</span>
        <select :value="modelValue.openDay" @change="updateField('openDay', Number($event.target.value))">
          <option v-for="(label, value) in days" :key="value" :value="value">{{ label }}</option>
        </select>
      </label>

      <label class="field">
        <span>Dia de fechamento *</span>
        <select :value="modelValue.closeDay" @change="updateField('closeDay', Number($event.target.value))">
          <option v-for="(label, value) in days" :key="value" :value="value">{{ label }}</option>
        </select>
      </label>

      <label class="field">
        <span>Horário de abertura *</span>
        <input type="time" :value="modelValue.openTime" @input="updateField('openTime', $event.target.value)" />
      </label>

      <label class="field">
        <span>Horário de fechamento *</span>
        <input type="time" :value="modelValue.closeTime" @input="updateField('closeTime', $event.target.value)" />
      </label>
    </div>

    <label class="field">
      <span>Tag IDs (separe por vírgula)</span>
      <input
        type="text"
        :value="tagInput"
        @input="onTagInput($event.target.value)"
        placeholder="4153, 4308"
      />
    </label>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const days = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

const tagInput = ref(props.modelValue.tagIds?.join(', ') || '');

watch(
  () => props.modelValue.tagIds,
  (newValue) => {
    if (!Array.isArray(newValue)) return;
    tagInput.value = newValue.join(', ');
  }
);

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};

const onTagInput = (value) => {
  tagInput.value = value;
  const numeric = value
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((num) => !Number.isNaN(num));
  emit('update:modelValue', { ...props.modelValue, tagIds: numeric });
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
.field select {
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field input:focus,
.field select:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
}
</style>
