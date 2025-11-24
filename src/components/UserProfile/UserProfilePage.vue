<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-5xl mx-auto px-4 space-y-8">
      <header class="space-y-3 text-center">
        <h1 class="text-3xl font-bold text-gray-900">Dados do usuário</h1>
      </header>

      <section class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
        <div class="flex flex-col gap-6 md:flex-row md:items-center">
          <div class="flex items-center gap-4">
            <div class="relative">
              <img :src="profileAvatar" alt="Foto do usuário" class="w-20 h-20 rounded-full border-2 border-amber-200 object-cover" />
            </div>
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
            <label class="text-sm font-semibold text-gray-600">Foto de perfil</label>
            <div class="mt-3 flex flex-col items-center gap-3">
              <div class="relative group">
                <div class="absolute inset-0 rounded-full blur-lg opacity-40 bg-gradient-to-r from-amber-300 to-amber-500 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div class="relative w-28 h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                  <img v-if="previewFoto" :src="previewFoto" alt="Pré-visualização da foto" class="w-full h-full object-cover" />
                  <UserCircleIcon v-else class="w-12 h-12 text-gray-400" />
                </div>
                <label class="absolute bottom-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200">
                  <CameraIcon class="w-4 h-4" />
                  <input ref="fileInputRef" type="file" class="hidden" accept="image/*" @change="handleFotoUpload" />
                </label>
              </div>
              <p class="text-xs text-gray-500 text-center">Clique no ícone para enviar uma nova imagem</p>
            </div>
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

  <Transition name="modal-fade">
    <div
      v-if="isCropping"
      class="fixed inset-0 z-50 flex items-center justify-center px-6 py-10 bg-black/60 backdrop-blur-sm"
    >
      <div class="absolute inset-0" @click="cancelCrop"></div>
      <div
        class="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/30"
      >
        <div
          class="bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-500 px-6 py-4 flex items-center justify-between"
        >
          <div>
            <h3 class="text-lg font-semibold text-white">Ajustar foto de perfil</h3>
            <p class="text-sm text-white/80">Arraste para reposicionar ou use o scroll para dar zoom</p>
          </div>
          <button
            @click="cancelCrop"
            class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <XMarkIcon class="w-5 h-5 text-white" />
          </button>
        </div>

        <div class="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white">
          <div class="grid gap-8 md:grid-cols-[minmax(0,1fr)_240px] items-start">
            <div class="relative w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner">
              <img
                v-if="imageToCrop"
                :src="imageToCrop"
                ref="cropperImage"
                alt="Imagem para recorte"
                class="max-h-[480px] w-full object-contain select-none"
              />
              <div v-else class="flex items-center justify-center h-80 text-gray-400 text-sm">Carregando imagem...</div>
            </div>

            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">Pré-visualização</h4>
                <div class="mt-3 flex items-center justify-center">
                  <div class="w-36 h-36 rounded-full border-4 border-yellow-400 shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img v-if="previewImage" :src="previewImage" alt="Pré-visualização" class="w-full h-full object-cover" />
                    <UserCircleIcon v-else class="w-14 h-14 text-gray-300" />
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">
                A imagem final será salva em alta resolução. Ajuste o enquadramento e confirme para ver a nova foto no perfil.
              </p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  class="flex-1 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm"
                  @click="cancelCrop"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold shadow-md hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
                  :disabled="isProcessingCrop"
                  @click="confirmCrop"
                >
                  <span v-if="isProcessingCrop" class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Processando...
                  </span>
                  <span v-else class="flex items-center justify-center gap-2">
                    <CheckIcon class="w-5 h-5" />
                    Confirmar recorte
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/api/stores/authStore';
import { uploadProfilePicture } from '@/api/services/profileService';
import { CameraIcon, UserCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

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

const previewFoto = ref('');
const isCropping = ref(false);
const imageToCrop = ref(null);
const previewImage = ref(null);
const isProcessingCrop = ref(false);
const cropper = ref(null);
const cropperImage = ref(null);
const fileInputRef = ref(null);
const suppressHydration = ref(false);

const currentUser = computed(() => authStore.user || null);
const userId = computed(() => currentUser.value?.id || authStore.user?.id || null);

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

const profileAvatar = computed(() => previewFoto.value || avatarUrl.value);

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
    if (!newUser || suppressHydration.value) {
      return;
    }
    hydrateForm(newUser);
  },
  { immediate: true }
);

watch(
  () => form.imageUrl,
  (newVal) => {
    if (!isCropping.value) {
      previewFoto.value = newVal || '';
    }
  },
  { immediate: true }
);

const resetFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const cancelCrop = (resetPreview = true) => {
  if (cropper.value) {
    cropper.value.destroy();
    cropper.value = null;
  }
  isCropping.value = false;
  imageToCrop.value = null;
  if (resetPreview) {
    previewImage.value = null;
  }
  isProcessingCrop.value = false;
  resetFileInput();
};

const initializeCropper = () => {
  const imageElement = cropperImage.value;
  if (!imageElement) {
    return;
  }
  cropper.value = new Cropper(imageElement, {
    aspectRatio: 1,
    viewMode: 2,
    autoCropArea: 1,
    dragMode: 'move',
    background: false,
    guides: false,
    highlight: false,
    movable: true,
    zoomable: true,
    scalable: false,
    responsive: true,
    minContainerHeight: 320,
    crop: () => updatePreview(),
    ready: () => updatePreview(),
  });
};

const updatePreview = () => {
  if (!cropper.value) {
    return;
  }
  const canvas = cropper.value.getCroppedCanvas({
    width: 400,
    height: 400,
    fillColor: '#fff',
  });
  if (!canvas) {
    return;
  }
  previewImage.value = canvas.toDataURL('image/png');
};

const handleFotoUpload = (event) => {
  if (!isEditing.value) {
    setStatus('error', 'Entre no modo de edição para alterar a foto.');
    resetFileInput();
    return;
  }
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  cancelCrop(false);
  const reader = new FileReader();
  reader.onload = (e) => {
    imageToCrop.value = e.target?.result || null;
    if (!imageToCrop.value) {
      return;
    }
    isCropping.value = true;
    previewImage.value = null;
    nextTick(() => {
      initializeCropper();
    });
  };
  reader.readAsDataURL(file);
};

const confirmCrop = () => {
  if (!cropper.value) {
    return;
  }
  const id = userId.value;
  if (!id) {
    setStatus('error', 'ID do usuário não encontrado para upload.');
    return;
  }

  isProcessingCrop.value = true;
  setStatus('success', '');

  const canvas = cropper.value.getCroppedCanvas({
    width: 600,
    height: 600,
    minWidth: 256,
    minHeight: 256,
    fillColor: '#fff',
  });

  if (!canvas) {
    isProcessingCrop.value = false;
    return;
  }

  canvas.toBlob(
    async (blob) => {
      if (!blob) {
        isProcessingCrop.value = false;
        setStatus('error', 'Erro ao processar a imagem. Tente novamente.');
        return;
      }

      try {
        suppressHydration.value = true;
        const updatedUser = await uploadProfilePicture(id, blob);
        authStore.setUser(updatedUser);
        const newImage = updatedUser.imageURL || updatedUser.imageUrl || '';
        form.imageUrl = newImage;
        previewFoto.value = newImage;
        setStatus('success', 'Foto atualizada com sucesso!');
        cancelCrop(false);
      } catch (error) {
        setStatus('error', error.message || 'Falha no upload da imagem.');
        cancelCrop(true);
      } finally {
        suppressHydration.value = false;
        isProcessingCrop.value = false;
      }
    },
    'image/jpeg',
    0.92
  );
};

onBeforeUnmount(() => {
  if (statusTimeout.value) {
    clearTimeout(statusTimeout.value);
  }
  cancelCrop(false);
});

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

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
