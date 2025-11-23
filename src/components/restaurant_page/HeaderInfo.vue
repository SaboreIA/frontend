<template>
  <div v-if="loading" class="flex justify-between items-center mb-4">
    <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
  </div>
  <div v-else class="flex flex-wrap justify-between items-center gap-4 mb-4">
    <div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-transform: uppercase text-gray-800">
        {{ name || displayName }}
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

  <teleport to="body">
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Editar restaurante</h2>
          <button
            class="text-gray-500 hover:text-gray-700"
            @click="closeEditModal"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <form class="space-y-6" @submit.prevent="submitEdit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="text-sm font-semibold text-gray-600">Nome
              <input v-model="form.name" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" required />
            </label>
            <label class="text-sm font-semibold text-gray-600">Telefone
              <input v-model="form.phoneNumber" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">E-mail
              <input v-model="form.email" type="email" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Site
              <input v-model="form.site" type="url" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Menu
              <input v-model="form.menu" type="url" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Ativo?
              <select v-model="form.isActive" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2">
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </label>
          </div>

          <label class="text-sm font-semibold text-gray-600 block">Descrição
            <textarea v-model="form.description" rows="4" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2"></textarea>
          </label>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="text-sm font-semibold text-gray-600">Imagem de capa
              <input v-model="form.coverImageUrl" type="url" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Imagem 1
              <input v-model="form.imageUrl1" type="url" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Imagem 2
              <input v-model="form.imageUrl2" type="url" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Imagem 3
              <input v-model="form.imageUrl3" type="url" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="text-sm font-semibold text-gray-600">Dia de abertura
              <input v-model.number="form.openDay" type="number" min="0" max="6" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Dia de fechamento
              <input v-model.number="form.closeDay" type="number" min="0" max="6" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Hora de abertura
              <input v-model="form.openTime" type="time" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Hora de fechamento
              <input v-model="form.closeTime" type="time" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="text-sm font-semibold text-gray-600">CEP
              <input v-model="form.address.zipCode" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Rua
              <input v-model="form.address.street" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Número
              <input v-model="form.address.number" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Complemento
              <input v-model="form.address.complement" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Cidade
              <input v-model="form.address.city" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">Estado
              <input v-model="form.address.state" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
            <label class="text-sm font-semibold text-gray-600">País
              <input v-model="form.address.country" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" />
            </label>
          </div>

          <label class="text-sm font-semibold text-gray-600 block">Tag IDs (separados por vírgula)
            <input v-model="form.tagIdsText" type="text" class="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2" placeholder="9174, 9555" />
          </label>

          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50" @click="closeEditModal">
              Cancelar
            </button>
            <button type="submit" class="px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 disabled:opacity-50" :disabled="isSubmitting">
              {{ isSubmitting ? 'Salvando...' : 'Salvar alterações' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed, reactive } from "vue";
import api from "../../api/api";
import {
  AdjustmentsHorizontalIcon,
  BookmarkIcon as BookmarkOutlineIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
	restaurantId: {
		type: [Number, String],
		required: true,
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

const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);
const isEditModalOpen = ref(false);
const isSubmitting = ref(false);
const isDeleting = ref(false);
const buttonBaseClass =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold tracking-wide uppercase border-2 transition duration-200 shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const createEmptyForm = () => ({
  name: "",
  phoneNumber: "",
  email: "",
  description: "",
  site: "",
  menu: "",
  coverImageUrl: "",
  imageUrl1: "",
  imageUrl2: "",
  imageUrl3: "",
  isActive: true,
  openDay: 1,
  closeDay: 5,
  openTime: "",
  closeTime: "",
  address: {
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    country: "",
  },
  tagIdsText: "",
});

const form = reactive(createEmptyForm());

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
  loading.value = true;
  error.value = false;
  try {
    const response = await api.get(`/restaurants/${id}`);
    restaurant.value = response.data;
    hydrateForm(response.data);
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.restaurantId,
  (newId) => {
    if (newId) fetchRestaurant(newId);
  },
  { immediate: true }
);

const hydrateForm = (data) => {
  if (!data) return;
  form.name = data.name || "";
  form.phoneNumber = data.phoneNumber || "";
  form.email = data.email || "";
  form.description = data.description || "";
  form.site = data.site || "";
  form.menu = data.menu || "";
  form.coverImageUrl = data.coverImageUrl || "";
  form.imageUrl1 = data.imageUrl1 || "";
  form.imageUrl2 = data.imageUrl2 || "";
  form.imageUrl3 = data.imageUrl3 || "";
  form.isActive = typeof data.isActive === "boolean" ? data.isActive : true;
  form.openDay = data.openDay ?? 1;
  form.closeDay = data.closeDay ?? 5;
  form.openTime = data.openTime || "";
  form.closeTime = data.closeTime || "";
  form.address.zipCode = data.address?.zipCode || "";
  form.address.street = data.address?.street || "";
  form.address.number = data.address?.number || "";
  form.address.complement = data.address?.complement || "";
  form.address.city = data.address?.city || "";
  form.address.state = data.address?.state || "";
  form.address.country = data.address?.country || "";
  form.tagIdsText = Array.isArray(data.tagIds) ? data.tagIds.join(", ") : "";
};

const openEditModal = () => {
  if (!restaurant.value) return;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const parseTagIds = (text) =>
  text
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((num) => !Number.isNaN(num));

const buildUpdatePayload = () => ({
  name: form.name,
  phoneNumber: form.phoneNumber,
  email: form.email,
  description: form.description,
  site: form.site,
  menu: form.menu,
  coverImageUrl: form.coverImageUrl,
  imageUrl1: form.imageUrl1,
  imageUrl2: form.imageUrl2,
  imageUrl3: form.imageUrl3,
  isActive: form.isActive,
  openDay: form.openDay,
  closeDay: form.closeDay,
  openTime: form.openTime,
  closeTime: form.closeTime,
  address: { ...form.address },
  tagIds: parseTagIds(form.tagIdsText || ""),
});

const submitEdit = async () => {
  if (!props.restaurantId) return;
  isSubmitting.value = true;
  try {
    const payload = buildUpdatePayload();
    const { data } = await api.put(`/Restaurants/${props.restaurantId}`, payload);
    restaurant.value = data;
    hydrateForm(data);
    closeEditModal();
    emit("restaurant-updated", data);
    alert("Restaurante atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error);
    alert(error.response?.data?.message || "Não foi possível atualizar o restaurante.");
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = async () => {
  if (!props.restaurantId) return;
  const confirmation = window.confirm("Tem certeza que deseja excluir este restaurante? Esta ação é irreversível.");
  if (!confirmation) return;
  isDeleting.value = true;
  try {
    await api.delete(`/Restaurants/${props.restaurantId}`);
    alert("Restaurante excluído com sucesso.");
    emit("restaurant-deleted");
  } catch (error) {
    console.error("Erro ao excluir restaurante:", error);
    alert(error.response?.data?.message || "Não foi possível excluir o restaurante.");
  } finally {
    isDeleting.value = false;
  }
};
</script>
