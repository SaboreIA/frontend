<template>
  <div class="flex items-center justify-center h-full px-4"> 
    
    <div class="w-full max-w-md p-8 rounded-lg space-y-8">
      
      <div class="text-center space-y-2">
        <div class="flex justify-center items-center space-x-2">
          
          <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1"></path>
          </svg>

          <h2 class="text-3xl font-extrabold text-black">
            Entrar na Conta
          </h2>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        
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
              placeholder="seu e-mail de cadastro"
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
              autocomplete="current-password"
              required
              v-model="password"
              placeholder="sua senha"
              class="appearance-none block w-full pl-14 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none sm:text-lg bg-white text-black"
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150 transform hover:scale-[1.02]"
          >
            ENTRAR
          </button>
        </div>
      </form>
      
      <div class="mt-4">
        <router-link 
          to="/cadastro"
          class="w-full flex justify-center py-3 px-4 rounded-full text-lg font-bold text-amber-600 border-2 border-amber-600 hover:bg-amber-50 hover:text-amber-700 transition duration-150 transform hover:scale-[1.02]"
        >
          CRIAR UMA CONTA
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() { 
      if (!this.email || !this.password) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      
      const MOCK_EMAIL = 'teste@saboria.com';
      const MOCK_PASSWORD = 'senhaforte';

      if (this.email === MOCK_EMAIL && this.password === MOCK_PASSWORD) {
        
        const simulatedUserData = {
            id: 99,
            name: "Usuário Mock", 
            email: this.email
        };

        saveUserToLocalStorage(simulatedUserData); 
        
        alert(`Login bem-sucedido! Bem-vindo(a), ${simulatedUserData.name}! (Simulado)`);
        this.$router.push('/dashboard'); 

      } else {
          alert(`Erro de Login: Credenciais inválidas (Simulado). Use "${MOCK_EMAIL}" e "${MOCK_PASSWORD}".`);
      }
    }
  }
};
</script>

<style scoped>
</style>