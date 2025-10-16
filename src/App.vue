<template>
  <div id="app" class="min-h-screen bg-white">
    
    <component 
      :is="currentHeaderComponent" 
      v-if="currentHeaderComponent" 
    />

    <div :class="[paddingClass]"></div>

    <router-view />
  </div>
</template>

<script>
// Importe todos os componentes de header
import MainHeader from '@/components/MainHeader.vue';
import SearchHeader from '@/components/SearchHeader.vue';
import HeaderLogin from '@/components/HeaderLogin.vue';
import HeaderPainelControle from '@/components/HeaderPainelControle.vue'; // <-- NOVO HEADER IMPORTADO

export default {
  name: 'App',
  components: {
    MainHeader,
    SearchHeader,
    HeaderLogin,
    HeaderPainelControle // <-- NOVO HEADER REGISTRADO
  },
  computed: {
    // 1. Define qual componente de Header deve ser usado
    currentHeaderComponent() {
      const meta = this.$route.meta;

      // 1. Prioridade Máxima: Header Painel de Controle (para rotas logadas)
      if (meta.requiresDashboardHeader) {
        return 'HeaderPainelControle';
      }

      // 2. Segunda Prioridade: Se a rota requer o header minimalista (Login/Cadastro)
      if (meta.requiresMinimalHeader) {
        return 'HeaderLogin';
      }

      // 3. Terceira Prioridade: Se a rota requer o header com busca (2 níveis)
      if (meta.searchHeader) {
        return 'SearchHeader';
      }

      // 4. Padrão: Se a rota não requer busca (1 nível)
      return 'MainHeader';
    },

    // 2. Define a classe de preenchimento (padding) com base no Header
    paddingClass() {
      const meta = this.$route.meta;
      const currentHeader = this.currentHeaderComponent;

      // Se for o SearchHeader (2 níveis), usa um padding maior
      if (currentHeader === 'SearchHeader') {
        // Usando o pt-32 para SearchHeader
        return 'pt-32'; 
      }

      // Se for HeaderLogin, MainHeader, ou HeaderPainelControle (todos 1 nível)
      // Usamos o pt-16 (seu padrão)
      return 'pt-16'; 
    }
  }
}
</script>

<style>
/* Seus estilos globais aqui, se houver */
</style>