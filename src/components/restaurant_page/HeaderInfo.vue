<template>
  <div v-if="loading" class="flex justify-between items-center mb-4">
    <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
  </div>
  <div v-else class="flex flex-wrap justify-between items-center gap-4 mb-4">
    <div>
      <h1 class="text-5xl font-extrabold text-transform: uppercase text-gray-800">
        {{ name || displayName }}
      </h1>
    </div>
    <div class="flex items-center gap-3">
      <router-link
        :to="{ name: 'restaurante-admin', params: { id: props.restaurantId } }"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition duration-150 shadow-md"
      >
        <AdjustmentsHorizontalIcon class="w-5 h-5" />
        <span>Admin</span>
      </router-link>
      <button
        @click="$emit('toggleSave')"
        aria-label="Salvar restaurante"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 border-2 border-amber-600"
        :class="
          isSaved
            ? 'bg-amber-600 text-white hover:bg-amber-700'
            : 'text-amber-600 bg-white hover:bg-amber-50'
        "
      >
        <BookmarkSolidIcon v-if="isSaved" class="w-5 h-5" />
        <BookmarkOutlineIcon v-else class="w-5 h-5" />
        <span class="uppercase">Salvar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed } from "vue";
import api from "../../api/api";
import {
  AdjustmentsHorizontalIcon,
  BookmarkIcon as BookmarkOutlineIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
    restaurantId: { 
        type: [String, Number], 
        required: true 
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: [Number, String],
        default: '4.5',
    },
    nReviews: {
        type: [Number, String],
        default: '120',
    },

    isSaved: {
        type: Boolean,
        default: false,
    },
});

const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);

const displayName = computed(() => {
  if (restaurant.value?.name) return restaurant.value.name;
  if (restaurant.value?.titulo) return restaurant.value.titulo;
  return "Seu Restaurante";
});

const extractRating = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toFixed(1);
  return null;
};

const displayRating = computed(() => {
  const rating =
    restaurant.value?.rating ??
    restaurant.value?.nota ??
    restaurant.value?.averageRating ??
    null;
  return extractRating(rating);
});

const fetchRestaurant = async (id) => {
  if (!id || id === 'undefined' || id === null) {
        console.warn('HeaderInfo: ID do restaurante ausente ou inválido. Abortando fetch.');
        loading.value = false;
        return; 
    }

  loading.value = true;
  error.value = false;
  try {
    const response = await api.get(`/restaurants/${id}`);
    restaurant.value = response.data;
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.restaurantId,
  (newId) => {
    fetchRestaurant(newId);
  },
  { immediate: true }
);

defineEmits(["toggleSave"]);
</script>
