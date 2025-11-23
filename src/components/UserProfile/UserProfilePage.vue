<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-5xl mx-auto px-4 space-y-8">
      <header class="space-y-3 text-center">
        <h1 class="text-3xl font-bold text-gray-900">Dados do usuário</h1>
      </header>

      <section class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
        <div class="flex flex-col gap-6 md:flex-row md:items-center">
          <div class="flex items-center gap-4">
            <img :src="avatarUrl" alt="Foto do usuário" class="w-20 h-20 rounded-full border-2 border-amber-200 object-cover" />
            <div>
              <p class="text-sm font-semibold text-amber-600">{{ authStore.firstName }}</p>
              <h2 class="text-2xl font-bold text-gray-900">{{ form.name || 'Usuário' }}</h2>
              <p class="text-gray-500">{{ form.email || 'Sem e-mail cadastrado' }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-3 md:ml-auto w-full md:w-auto">
            <router-link
              to="/restaurantes/cadastrar"
              class="inline-flex items-center justify-center rounded-xl bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 border border-amber-200 hover:bg-amber-100"
            >
              Cadastrar restaurante
            </router-link>
            <div class="flex flex-wrap gap-3">
              <button
                v-if="!isEditing"
                type="button"
                class="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                @click="startEditing"
              >
                Editar dados
              </button>
              <button
                v-else
                type="button"
                class="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                @click="cancelEdit"
              >
                Cancelar edição
              </button>
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                :disabled="isDeleting"
                @click="handleDelete"
              >
                {{ isDeleting ? 'Excluindo...' : 'Excluir conta' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div v-if="statusMessage" :class="statusBannerClass" class="rounded-2xl border px-4 py-3 text-sm font-medium">
        {{ statusMessage }}
      </div>

      <section class="grid gap-4 md:grid-cols-3">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Telefone</p>
          <p class="text-xl font-semibold text-gray-900 mt-2">{{ form.phone || 'Não informado' }}</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Cidade</p>
          <p class="text-xl font-semibold text-gray-900 mt-2">{{ form.address.city || 'Não informado' }}</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">País</p>
          <p class="text-xl font-semibold text-gray-900 mt-2">{{ form.address.country || 'Brasil' }}</p>
        </div>
      </section>

      <section class="bg-white rounded-2xl border border-dashed border-amber-200 p-6 space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Informações de endereço</h2>
          </div>
        </div>

        <dl class="grid gap-4 md:grid-cols-2 text-sm text-gray-600">
          <div>
            <dt class="font-semibold text-gray-500 uppercase tracking-wide text-xs">Rua</dt>
            <dd class="mt-1 text-gray-900">{{ form.address.street || 'Não informado' }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-gray-500 uppercase tracking-wide text-xs">Número</dt>
            <dd class="mt-1 text-gray-900">{{ form.address.number || 'Não informado' }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-gray-500 uppercase tracking-wide text-xs">Complemento</dt>
            <dd class="mt-1 text-gray-900">{{ form.address.complement || '—' }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-gray-500 uppercase tracking-wide text-xs">CEP</dt>
            <dd class="mt-1 text-gray-900">{{ form.address.zipCode || 'Não informado' }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-gray-500 uppercase tracking-wide text-xs">Estado</dt>
            <dd class="mt-1 text-gray-900">{{ form.address.state || 'Não informado' }}</dd>
          </div>
          <div>
            <dt class="font-semibold text-gray-500 uppercase tracking-wide text-xs">País</dt>
            <dd class="mt-1 text-gray-900">{{ form.address.country || 'Brasil' }}</dd>
          </div>
        </dl>
      </section>

      <form v-if="isEditing" class="bg-white rounded-2xl border border-gray-100 p-6 space-y-6" @submit.prevent="saveChanges">
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="text-sm font-semibold text-gray-600">Nome completo</label>
            <input v-model="form.name" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" required />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">E-mail</label>
            <input v-model="form.email" type="email" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" required />
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div>
            <label class="text-sm font-semibold text-gray-600">Telefone</label>
            <input v-model="form.phone" type="tel" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="+55 14 99999-8888" />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">Nova senha</label>
            <input v-model="form.password" type="password" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="••••••" />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">URL da foto</label>
            <input v-model="form.imageUrl" type="url" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="https://..." />
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="text-sm font-semibold text-gray-600">Rua</label>
            <input v-model="form.address.street" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">Número</label>
            <input v-model="form.address.number" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">Complemento</label>
            <input v-model="form.address.complement" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">CEP</label>
            <input v-model="form.address.zipCode" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="17500-000" />
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div>
            <label class="text-sm font-semibold text-gray-600">Cidade</label>
            <input v-model="form.address.city" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">Estado</label>
            <input v-model="form.address.state" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="SP" />
          </div>
          <div>
            <label class="text-sm font-semibold text-gray-600">País</label>
            <input v-model="form.address.country" type="text" class="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>

        <div class="flex flex-wrap justify-end gap-4 pt-4">
          <button type="button" class="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50" @click="cancelEdit">
            Descartar
          </button>
          <button type="submit" class="px-8 py-3 rounded-xl bg-amber-600 text-white font-semibold shadow hover:bg-amber-700 disabled:opacity-60" :disabled="isSaving">
            {{ isSaving ? 'Salvando...' : 'Salvar alterações' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/api/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const isEditing = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);
const statusMessage = ref('');
const statusType = ref('success');
const statusTimeout = ref(null);

const defaultAddress = () => ({
  street: '',
  number: '',
  complement: '',
  city: '',
  state: '',
  country: 'Brasil',
  zipCode: '',
});

const createEmptyForm = () => ({
  name: '',
  email: '',
  phone: '',
  password: '',
  imageUrl: '',
  active: true,
  address: defaultAddress(),
});

const form = reactive(createEmptyForm());

const currentUser = computed(() => authStore.user || null);

const avatarUrl = computed(() => {
  if (form.imageUrl) {
    return form.imageUrl;
  }
  if (currentUser.value?.imageURL) {
    return currentUser.value.imageURL;
  }
  const initials = encodeURIComponent(form.name || authStore.firstName || 'Usuário');
  return `https://ui-avatars.com/api/?name=${initials}&background=facc15&color=111827&bold=true`;
});

const statusBannerClass = computed(() => {
  return statusType.value === 'error'
    ? 'bg-red-50 text-red-700 border border-red-100'
    : 'bg-emerald-50 text-emerald-700 border border-emerald-100';
});

const setStatus = (type, message) => {
  statusType.value = type;
  statusMessage.value = message;
  if (statusTimeout.value) {
    clearTimeout(statusTimeout.value);
  }
  if (message) {
    statusTimeout.value = setTimeout(() => {
      statusMessage.value = '';
    }, 5000);
  }
};

onBeforeUnmount(() => {
  if (statusTimeout.value) {
    clearTimeout(statusTimeout.value);
  }
});

const hydrateForm = (user) => {
  const safeUser = user || {};
  form.name = safeUser.name || '';
  form.email = safeUser.email || '';
  form.phone = safeUser.phone || '';
  form.password = '';
  form.imageUrl = safeUser.imageURL || safeUser.imageUrl || '';
  form.active = typeof safeUser.active === 'boolean' ? safeUser.active : true;
  const address = safeUser.address || {};
  form.address.street = address.street || '';
  form.address.number = address.number || '';
  form.address.complement = address.complement || '';
  form.address.city = address.city || '';
  form.address.state = address.state || '';
  form.address.country = address.country || 'Brasil';
  form.address.zipCode = address.zipCode || '';
};

watch(
  () => currentUser.value,
  (newUser) => {
    if (newUser) {
      hydrateForm(newUser);
    }
  },
  { immediate: true }
);

const ensureAuthenticated = () => {
  if (!authStore.isLoggedIn) {
    router.push('/login');
  }
};

onMounted(async () => {
  ensureAuthenticated();
  if (authStore.isLoggedIn && !currentUser.value?.email) {
    try {
      await authStore.fetchProfile();
    } catch (error) {
      setStatus('error', error.message || 'Não foi possível carregar os dados do usuário.');
    }
  }
});

const startEditing = () => {
  if (!authStore.isLoggedIn) {
    return router.push('/login');
  }
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  hydrateForm(currentUser.value);
};

const buildPayload = () => ({
  name: form.name,
  email: form.email,
  password: form.password?.trim() ? form.password : undefined,
  phone: form.phone,
  imageUrl: form.imageUrl,
  active: typeof form.active === 'boolean' ? form.active : true,
  address: {
    zipCode: form.address.zipCode,
    street: form.address.street,
    number: form.address.number,
    complement: form.address.complement,
    city: form.address.city,
    state: form.address.state,
    country: form.address.country,
  },
});

const saveChanges = async () => {
  isSaving.value = true;
  setStatus('success', '');
  try {
    await authStore.updateProfile(buildPayload());
    setStatus('success', 'Perfil atualizado com sucesso!');
    isEditing.value = false;
  } catch (error) {
    setStatus('error', error.message || 'Erro ao salvar o perfil.');
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = async () => {
  if (!authStore.isLoggedIn || isDeleting.value) {
    return;
  }
  const confirmDelete = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');
  if (!confirmDelete) {
    return;
  }

  isDeleting.value = true;
  setStatus('success', '');
  try {
    await authStore.deleteAccount();
    setStatus('success', 'Conta excluída com sucesso.');
    router.push('/');
  } catch (error) {
    setStatus('error', error.message || 'Não foi possível excluir a conta.');
  } finally {
    isDeleting.value = false;
  }
};
</script>
