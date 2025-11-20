<template>
  <div class="w-full flex justify-center px-4">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-3xl flex items-center gap-3"
    >
      <div class="relative flex-1 min-w-0">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span>
        <input
          v-model="searchTerm"
          type="search"
          :placeholder="placeholder"
          class="w-full pl-10 pr-10 py-2 text-sm md:text-base border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#B8860B]/60 focus:border-[#B8860B]/60 transition duration-150"
        />
        <button
          v-if="searchTerm"
          type="button"
          @click="clearSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition duration-150"
          aria-label="Limpar busca"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <button
        type="submit"
        class="flex items-center justify-center bg-[#B8860B] hover:bg-[#a07309] text-white font-semibold text-sm md:text-base py-2 px-5 rounded-full transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="isSearching"
      >
        <span v-if="!isSearching">Buscar</span>
        <span v-else class="flex items-center gap-2">
          Buscando...
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </span>
      </button>
    </form>
  </div>

  <p v-if="errorMessage" class="mt-2 text-sm text-red-600 text-center">{{ errorMessage }}</p>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Pesquisar restaurantes, pratos ou culinária...'
  }
});

const emit = defineEmits(['update:modelValue', 'search', 'results', 'clear']);

const searchTerm = ref(props.modelValue);
const isSearching = ref(false);
const errorMessage = ref('');

watch(
  () => props.modelValue,
  (value) => {
    if (value !== searchTerm.value) {
      searchTerm.value = value;
    }
  }
);

watch(searchTerm, (value) => {
  emit('update:modelValue', value);
  if (!value) {
    errorMessage.value = '';
  }
});

const handleSubmit = async () => {
  const term = searchTerm.value.trim();

  if (!term) {
    emit('search', '');
    emit('clear');
    errorMessage.value = '';
    return;
  }

  emit('search', term);
  isSearching.value = true;
  errorMessage.value = '';

  try {
    const response = await axios.get('/api/search', { params: { q: term } });
    emit('results', response.data);
    console.log('Resultados da pesquisa:', response.data);
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    errorMessage.value = 'Não foi possível realizar a busca. Tente novamente.';
  } finally {
    isSearching.value = false;
  }
};

const clearSearch = () => {
  searchTerm.value = '';
  errorMessage.value = '';
  emit('search', '');
  emit('clear');
};
</script>
```}