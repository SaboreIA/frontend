<template>
  <section class="section-card">
    <header class="section-header">
      <h2>Funcionamento & Tags</h2>
      <p>Selecione dias, horários e até 10 tags retornadas pela API.</p>
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

    <div class="space-y-2">
      <div class="flex items-center justify-between text-sm font-semibold text-gray-700">
        <span>Tags do restaurante</span>
        <span class="text-xs font-normal text-gray-500">{{ selectedCount }}/{{ maxTags }} selecionadas</span>
      </div>

  <div v-if="tagsLoading" class="text-sm text-gray-500">Carregando tags...</div>
  <div v-else-if="tagsError" class="text-sm text-red-600">{{ tagsError }}</div>
  <div v-else-if="!availableTags.length" class="text-sm text-gray-500">Nenhuma tag disponível no momento.</div>
  <div v-else class="flex flex-wrap gap-3">
        <label
          v-for="tag in availableTags"
          :key="tag.id"
          class="tag-chip"
          :class="{ 'tag-chip--active': isSelected(tag.id), 'tag-chip--disabled': disableNewSelection && !isSelected(tag.id) }"
        >
          <input
            type="checkbox"
            class="sr-only"
            :checked="isSelected(tag.id)"
            @change="toggleTag(tag.id)"
          />
          <span>{{ tag.name }}</span>
        </label>
      </div>
      <p v-if="disableNewSelection" class="text-xs text-amber-600">Limite máximo de {{ maxTags }} tags atingido.</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  availableTags: {
    type: Array,
    default: () => [],
  },
  maxTags: {
    type: Number,
    default: 10,
  },
  tagsLoading: {
    type: Boolean,
    default: false,
  },
  tagsError: {
    type: String,
    default: '',
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

const updateField = (field, value) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value });
};

const isSelected = (tagId) => props.modelValue.tagIds?.includes(tagId);

const selectedCount = computed(() => props.modelValue.tagIds?.length || 0);

const disableNewSelection = computed(() => selectedCount.value >= props.maxTags);

const toggleTag = (tagId) => {
  const current = new Set(props.modelValue.tagIds || []);

  if (current.has(tagId)) {
    current.delete(tagId);
  } else {
    if (current.size >= props.maxTags) {
      return;
    }
    current.add(tagId);
  }

  emit('update:modelValue', { ...props.modelValue, tagIds: Array.from(current) });
};
</script>

<style scoped>
.tag-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tag-chip--active {
  background-color: #065f46;
  color: #fff;
  border-color: #065f46;
  box-shadow: 0 8px 20px -6px rgba(6, 95, 70, 0.5);
}

.tag-chip--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

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
