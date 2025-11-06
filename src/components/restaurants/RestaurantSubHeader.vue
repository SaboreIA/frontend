<template>
  <section class="bg-gray-50 border-b border-gray-200 sticky top-16 md:top-20 lg:top-24 z-40">
    <div class="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      <RestaurantSearchBar
        v-model="localSearchTerm"
        :placeholder="searchPlaceholderText"
        @search="emitSearch"
        @results="$emit('results', $event)"
        @clear="emitClear"
      />

      <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Filtros:</span>

        <div v-if="hasCuisineFilters" class="flex flex-wrap gap-2">
          <button
            v-for="cuisine in cuisineOptions"
            :key="cuisine"
            type="button"
            @click="toggleCuisine(cuisine)"
            :class="[
              'px-3 py-1 rounded-full border text-sm transition-colors duration-150',
              selectedCuisinesLocal.includes(cuisine)
                ? 'bg-yellow-600 border-yellow-600 text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-500 hover:text-yellow-600'
            ]"
          >
            {{ cuisine }}
          </button>
        </div>

  <div v-if="hasCuisineFilters" class="h-6 w-px bg-gray-300" role="presentation"></div>

        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Avaliação mínima:</span>
          <div class="flex gap-2">
            <button
              v-for="rating in ratingOptions"
              :key="rating"
              type="button"
              @click="setMinRating(rating)"
              :class="[
                'px-3 py-1 rounded-full border text-sm transition-colors duration-150',
                minRatingLocal === rating
                  ? 'bg-yellow-600 border-yellow-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-500 hover:text-yellow-600'
              ]"
            >
              {{ rating.toFixed(1) }}+
            </button>
          </div>
        </div>

        <button
          type="button"
          class="ml-auto text-sm text-gray-500 hover:text-gray-700 underline"
          @click="clearFilters"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import RestaurantSearchBar from './RestaurantSearchBar.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  availableCuisines: {
    type: Array,
    default: () => []
  },
  selectedCuisines: {
    type: Array,
    default: () => []
  },
  minRating: {
    type: Number,
    default: 0
  },
  searchPlaceholder: {
    type: String,
    default: 'Pesquisar restaurantes, pratos ou culinária...'
  }
});

const emit = defineEmits([
  'update:modelValue',
  'update:selectedCuisines',
  'update:minRating',
  'results',
  'search',
  'clear',
  'clear-filters'
]);

const localSearchTerm = ref(props.modelValue);
const selectedCuisinesLocal = ref(Array.isArray(props.selectedCuisines) ? [...props.selectedCuisines] : []);
const minRatingLocal = ref(props.minRating);

const ratingOptions = computed(() => [4.5, 4.0, 3.5, 3.0]);
const cuisineOptions = computed(() => props.availableCuisines ?? []);
const hasCuisineFilters = computed(() => cuisineOptions.value.length > 0);
const searchPlaceholderText = computed(() => props.searchPlaceholder);

watch(
  () => props.modelValue,
  (value) => {
    if (value !== localSearchTerm.value) {
      localSearchTerm.value = value;
    }
  }
);

const arraysEqual = (a = [], b = []) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => item === b[index]);
};

watch(
  () => props.selectedCuisines,
  (value) => {
    const normalized = Array.isArray(value) ? [...value] : [];
    if (!arraysEqual(normalized, selectedCuisinesLocal.value)) {
      selectedCuisinesLocal.value = normalized;
    }
  }
);

watch(
  () => props.minRating,
  (value) => {
    if (value !== minRatingLocal.value) {
      minRatingLocal.value = value;
    }
  }
);

watch(localSearchTerm, (value) => {
  emit('update:modelValue', value);
});

const emitSearch = (term) => {
  emit('search', term);
};

const emitClear = () => {
  emit('clear');
};

const toggleCuisine = (cuisine) => {
  const current = new Set(selectedCuisinesLocal.value);
  if (current.has(cuisine)) {
    current.delete(cuisine);
  } else {
    current.add(cuisine);
  }
  selectedCuisinesLocal.value = Array.from(current);
  emit('update:selectedCuisines', selectedCuisinesLocal.value);
};

const setMinRating = (rating) => {
  minRatingLocal.value = minRatingLocal.value === rating ? 0 : rating;
  emit('update:minRating', minRatingLocal.value);
};

const clearFilters = () => {
  selectedCuisinesLocal.value = [];
  minRatingLocal.value = 0;
  emit('update:selectedCuisines', []);
  emit('update:minRating', 0);
  emit('clear-filters');
};
</script>
```