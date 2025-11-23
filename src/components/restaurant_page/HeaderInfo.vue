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

        <form class="space-y-5" @submit.prevent="submitEdit">
          <section class="section-card">
            <header class="section-header">
              <h2>Informações principais</h2>
              <p>Campos com * são obrigatórios.</p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="field">
                <span>Nome *</span>
                <input v-model="form.name" type="text" required />
              </label>
              <label class="field">
                <span>Telefone *</span>
                <input v-model="form.phoneNumber" type="text" />
              </label>
              <label class="field">
                <span>E-mail</span>
                <input v-model="form.email" type="email" />
              </label>
              <label class="field">
                <span>Site</span>
                <input v-model="form.site" type="url" />
              </label>
              <label class="field">
                <span>Menu</span>
                <input v-model="form.menu" type="url" />
              </label>
              <label class="field">
                <span>Status</span>
                <select v-model="form.isActive">
                  <option :value="true">Ativo</option>
                  <option :value="false">Inativo</option>
                </select>
              </label>
            </div>

            <label class="field">
              <span>Descrição *</span>
              <textarea
                rows="4"
                v-model="form.description"
                placeholder="Conte a história do restaurante, especialidades, atmosfera..."
              ></textarea>
            </label>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Funcionamento</h2>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="field">
                <span>Dia de abertura *</span>
                <select v-model.number="form.openDay">
                  <option v-for="day in days" :key="`open-${day.value}`" :value="day.value">{{ day.label }}</option>
                </select>
              </label>
              <label class="field">
                <span>Dia de fechamento *</span>
                <select v-model.number="form.closeDay">
                  <option v-for="day in days" :key="`close-${day.value}`" :value="day.value">{{ day.label }}</option>
                </select>
              </label>
              <label class="field">
                <span>Hora de abertura *</span>
                <input v-model="form.openTime" type="time" />
              </label>
              <label class="field">
                <span>Hora de fechamento *</span>
                <input v-model="form.closeTime" type="time" />
              </label>
            </div>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Endereço</h2>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="field">
                <span>CEP</span>
                <input v-model="form.address.zipCode" type="text" />
              </label>
              <label class="field">
                <span>Rua</span>
                <input v-model="form.address.street" type="text" />
              </label>
              <label class="field">
                <span>Número</span>
                <input v-model="form.address.number" type="text" />
              </label>
              <label class="field">
                <span>Complemento</span>
                <input v-model="form.address.complement" type="text" />
              </label>
              <label class="field">
                <span>Cidade</span>
                <input v-model="form.address.city" type="text" />
              </label>
              <label class="field">
                <span>Estado</span>
                <input v-model="form.address.state" type="text" />
              </label>
              <label class="field md:col-span-2">
                <span>País</span>
                <input v-model="form.address.country" type="text" />
              </label>
            </div>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Imagens</h2>
            </header>

            <ImageCropInput
              label="Imagem de capa"
              :required="true"
              :aspect-ratio="16 / 9"
              :initial-preview="form.coverImageUrl"
              :model-value="media.coverImage"
              @update:model-value="(file) => updateMediaField('coverImage', file)"
            />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ImageCropInput
                label="Imagem 1"
                :initial-preview="form.imageUrl1"
                :model-value="media.image1"
                :aspect-ratio="4 / 3"
                @update:model-value="(file) => updateMediaField('image1', file)"
              />
              <ImageCropInput
                label="Imagem 2"
                :initial-preview="form.imageUrl2"
                :model-value="media.image2"
                :aspect-ratio="4 / 3"
                @update:model-value="(file) => updateMediaField('image2', file)"
              />
              <ImageCropInput
                label="Imagem 3"
                :initial-preview="form.imageUrl3"
                :model-value="media.image3"
                :aspect-ratio="4 / 3"
                @update:model-value="(file) => updateMediaField('image3', file)"
              />
            </div>

            <p class="text-xs text-gray-500">
            </p>
          </section>

          <section class="section-card">
            <header class="section-header">
              <h2>Tags associadas</h2>
              <p>Selecione até {{ TAG_LIMIT }} tags para destacar o restaurante.</p>
            </header>
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>Tags do restaurante</span>
                <span class="text-xs font-normal text-gray-500">{{ selectedTagCount }}/{{ TAG_LIMIT }} selecionadas</span>
              </div>
              <p v-if="tagsLoading" class="text-sm text-gray-500">Carregando tags...</p>
              <p v-else-if="tagsError" class="text-sm text-red-600">{{ tagsError }}</p>
              <p v-else-if="!availableTags.length" class="text-sm text-gray-500">Nenhuma tag disponível no momento.</p>
              <div v-else class="flex flex-wrap gap-3">
                <button
                  v-for="tag in availableTags"
                  :key="tag.id"
                  type="button"
                  class="tag-chip"
                  :class="{
                    'tag-chip--active': isTagSelected(tag.id),
                    'tag-chip--disabled': disableNewTagSelection && !isTagSelected(tag.id),
                  }"
                  @click="toggleTag(tag.id)"
                  :disabled="disableNewTagSelection && !isTagSelected(tag.id)"
                >
                  {{ tag.name }}
                </button>
              </div>
              <p v-if="disableNewTagSelection && !tagsLoading" class="text-xs text-amber-600">
                Limite máximo de {{ TAG_LIMIT }} tags atingido.
              </p>
            </div>
          </section>

          <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
              @click="closeEditModal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
              :disabled="isSubmitting"
            >
              <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>{{ isSubmitting ? 'Salvando...' : 'Salvar alterações' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed, reactive, onMounted } from "vue";
import api from "../../api/api";
import { fetchTags } from "../../api/tags";
import { uploadRestaurantImages } from "../../api/restaurants";
import ImageCropInput from "../restaurant_form/ImageCropInput.vue";
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
const TAG_LIMIT = 10;
const availableTags = ref([]);
const tagsLoading = ref(false);
const tagsError = ref("");
const days = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];
const initialMediaState = () => ({
  coverImage: null,
  image1: null,
  image2: null,
  image3: null,
});
const media = reactive(initialMediaState());
const resetMedia = () => {
  Object.assign(media, initialMediaState());
};
const hasNewMedia = computed(
  () => Boolean(media.coverImage || media.image1 || media.image2 || media.image3)
);
const updateMediaField = (field, file) => {
  media[field] = file;
};
const buildMediaPayload = () => ({
  coverImage: media.coverImage,
  image1: media.image1,
  image2: media.image2,
  image3: media.image3,
});

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
  tagIds: [],
});

const form = reactive(createEmptyForm());
const selectedTagCount = computed(() => form.tagIds.length);
const disableNewTagSelection = computed(() => selectedTagCount.value >= TAG_LIMIT);
const isTagSelected = (tagId) => form.tagIds.includes(tagId);
const toggleTag = (tagId) => {
  const current = new Set(form.tagIds);
  if (current.has(tagId)) {
    current.delete(tagId);
  } else {
    if (current.size >= TAG_LIMIT) return;
    current.add(tagId);
  }
  form.tagIds = Array.from(current);
};

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

const loadTags = async () => {
  tagsLoading.value = true;
  tagsError.value = "";
  try {
    const { data } = await fetchTags();
    availableTags.value = Array.isArray(data) ? data : [];
  } catch (err) {
    tagsError.value = err?.response?.data?.message || "Não foi possível carregar as tags disponíveis.";
  } finally {
    tagsLoading.value = false;
  }
};

const fetchRestaurant = async (id, options = {}) => {
  if (!id) return;
  const { silent = false } = options;
  if (!silent) {
    loading.value = true;
  }
  error.value = false;
  try {
    const response = await api.get(`/restaurants/${id}`);
    restaurant.value = response.data;
    hydrateForm(response.data);
  } catch (e) {
    error.value = true;
  } finally {
    if (!silent) {
      loading.value = false;
    }
  }
};

watch(
  () => props.restaurantId,
  (newId) => {
    if (newId) fetchRestaurant(newId);
  },
  { immediate: true }
);
onMounted(loadTags);

const hydrateForm = (data) => {
  if (!data) return;
  resetMedia();
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
  form.tagIds = Array.isArray(data.tagIds) ? [...data.tagIds] : [];
};

const openEditModal = () => {
  if (!restaurant.value) return;
  resetMedia();
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  resetMedia();
};

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
  tagIds: [...form.tagIds],
});

const submitEdit = async () => {
  if (!props.restaurantId) return;
  isSubmitting.value = true;
  try {
    const payload = buildUpdatePayload();
    const { data } = await api.put(`/Restaurants/${props.restaurantId}`, payload);

    if (hasNewMedia.value) {
      await uploadRestaurantImages(props.restaurantId, buildMediaPayload());
      await fetchRestaurant(props.restaurantId, { silent: true });
      emit("restaurant-updated", restaurant.value);
    } else {
      restaurant.value = data;
      hydrateForm(data);
      emit("restaurant-updated", data);
    }

    closeEditModal();
    alert("Restaurante atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error);
    alert(error.response?.data?.message || "Não foi possível atualizar o restaurante.");
  } finally {
    isSubmitting.value = false;
    resetMedia();
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

<style scoped>
.section-card {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 10px 30px -20px rgba(15, 23, 42, 0.25);
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
.field select,
.field textarea {
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  background-color: #fff;
}

.field textarea {
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
}

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

</style>
