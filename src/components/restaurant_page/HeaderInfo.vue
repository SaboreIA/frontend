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
    <div class="flex items-center gap-3 ml-auto">
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
      <template v-if="canManageRestaurant">
        <button
          @click="deleteRestaurant"
          aria-label="Excluir restaurante"
          :disabled="isDeleting"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 border-2 border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <TrashIcon class="w-5 h-5" />
          <span>{{ isDeleting ? 'Excluindo...' : 'Excluir' }}</span>
        </button>
        <button
          @click="editRestaurant"
          aria-label="Editar restaurante"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition duration-150 shadow-md"
        >
          <PencilSquareIcon class="w-5 h-5" />
          <span>Editar</span>
        </button>
      </template>
    </div>
  </div>

  <RestaurantEditModal
    :open="isEditModalOpen"
    :form="form"
    :media="media"
    :days="days"
    :available-tags="availableTags"
    :tags-loading="tagsLoading"
    :tags-error="tagsError"
    :tag-limit="TAG_LIMIT"
    :selected-tag-count="selectedTagCount"
    :disable-new-tag-selection="disableNewTagSelection"
    :is-tag-selected="isTagSelected"
    :is-submitting="isSubmitting"
    @close="closeModal"
    @submit="submitEdit"
    @toggle-tag="toggleTag"
    @update-media="handleUpdateMedia"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed, toRef } from "vue";
import api from "../../api/api";
import {
  PencilSquareIcon,
  TrashIcon,
  BookmarkIcon as BookmarkOutlineIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/vue/24/solid";
import RestaurantEditModal from "./RestaurantEditModal.vue";
import { useRestaurantEdit } from "@/composables/useRestaurantEdit";

const props = defineProps({
  restaurantId: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: [Number, String],
    default: "4.5",
  },
  nReviews: {
    type: [Number, String],
    default: "120",
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
  canManageRestaurant: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggleSave", "restaurant-updated", "restaurant-deleted"]);

const restaurantIdRef = toRef(props, "restaurantId");

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

const {
  form,
  media,
  isModalOpen: isEditModalOpen,
  isSubmitting,
  isDeleting,
  availableTags,
  tagsLoading,
  tagsError,
  TAG_LIMIT,
  days,
  selectedTagCount,
  disableNewTagSelection,
  isTagSelected,
  toggleTag,
  updateMediaField,
  openModal,
  closeModal,
  submitEdit: submitEditComposable,
  confirmDelete: confirmDeleteComposable,
} = useRestaurantEdit({
  restaurantId: restaurantIdRef,
  onUpdated: (data) => emit("restaurant-updated", data),
  onDeleted: () => emit("restaurant-deleted"),
});

const canManageRestaurant = computed(() => props.canManageRestaurant);

const handleUpdateMedia = ({ field, file }) => {
  if (!field) return;
  updateMediaField(field, file);
};

const editRestaurant = () => {
  openModal();
};

const deleteRestaurant = async () => {
  await confirmDeleteComposable();
};

const submitEdit = async () => {
  await submitEditComposable();
};

const fetchRestaurant = async (id) => {
  if (!id || id === "undefined" || id === null) {
    console.warn("HeaderInfo: ID do restaurante ausente ou inválido. Abortando fetch.");
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
</script>
