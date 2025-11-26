<template>
  <section class="section-card">
    <header class="section-header">
      <h2>Endereço</h2>
      <p>Defina endereço.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label class="field md:col-span-2">
        <div class="field-header">
          <span>CEP *</span>
          <button
            type="button"
            class="cep-action"
            :disabled="cepLoading"
            @click="lookupCep"
          >
            <svg
              v-if="cepLoading"
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span>{{ cepLoading ? 'Buscando...' : 'Buscar CEP' }}</span>
          </button>
        </div>
        <input
          type="text"
          :value="maskedZipCode"
          inputmode="numeric"
          maxlength="9"
          @input="handleCepInput($event.target.value)"
          placeholder="17500-050"
        />
        <small v-if="cepStatus.message" :class="['helper', cepStatus.error ? 'helper--error' : 'helper--success']">
          {{ cepStatus.message }}
        </small>
      </label>

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
        <span>Bairro</span>
        <input
          type="text"
          :value="modelValue.neighborhood"
          @input="updateField('neighborhood', $event.target.value)"
          placeholder="Centro"
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
import { computed, ref } from 'vue';
import { fetchAddressByCep, sanitizeCep } from '@/utils/address';

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

const cepLoading = ref(false);
const cepStatus = ref({ message: '', error: false });

const formatCep = (value) => {
  const digits = sanitizeCep(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
};

const maskedZipCode = computed(() => formatCep(props.modelValue.zipCode));

const handleCepInput = (rawValue) => {
  const digits = sanitizeCep(rawValue).slice(0, 8);
  updateField('zipCode', digits);
  if (!digits || digits.length < 8) {
    cepStatus.value = {
      message: 'Informe 8 dígitos para buscar automaticamente.',
      error: true,
    };
  } else {
    cepStatus.value = { message: '', error: false };
  }
};

const applyAddressData = (data) => {
  const next = { ...props.modelValue };
  next.zipCode = data.zipCode;
  if (data.street) next.street = data.street;
  if (data.complement) next.complement = data.complement;
  if (data.neighborhood) next.neighborhood = data.neighborhood;
  if (data.city) next.city = data.city;
  if (data.state) next.state = data.state;
  emit('update:modelValue', next);
};

const lookupCep = async () => {
  const cep = sanitizeCep(props.modelValue.zipCode);
  if (cep.length !== 8) {
    cepStatus.value = {
      message: 'Digite um CEP com 8 dígitos para buscar.',
      error: true,
    };
    return;
  }

  cepLoading.value = true;
  cepStatus.value = { message: '', error: false };

  try {
    const address = await fetchAddressByCep(cep);
    applyAddressData(address);
    cepStatus.value = {
      message: 'Endereço preenchido automaticamente.',
      error: false,
    };
  } catch (error) {
    cepStatus.value = {
      message: error.message || 'Não foi possível buscar o CEP.',
      error: true,
    };
  } finally {
    cepLoading.value = false;
  }
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

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.cep-action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 9999px;
  border: 1px solid #fcd34d;
  padding: 0.35rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #92400e;
  background: #fffbeb;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.cep-action:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cep-action:not(:disabled):hover {
  border-color: #f59e0b;
  transform: translateY(-1px);
}

.helper--error {
  color: #dc2626;
}

.helper--success {
  color: #047857;
}
</style>
