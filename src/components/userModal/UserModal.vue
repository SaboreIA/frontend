<template>
  <div>
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 overflow-y-auto"
        @click="closeModal"
      >
        <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 transition-all duration-300 bg-gray-900/60 backdrop-blur-sm"
          ></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
            >&#8203;</span
          >

          <div
            class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full modal-content"
            @click.stop
          >
            <div
              class="relative bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 px-8 py-6 overflow-hidden"
            >
              <div class="absolute inset-0 opacity-20">
                <div
                  class="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"
                ></div>
                <div
                  class="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"
                ></div>
              </div>

              <div class="relative flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <UserCircleIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">Editar Perfil</h3>
                    <p class="text-sm text-white/80 mt-0.5">
                      Atualize suas informações pessoais
                    </p>
                  </div>
                </div>
                <button
                  @click="closeModal"
                  class="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg"
                >
                  <XMarkIcon class="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-white px-8 py-8">
              <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                  <ExclamationCircleIcon class="w-5 h-5 mr-2" />
                  {{ error }}
              </div>
              <div v-if="isLoading" class="mb-4 p-4 text-center text-gray-600">
                  <ArrowPathIcon class="w-6 h-6 animate-spin mx-auto mb-2" />
                  Carregando dados...
              </div>

              <form v-else @submit.prevent="saveChanges">
                <div class="mb-8 flex flex-col items-center">
                  <div class="relative group">
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                    ></div>
                    <div
                      class="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl"
                    >
                      <img
                        v-if="previewFoto"
                        :src="previewFoto"
                        alt="Foto de perfil"
                        class="w-full h-full object-cover"
                      />
                      <UserCircleIcon v-else class="w-16 h-16 text-gray-400" />
                    </div>
                    <label
                      class="absolute bottom-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group"
                    >
                      <CameraIcon class="w-5 h-5" />
                      <input
                        type="file"
                        class="hidden"
                        @change="handleFotoUpload"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <p class="text-sm text-gray-500 mt-3">
                    Clique no ícone da câmera para alterar
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label
                      class="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                    >
                      <UserIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      Nome Completo
                    </label>
                    <input
                      v-model="formData.name"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="Digite seu nome completo"
                      required
                      :disabled="isLoading"
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label
                      class="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                    >
                      <EnvelopeIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      E-mail
                    </label>
                    <input
                      v-model="formData.email"
                      type="email"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="seu@email.com"
                      required
                      :disabled="isLoading"
                    />
                  </div>

                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                    >
                      <PhoneIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      Telefone
                    </label>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="(00) 00000-0000"
                      :disabled="isLoading"
                    />
                  </div>

                  <div>
                    <label
                      class="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                    >
                      <MapPinIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      CEP
                    </label>
                    <input
                      v-model="formData.zipCode"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="00000-000"
                      :disabled="isLoading"
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label
                      class="block text-sm font-semibold text-gray-700 mb-2 flex items-center"
                    >
                      <BuildingOfficeIcon
                        class="w-4 h-4 mr-2 text-yellow-600"
                      />
                      Endereço Completo
                    </label>
                    <input
                      v-model="formData.street"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="Rua, número, bairro, cidade"
                      :disabled="isLoading"
                    />
                  </div>
                  </div>

                <div
                  class="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200"
                >
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                    :disabled="isLoading"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105 disabled:opacity-70"
                    :disabled="isLoading"
                  >
                    <span class="flex items-center justify-center">
                      <CheckIcon v-if="!isLoading" class="w-5 h-5 mr-2" />
                      <ArrowPathIcon v-else class="w-5 h-5 mr-2 animate-spin" />
                      {{ isLoading ? 'Salvando...' : 'Salvar Alterações' }}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>

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
              <h3 class="text-lg font-semibold text-white">
                Ajustar foto de perfil
              </h3>
              <p class="text-sm text-white/80">
                Arraste para reposicionar ou use o scroll para dar zoom
              </p>
            </div>
            <button
              @click="cancelCrop"
              class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <XMarkIcon class="w-5 h-5 text-white" />
            </button>
          </div>

          <div class="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white">
            <div
              class="grid gap-8 md:grid-cols-[minmax(0,1fr)_260px] items-start"
            >
              <div
                class="relative w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner"
              >
                <img
                  v-if="imageToCrop"
                  :src="imageToCrop"
                  ref="cropperImage"
                  alt="Imagem para recorte"
                  class="max-h-[480px] w-full object-contain select-none"
                />
                <div
                  v-else
                  class="flex items-center justify-center h-80 text-gray-400 text-sm"
                >
                  Carregando imagem...
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <h4
                    class="text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    Pré-visualização
                  </h4>
                  <div class="mt-3 flex items-center justify-center">
                    <div
                      class="w-40 h-40 rounded-full border-4 border-yellow-400 shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center"
                    >
                      <img
                        v-if="previewImage"
                        :src="previewImage"
                        alt="Pré-visualização"
                        class="w-full h-full object-cover"
                      />
                      <UserCircleIcon v-else class="w-14 h-14 text-gray-300" />
                    </div>
                  </div>
                </div>
                <p class="text-xs text-gray-500 leading-relaxed">
                  A imagem final será salva em alta resolução. Ajuste o
                  enquadramento e confirme para ver a nova foto imediatamente no
                  formulário.
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    class="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm"
                    @click="cancelCrop"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    class="px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold shadow-md hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="isProcessingCrop"
                    @click="confirmCrop"
                  >
                    <span
                      v-if="isProcessingCrop"
                      class="flex items-center justify-center gap-2"
                    >
                      <svg
                        class="w-5 h-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
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
  </div>
</template>

<script>
import {
  UserCircleIcon,
  XMarkIcon,
  CameraIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CheckIcon,
  ArrowPathIcon, 
  ExclamationCircleIcon, 
} from "@heroicons/vue/24/outline";

import { fetchUserProfile } from '@/api/services/profileService';
import { useAuthStore } from '@/api/stores/authStore';

import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "UserModal",
  components: {
    UserCircleIcon,
    XMarkIcon,
    CameraIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    BuildingOfficeIcon,
    CheckIcon,
    ArrowPathIcon,
    ExclamationCircleIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
        const authStore = useAuthStore();
        return { 
            authStore, 
            userId: authStore.user?.id 
        }; 
    },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        imageURL: '',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        city: '',
        state: '',
        country: 'Brasil',
      },
      isLoading: false,
      error: null, 

      isCropping: false,
      imageToCrop: null,
      cropper: null,
      previewImage: null,
      previewFoto: null,
      isProcessingCrop: false,
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
        this.loadUserData();
      } else {
        document.body.style.overflow = "";
        this.error = null; 
      }
    },
    "formData.imageURL": {
      handler(newVal) {
        if (!this.isCropping) {
          this.previewFoto = newVal || null;
        }
      },
      immediate: true,
    },
  },
  methods: {

    async loadUserData() {
        if (!this.authStore.isLoggedIn || !this.userId) {
                this.error = "Usuário não logado ou ID do usuário não encontrado.";
                this.isLoading = false;
                return;
        }
        
        this.isLoading = true;
        this.error = null;
        try {
            const userData = await fetchUserProfile(this.userId);
            
            this.formData.name = userData.name || '';
            this.formData.email = userData.email || '';
            this.formData.phone = userData.phone || '';
            this.formData.imageURL = userData.imageURL || ''; 
            this.previewFoto = this.formData.imageURL; 
            
            if (userData.address) {
                this.formData.zipCode = userData.address.zipCode || '';
                this.formData.street = userData.address.street || '';
                this.formData.number = userData.address.number || '';
                this.formData.complement = userData.address.complement || '';
                this.formData.city = userData.address.city || '';
                this.formData.state = userData.address.state || '';
                this.formData.country = userData.address.country || 'Brasil';
            } else {
                this.formData.zipCode = ''; this.formData.street = ''; this.formData.number = '';
                this.formData.complement = ''; this.formData.city = ''; this.formData.state = '';
            }

        } catch (error) {
            this.error = error.message || "Erro ao carregar dados do perfil.";
        } finally {
            this.isLoading = false;
        }
    },

    async saveChanges() {
    this.isLoading = true;
    this.error = null;
    
    try {
        await this.authStore.updateProfile(this.formData); 
        
        alert('Perfil atualizado com sucesso!');
        this.closeModal(); 

    } catch (err) {
        this.error = err.message || "Erro ao salvar as alterações. Verifique os dados e tente novamente.";
    } finally {
        this.isLoading = false;
    }
},

    closeModal() {
      this.cancelCrop(false);
      this.$emit("close");
    },

    handleFotoUpload(event) {
        const [file] = event.target.files || [];
        if (!file) {
            return;
        }

        if (this.cropper) {
            this.cleanupCropper();
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.imageToCrop = e.target?.result || null;
            if (!this.imageToCrop) {
                return;
            }
            this.isCropping = true;
            this.previewImage = null;
            this.$nextTick(() => {
                this.initializeCropper();
            });
        };
        reader.readAsDataURL(file);
    },
    initializeCropper() {
        const imageElement = this.$refs.cropperImage;
        if (!imageElement) {
            return;
        }

        this.cropper = new Cropper(imageElement, {
            aspectRatio: 1,
            viewMode: 2,
            autoCropArea: 1,
            dragMode: "move",
            background: false,
            guides: false,
            highlight: false,
            movable: true,
            zoomable: true,
            scalable: false,
            responsive: true,
            minContainerHeight: 320,
            crop: () => this.updatePreview(),
            ready: () => this.updatePreview(),
        });
    },
    updatePreview() {
        if (!this.cropper) { return; }
        const canvas = this.cropper.getCroppedCanvas({
            width: 400, height: 400, fillColor: "#fff",
        });
        if (!canvas) { return; }
        this.previewImage = canvas.toDataURL("image/png");
    },
    cancelCrop(resetPreview = true) {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
        this.isCropping = false;
        this.imageToCrop = null;
        this.previewImage = resetPreview ? null : this.previewImage;
        this.isProcessingCrop = false;

        const fileInput = this.$el?.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = "";
        }
    },
    cleanupCropper() {
        this.cancelCrop(false);
    },
    confirmCrop() {
        if (!this.cropper) { return; }
        this.isProcessingCrop = true;
        const canvas = this.cropper.getCroppedCanvas({
            width: 600, height: 600, minWidth: 256, minHeight: 256, fillColor: "#fff",
        });
        if (!canvas) {
            this.isProcessingCrop = false;
            return;
        }

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    this.isProcessingCrop = false;
                    return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result;
                    if (typeof result === "string") {
                        this.previewFoto = result;
                        
                        this.formData.imageURL = result; 
                        
                    }
                    this.cancelCrop(false);
                };
                reader.readAsDataURL(blob);
            },
            "image/jpeg",
            0.92
        );
    },
  },
  beforeUnmount() {
    this.cancelCrop(false);
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.modal-fade-enter-active {
  transition: opacity 0.3s ease;
}

.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content {
  animation: slideUp 0.3s ease-out;
}

.modal-fade-leave-active .modal-content {
  animation: slideDown 0.2s ease-in;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(50px);
    opacity: 0;
  }
}
</style>