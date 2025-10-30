<template>
    <Transition name="modal-fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeModal"
      >
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          
          <div class="fixed inset-0 transition-all duration-300 bg-gray-900/60 backdrop-blur-sm"></div>
  
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
  
          <div 
            class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full modal-content"
            @click.stop
          >
            <div class="relative bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 px-8 py-6 overflow-hidden">
              <div class="absolute inset-0 opacity-20">
                <div class="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
              </div>
              
              <div class="relative flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <UserCircleIcon class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">
                      Editar Perfil
                    </h3>
                    <p class="text-sm text-white/80 mt-0.5">Atualize suas informações pessoais</p>
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
              <form @submit.prevent="salvarDados">
                
                <div class="mb-8 flex flex-col items-center">
                  <div class="relative group">
                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div class="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                      <img v-if="userData.fotoPerfil" :src="userData.fotoPerfil" alt="Foto de perfil" class="w-full h-full object-cover">
                      <UserCircleIcon v-else class="w-16 h-16 text-gray-400" />
                    </div>
                    <label class="absolute bottom-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group">
                      <CameraIcon class="w-5 h-5" />
                      <input type="file" class="hidden" @change="handleFotoUpload" accept="image/*">
                    </label>
                  </div>
                  <p class="text-sm text-gray-500 mt-3">Clique no ícone da câmera para alterar</p>
                </div>
  
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <UserIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      Nome Completo
                    </label>
                    <input 
                      @input="$emit('update:userData', { ...userData, nome: $event.target.value })"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="Digite seu nome completo"
                      required
                    >
                  </div>
  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <EnvelopeIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      E-mail
                    </label>
                    <input 
                      @input="$emit('update:userData', { ...userData, email: $event.target.value })"
                      type="email"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="seu@email.com"
                      required
                    >
                  </div>
  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <PhoneIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      Telefone
                    </label>
                    <input 
                      @input="$emit('update:userData', { ...userData, telefone: $event.target.value })"
                      type="tel"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="(00) 00000-0000"
                    >
                  </div>
  
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <MapPinIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      CEP
                    </label>
                    <input 
                      @input="$emit('update:userData', { ...userData, cep: $event.target.value })"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="00000-000"
                    >
                  </div>
  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <BuildingOfficeIcon class="w-4 h-4 mr-2 text-yellow-600" />
                      Endereço
                    </label>
                    <input 
                      @input="$emit('update:userData', { ...userData, endereco: $event.target.value })"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                      placeholder="Rua, número, bairro, cidade"
                    >
                  </div>
  
                </div>
  
                <div class="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button 
                    type="button"
                    @click="closeModal"
                    class="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    class="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105"
                  >
                    <span class="flex items-center justify-center">
                      <CheckIcon class="w-5 h-5 mr-2" />
                      Salvar Alterações
                    </span>
                  </button>
                </div>
  
              </form>
            </div>
          </div>
        </div>
      </div>
    </Transition>
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
    CheckIcon 
  } from '@heroicons/vue/24/outline';
  
  export default {
    name: 'UserModal',
    components: {
      UserCircleIcon,
      XMarkIcon,
      CameraIcon,
      UserIcon,
      EnvelopeIcon,
      PhoneIcon,
      MapPinIcon,
      BuildingOfficeIcon,
      CheckIcon
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      userData: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      isOpen(newVal) {
        if (newVal) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      handleFotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.$emit('update:userData', { 
              ...this.userData, 
              fotoPerfil: e.target.result 
            });
          };
          reader.readAsDataURL(file);
        }
      },
      salvarDados() {
        this.$emit('save', this.userData);
        this.closeModal();
      }
    },
    beforeUnmount() {
      document.body.style.overflow = '';
    }
  }
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
  