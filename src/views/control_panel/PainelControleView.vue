<template>
  <div class="dashboard-view min-h-screen bg-gray-50 p-6 sm:p-10">
    <div class="container mx-auto">

      <h1 class="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
        <svg class="w-10 h-10 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7-8h14a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2z" />
        </svg>
        Painel de Controle
      </h1>

      <div class="bg-white p-6 rounded-lg shadow-lg mb-10 border-t-4 border-amber-500">
        <p class="text-lg text-gray-700">
          Esta é a página de teste para o **HeaderPainelControle**.
        </p>
        <p class="mt-2 text-gray-600">
          Você deve ver o **Logo**, o **Ícone de Perfil** (que leva a `/perfil`) e o **Toggle de Tema** no topo.
        </p>
        <p class="mt-4 text-sm font-bold text-amber-600">
          Status: <span class="text-green-600">Header Painel de Controle Carregado.</span>
        </p>
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <router-link to="/perfil" class="block p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300 transform hover:scale-[1.01] border-l-4 border-amber-600">
          <div class="flex items-center space-x-4">
            <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <p class="text-xl font-semibold text-gray-800">Meu Perfil</p>
              <p class="text-sm text-gray-500">Atualize suas informações.</p>
            </div>
          </div>
        </router-link>

        <a href="#" class="block p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300 transform hover:scale-[1.01] border-l-4 border-amber-600">
          <div class="flex items-center space-x-4">
            <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.31.82 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.82 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.31-.82-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.82-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <div>
              <p class="text-xl font-semibold text-gray-800">Configurações</p>
              <p class="text-sm text-gray-500">Gerencie preferências.</p>
            </div>
          </div>
        </a>

        <button @click="handleLogout" class="block w-full p-6 text-left rounded-full shadow-lg text-lg font-bold text-white bg-amber-600 hover:bg-amber-700 transition duration-150 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
          <div class="flex items-center space-x-4 justify-center">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m18-6v-1a3 3 0 00-3-3H9"></path></svg>
            <span>Sair do Sistema</span>
          </div>
        </button>
        
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  methods: {
    handleLogout() {
      alert('Logout realizado com sucesso!');
      this.$router.push('/login'); 
    }
  }
}
</script>

<style scoped>
</style>