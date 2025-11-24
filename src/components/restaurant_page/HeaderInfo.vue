<template>
  <div v-if="loading" class="flex justify-between items-center mb-4">
    <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
  </div>
  <div v-else class="flex flex-wrap justify-between items-center gap-4 mb-4">
    <div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-transform: uppercase text-gray-800">
        {{ displayName }}
      </h1>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <router-link
        :to="{ name: 'restaurante-admin', params: { id: props.restaurantId } }"
        :class="[
          buttonBaseClass,
          'bg-amber-600 border-amber-600 text-white hover:bg-amber-700 hover:border-amber-700 focus-visible:ring-amber-500'
        ]"
      >
        <AdjustmentsHorizontalIcon class="w-5 h-5" />
        <span>Admin</span>
      </router-link>
      <button
        @click="$emit('toggleSave')"
        aria-label="Salvar restaurante"
        :class="[
          buttonBaseClass,
          isSaved
            ? 'border-amber-600 bg-amber-600 text-white hover:bg-amber-700 hover:border-amber-700 focus-visible:ring-amber-500'
            : 'border-amber-600 text-amber-600 bg-white hover:bg-amber-50 focus-visible:ring-amber-400'
        ]"
      >
        <BookmarkSolidIcon v-if="isSaved" class="w-5 h-5" />
        <BookmarkOutlineIcon v-else class="w-5 h-5" />
        <span>Salvar</span>
      </button>
      <button
        type="button"
        aria-label="Editar restaurante"
        :class="[
          buttonBaseClass,
          'border-amber-600 text-amber-600 bg-white hover:bg-amber-50 focus-visible:ring-amber-400'
        ]"
        @click="openEditModal"
      >
        <PencilSquareIcon class="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Excluir restaurante"
        :class="[
          buttonBaseClass,
          'border-red-500 text-red-600 bg-white hover:bg-red-50 focus-visible:ring-red-500 disabled:opacity-60 disabled:cursor-not-allowed'
        ]"
        @click="confirmDelete"
        :disabled="isDeleting"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
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
    @close="closeEditModal"
    @submit="submitEdit"
    @toggle-tag="toggleTag"
    @update-media="handleUpdateMedia"
  />
</template>

<script setup>
import { computed, toRef } from "vue";
import {
  AdjustmentsHorizontalIcon,
  BookmarkIcon as BookmarkOutlineIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/vue/24/solid";
import RestaurantEditModal from "./RestaurantEditModal.vue";
import { useRestaurantEdit } from "@/composables/useRestaurantEdit";

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

const emit = defineEmits(["toggleSave", "restaurant-updated", "restaurant-deleted"]);

const restaurantIdRef = toRef(props, "restaurantId");

const {
  restaurant,
  loading,
  form,
  media,
  isModalOpen,
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
  submitEdit,
  confirmDelete,
} = useRestaurantEdit({
  restaurantId: restaurantIdRef,
  onUpdated: (data) => emit("restaurant-updated", data),
  onDeleted: () => emit("restaurant-deleted"),
});

const handleUpdateMedia = ({ field, file }) => {
  if (!field) return;
  updateMediaField(field, file);
};

const displayName = computed(() => {
  if (props.name) return props.name;
  if (restaurant.value?.name) return restaurant.value.name;
  if (restaurant.value?.titulo) return restaurant.value.titulo;
  return "Seu Restaurante";
});

const buttonBaseClass =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold tracking-wide uppercase border-2 transition duration-200 shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

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
