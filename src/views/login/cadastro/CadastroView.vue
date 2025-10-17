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

      <form @submit.prevent="handleRegister" class="space-y-6">
        
        <div>
          <label for="name" class="block text-sm font-bold text-black mb-1">
            Nome Completo:
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
            E-mail:
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
            Senha
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
            Confirmar Senha
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

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150 transform hover:scale-[1.02]"
          >
            CADASTRAR
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
// Removemos: import axios from 'axios';

// Removemos: const API_URL...

export default {
  name: 'CadastroView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    // A função é agora síncrona, pois não espera mais uma chamada de rede
    handleRegister() {
      // 1. Validação de campos vazios
      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      
      // 2. Validação de Confirmação de Senha
      if (this.password !== this.confirmPassword) {
        alert('As senhas digitadas não coincidem. Verifique a confirmação.');
        return;
      }
      
      // 3. Validação de complexidade local
      if (this.password.length < 6) {
          alert('A senha deve ter no mínimo 6 caracteres.');
          return;
      }

      // === SIMULAÇÃO DE SUCESSO DO CADASTRO ===
      alert(`Sucesso! O cadastro do usuário "${this.name}" foi simulado. Você será redirecionado para o login.`);
      this.$router.push('/login'); 
      // === FIM DA SIMULAÇÃO ===
    }
  }
};
</script>

<style scoped>
/* Estilos para centralização permanecem eficazes */
</style>