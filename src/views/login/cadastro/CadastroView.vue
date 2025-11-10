<template>
  <div class="flex items-center justify-center h-full px-4"> 
    
    <div class="w-full max-w-md p-8 rounded-lg space-y-8">
      
      <div class="text-center space-y-2">
        <div class="flex justify-center items-center space-x-2">
          
          <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>

          <h2 class="text-3xl font-extrabold text-black">
            Cadastro de Usuário
          </h2>
        </div>
      </div>
      
      <div v-if="errorMessage" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-medium">
         {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" class="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-medium">
         {{ successMessage }}
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        
        <div>
          <label for="name" class="block text-sm font-bold text-black mb-1">
            Nome Completo: <span class="text-red-500">*</span>
          </label>
          <div class="mt-1 relative border border-gray-300 rounded-lg focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition duration-200">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              v-model="name"
              placeholder="Seu nome completo"
              class="appearance-none block w-full pl-14 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
            />
          </div>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-bold text-black mb-1">
            E-mail: <span class="text-red-500">*</span>
          </label>
          <div class="mt-1 relative border border-gray-300 rounded-lg focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition duration-200">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-1 10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v11z"></path></svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              placeholder="seu melhor e-mail"
              class="appearance-none block w-full pl-14 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-bold text-black mb-1">
            Senha: <span class="text-red-500">*</span>
          </label>
          <div class="mt-1 relative border border-gray-300 rounded-lg focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition duration-200">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"></path></svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              v-model="password"
              placeholder="crie sua senha"
              class="appearance-none block w-full pl-14 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
            />
          </div>
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-bold text-black mb-1">
            Confirmar Senha: <span class="text-red-500">*</span>
          </label>
          <div class="mt-1 relative border border-gray-300 rounded-lg focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition duration-200">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z"></path></svg>
            </div>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              v-model="confirmPassword"
              placeholder="repita a senha"
              class="appearance-none block w-full pl-14 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
            />
          </div>
        </div>
        
        <hr class="border-gray-300 my-6" />

        <p class="text-lg font-bold text-gray-800 mb-4">Informações Opcionais</p>
        
        <div>
          <label for="phone" class="block text-sm font-bold text-black mb-1">
            Telefone:
          </label>
          <div class="mt-1 relative border border-gray-300 rounded-lg focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-600 transition duration-200">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.5a1.5 1.5 0 011.5 1.5v3.5a1.5 1.5 0 01-1.5 1.5H5a2 2 0 01-2-2V5zM3 15a2 2 0 012-2h3.5a1.5 1.5 0 011.5 1.5v3.5a1.5 1.5 0 01-1.5 1.5H5a2 2 0 01-2-2v-3.5zM15 5a2 2 0 012-2h3.5a1.5 1.5 0 011.5 1.5v3.5a1.5 1.5 0 01-1.5 1.5H17a2 2 0 01-2-2V5zM15 15a2 2 0 012-2h3.5a1.5 1.5 0 011.5 1.5v3.5a1.5 1.5 0 01-1.5 1.5H17a2 2 0 01-2-2v-3.5z"></path></svg>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              v-model="phone"
              placeholder="Ex: (11) 99999-9999"
              class="appearance-none block w-full pl-14 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
            />
          </div>
        </div>
        
        <p class="text-sm font-medium text-gray-700 mb-2">Endereço (Opcional)</p>
        
        <div>
          <label for="zipCode" class="block text-sm font-bold text-black mb-1">CEP:</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            v-model="zipCode"
            placeholder="00000-000"
            class="appearance-none block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
          />
        </div>

        <div>
          <label for="street" class="block text-sm font-bold text-black mb-1">Rua/Avenida:</label>
          <input
            id="street"
            name="street"
            type="text"
            v-model="street"
            placeholder="Nome da Rua/Avenida"
            class="appearance-none block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="number" class="block text-sm font-bold text-black mb-1">Número:</label>
              <input
                id="number"
                name="number"
                type="text"
                v-model="number"
                placeholder="Ex: 123"
                class="appearance-none block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
              />
            </div>
            <div>
              <label for="complement" class="block text-sm font-bold text-black mb-1">Complemento:</label>
              <input
                id="complement"
                name="complement"
                type="text"
                v-model="complement"
                placeholder="Ex: Apt. 101"
                class="appearance-none block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
              />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="city" class="block text-sm font-bold text-black mb-1">Cidade:</label>
              <input
                id="city"
                name="city"
                type="text"
                v-model="city"
                placeholder="Ex: São Paulo"
                class="appearance-none block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
              />
            </div>
            <div>
              <label for="state" class="block text-sm font-bold text-black mb-1">Estado:</label>
              <input
                id="state"
                name="state"
                type="text"
                v-model="state"
                placeholder="Ex: SP"
                maxlength="2"
                class="appearance-none block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
              />
            </div>
        </div>
        
        <div>
          <label for="country" class="block text-sm font-bold text-black mb-1">País:</label>
          <input
            id="country"
            name="country"
            type="text"
            v-model="country"
            placeholder="Ex: Brasil"
            class="appearance-none block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
          />
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            :class="[
                'w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white transition duration-150 transform hover:scale-[1.02]',
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
            ]"
          >
            {{ isSubmitting ? 'CADASTRANDO...' : 'CADASTRAR' }}
          </button>
        </div>
      </form>
      
      <div class="mt-4">
        <router-link 
          to="/login"
          class="w-full flex justify-center py-3 px-4 rounded-full text-lg font-bold text-amber-600 border-2 border-amber-600 hover:bg-amber-50 hover:text-amber-700 transition duration-150 transform hover:scale-[1.02]"
        >
          JÁ TENHO CONTA
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/services/authService';
export default {
  name: 'CadastroView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '', 
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      country: 'Brasil',
      
      isSubmitting: false,
      errorMessage: null,
      successMessage: null,
    };
  },
  methods: {
    async handleRegister() {
      this.errorMessage = null;
      this.successMessage = null;

      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Nome, E-mail, Senha e Confirmação são obrigatórios.';
        return;
      }
      
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'As senhas digitadas não coincidem. Verifique a confirmação.';
        return;
      }
      
      if (this.password.length < 6) {
          this.errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
          return;
      }
      
      this.isSubmitting = true;
      
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone, 
        zipCode: this.zipCode,
        street: this.street,
        number: this.number,
        complement: this.complement,
        city: this.city,
        state: this.state,
        country: this.country,
      };

      try {
        await registerUser(userData);

        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.phone = '';
        this.zipCode = '';
        this.street = '';
        this.number = '';
        this.complement = '';
        this.city = '';
        this.state = '';
        this.country = 'Brasil';
        
        this.successMessage = `Cadastro realizado com sucesso! Você já pode entrar na sua conta.`;
        
        setTimeout(() => {
          this.$router.push('/login'); 
        }, 2000); 

      } catch (error) {
        console.error("Erro capturado no componente:", error);
        this.errorMessage = error.message || 'Erro de conexão ou servidor. Tente novamente.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>


<style scoped>
</style>