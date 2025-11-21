<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-5xl mx-auto px-4 space-y-8">
      <header class="space-y-3 text-center">
        <p class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-600">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          Novo Restaurante
        </p>
        <h1 class="text-3xl font-bold text-gray-900">Cadastrar Restaurante</h1>
      </header>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <RestaurantDetailsSection v-model="form.details" />
        <RestaurantAddressSection v-model="form.address" />
        <RestaurantMediaSection v-model="form.media" />
        <RestaurantScheduleSection
          v-model="form.schedule"
          :available-tags="availableTags"
          :tags-loading="tagsLoading"
          :tags-error="tagsError"
          :max-tags="TAG_LIMIT"
        />

        <section class="bg-white rounded-2xl border border-dashed border-amber-200 p-6 space-y-4">
          <p class="text-sm text-gray-500">
            Revise antes de enviar. Campos com * são obrigatórios.
          </p>

          <div v-if="feedback.error" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {{ feedback.error }}
          </div>

          <div v-if="feedback.success" class="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {{ feedback.success }}
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              @click="router.push('/painel')"
            >
              Voltar ao painel
            </button>

            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>{{ loading ? 'Enviando...' : 'Salvar cadastro' }}</span>
            </button>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import RestaurantDetailsSection from '@/components/restaurant_form/RestaurantDetailsSection.vue';
import RestaurantAddressSection from '@/components/restaurant_form/RestaurantAddressSection.vue';
import RestaurantMediaSection from '@/components/restaurant_form/RestaurantMediaSection.vue';
import RestaurantScheduleSection from '@/components/restaurant_form/RestaurantScheduleSection.vue';
import { createRestaurant, uploadRestaurantImages } from '@/api/restaurants';
import { fetchTags } from '@/api/tags';

const router = useRouter();
const TAG_LIMIT = 10;

const availableTags = ref([]);
const tagsLoading = ref(false);
const tagsError = ref('');

const initialState = () => ({
  details: {
    name: '',
    phoneNumber: '',
    description: '',
    site: '',
    menu: '',
  },
  address: {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil',
    zipCode: '',
  },
  media: {
    coverImage: null,
    image1: null,
    image2: null,
    image3: null,
  },
  schedule: {
    openDay: 1,
    closeDay: 0,
    openTime: '',
    closeTime: '',
    tagIds: [],
  },
});

const form = reactive(initialState());
const loading = ref(false);
const feedback = reactive({ error: '', success: '' });

const resetForm = () => {
  Object.assign(form, initialState());
};

const buildPayload = () => ({
  name: form.details.name,
  phoneNumber: form.details.phoneNumber,
  description: form.details.description,
  site: form.details.site,
  menu: form.details.menu,
  openDay: form.schedule.openDay,
  closeDay: form.schedule.closeDay,
  openTime: form.schedule.openTime,
  closeTime: form.schedule.closeTime,
  tagIds: form.schedule.tagIds,
  address: { ...form.address },
});

const validate = () => {
  if (!form.details.name.trim()) return 'Informe o nome do restaurante.';
  if (!form.details.phoneNumber.trim()) return 'Informe o telefone de contato.';
  if (!form.details.description.trim()) return 'Adicione uma descrição.';
  if (!form.media.coverImage) return 'Selecione a imagem de capa para enviar ao Cloudinary.';
  if (!form.address.street.trim() || !form.address.number.trim() || !form.address.city.trim()) {
    return 'Complete o endereço com rua, número e cidade.';
  }
  if (!form.schedule.openTime || !form.schedule.closeTime) {
    return 'Defina horários de abertura e fechamento.';
  }
  if (form.schedule.tagIds.length > TAG_LIMIT) {
    return `Selecione no máximo ${TAG_LIMIT} tags.`;
  }
  return '';
};

const hasImagesToUpload = () =>
  Boolean(form.media.coverImage || form.media.image1 || form.media.image2 || form.media.image3);

const loadTags = async () => {
  tagsLoading.value = true;
  tagsError.value = '';
  try {
    const { data } = await fetchTags();
    availableTags.value = Array.isArray(data) ? data : [];
  } catch (error) {
    tagsError.value = error?.response?.data?.message || 'Não foi possível carregar as tags disponíveis.';
  } finally {
    tagsLoading.value = false;
  }
};

onMounted(loadTags);

const handleSubmit = async () => {
  const errorMessage = validate();
  if (errorMessage) {
    feedback.error = errorMessage;
    feedback.success = '';
    return;
  }

  feedback.error = '';
  feedback.success = '';
  loading.value = true;

  try {
    const { data } = await createRestaurant(buildPayload());
    const restaurantId = data?.id ?? data?.restaurantId ?? data?.data?.id;

    if (hasImagesToUpload()) {
      if (!restaurantId) {
        throw new Error('Restaurante criado, mas não recebemos o ID para enviar as imagens.');
      }
      await uploadRestaurantImages(restaurantId, form.media);
    }

    feedback.success = 'Restaurante cadastrado e imagens enviadas com sucesso!';
    resetForm();
  } catch (error) {
    const message = error?.response?.data?.message || 'Não foi possível salvar agora.';
    feedback.error = message;
  } finally {
    loading.value = false;
  }
};
</script>
