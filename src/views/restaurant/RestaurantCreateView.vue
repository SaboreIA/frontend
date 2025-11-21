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
        <RestaurantScheduleSection v-model="form.schedule" />

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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import RestaurantDetailsSection from '@/components/restaurant_form/RestaurantDetailsSection.vue';
import RestaurantAddressSection from '@/components/restaurant_form/RestaurantAddressSection.vue';
import RestaurantMediaSection from '@/components/restaurant_form/RestaurantMediaSection.vue';
import RestaurantScheduleSection from '@/components/restaurant_form/RestaurantScheduleSection.vue';
import { createRestaurant } from '@/api/restaurants';

const router = useRouter();

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
    city: '',
    state: '',
    country: 'Brasil',
    zipCode: '',
  },
  media: {
    coverImageUrl: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
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
  coverImageUrl: form.media.coverImageUrl,
  imageUrl1: form.media.imageUrl1,
  imageUrl2: form.media.imageUrl2,
  imageUrl3: form.media.imageUrl3,
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
  if (!form.media.coverImageUrl.trim()) return 'Adicione pelo menos a imagem de capa.';
  if (!form.address.street.trim() || !form.address.number.trim() || !form.address.city.trim()) {
    return 'Complete o endereço com rua, número e cidade.';
  }
  if (!form.schedule.openTime || !form.schedule.closeTime) {
    return 'Defina horários de abertura e fechamento.';
  }
  return '';
};

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
    await createRestaurant(buildPayload());
    feedback.success = 'Restaurante cadastrado com sucesso!';
    resetForm();
  } catch (error) {
    const message = error?.response?.data?.message || 'Não foi possível salvar agora.';
    feedback.error = message;
  } finally {
    loading.value = false;
  }
};
</script>
