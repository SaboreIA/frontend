<template>
    <Transition name="modal-fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="closeModal"
      >
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
  
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
  
          <div 
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            @click.stop
          >
              <h3 class="text-lg font-semibold text-white">
                Editar Perfil
              </h3>
              <button 
                @click="closeModal" 
                class="text-white hover:text-gray-200 transition duration-150"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
          
            <div class="bg-white px-6 py-6">
              <form @submit.prevent="salvarDados">
                
                <div class="mb-6 flex flex-col items-center">
                  <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-3">
                    <img v-if="formData.fotoPerfil" :src="formData.fotoPerfil" alt="Foto de perfil" class="w-full h-full object-cover">
                    <svg v-else class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <label class="cursor-pointer text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                    Alterar foto
                    <input type="file" class="hidden" @change="handleFotoUpload" accept="image/*">
                  </label>
                </div>
  
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input 
                    v-model="formData.nome"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="Digite seu nome"
                    required
                  >
                </div>
  
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input 
                    v-model="formData.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  >
                </div>
  
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input 
                    v-model="formData.telefone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  >
                </div>
  
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input 
                    v-model="formData.endereco"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="Rua, número, bairro"
                  >
                </div>
  
                <div class="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button"
                    @click="closeModal"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-150"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-150"
                  >
                    Salvar Alterações
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
  export default {
    name: 'UserModal',
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
    data() {
      return {
        formData: {
          nome: '',
          email: '',
          telefone: '',
          endereco: '',
          fotoPerfil: ''
        }
      }
    },
    watch: {
      userData: {
        handler(newData) {
          if (newData) {
            this.formData = { ...this.formData, ...newData };
          }
        },
        immediate: true,
        deep: true
      },
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
            this.formData.fotoPerfil = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      salvarDados() {
        this.$emit('save', this.formData);
        this.closeModal();
      }
    },
    beforeUnmount() {
      document.body.style.overflow = '';
    }
  }
  </script>
  
  <style scoped>
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  </style>
