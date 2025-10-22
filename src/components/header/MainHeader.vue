<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">

      <div class="flex items-center">
        <router-link to="/">
          <img src="../icons/logo.png" alt="logo_SaborIA" class="w-12 h-12 object-contain">
        </router-link>
      </div>

      <nav class="hidden md:flex space-x-6">
        
        <router-link to="/" class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150">Início</router-link>
        <router-link to="/restaurantes" class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150">Restaurantes</router-link>
        <router-link to="/sobre" class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150">Sobre</router-link>
                
        <a href="#destaques" class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150">Destaques</a>
        <router-link to="/planos"class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150">Planos</router-link>
        <router-link to="/contato" class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150">Contato</router-link>
      </nav>

      <div class="flex items-center space-x-4">
        
        <span v-if="usuarioLogado" class="text-sm text-gray-700 hidden lg:inline">
          Olá, {{ nomeUsuario }}
        </span>
        
        <router-link 
          v-if="!usuarioLogado" 
          to="/login"
          class="flex items-center p-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition duration-150"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m18-6v-1a3 3 0 00-3-3h-4"></path></svg>
          <span class="ml-2 hidden sm:inline">Login</span>
        </router-link>
        
        <router-link v-else to="/login" class="p-2 rounded-full text-yellow-600 hover:bg-gray-100 transition duration-150">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </router-link>

        <button 
          @click="simulateToggle" 
          :class="[
            'relative inline-flex flex-shrink-0 h-7 w-14 border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none',
            isDarkModeSimulated ? 'bg-gray-700 border-gray-700' : 'bg-gray-200 border-gray-200'
          ]"
          :aria-checked="isDarkModeSimulated.toString()"
        >
          <span class="sr-only">Toggle dark mode</span>
          <span 
            :class="[
              'pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
              isDarkModeSimulated ? 'translate-x-7' : 'translate-x-0'
            ]"
          >
            <span 
              :class="[
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ease-in-out duration-200',
                isDarkModeSimulated ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
              ]"
              aria-hidden="true"
            >
              <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.354 7.354l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <span 
              :class="[
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ease-in-out duration-200',
                isDarkModeSimulated ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
              ]"
              aria-hidden="true"
            >
              <svg class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </span>
          </span>
        </button>
        
      </div>
    </div>
  </header>
  
  <div class="pt-16"></div>
</template>

<script>
export default {
// ... seu script permanece o mesmo ...
  name: 'MainHeader',
  data() {
    return {
      usuarioLogado: true,
      nomeUsuario: 'Visitante',
      isDarkModeSimulated: false, 
    }
  },
  methods: {
    simulateToggle() {
      this.isDarkModeSimulated = !this.isDarkModeSimulated;
      console.log('Animação de Dark Mode ativada:', this.isDarkModeSimulated);
    },
    
  }
}
</script>

<style scoped>
.router-link-active, .nav-link:focus, .nav-link:active {
  font-weight: bold;
  /* Aplica o destaque também aos links de âncora */
  color: #CA8A04; /* Tailwind: text-amber-700 */
}
/* Estilo básico para os links de âncora */
.nav-link {
    cursor: pointer;
    text-decoration: none;
}
</style>