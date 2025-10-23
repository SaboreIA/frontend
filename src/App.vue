<template>
  <div id="app" class="min-h-screen bg-white">
    
    <component 
      :is="currentHeaderComponent" 
      v-if="currentHeaderComponent" 
    />
    <div :class="[paddingClass]"></div>

    <!-- O router-view deve ser o principal bloco de conteúdo, com flex-grow: 1 para empurrar o footer -->
    <router-view class="flex-grow mb-20" />
    <ChatBot />
    <!-- NOVO: O seu componente de rodapé é inserido aqui, no final do corpo da aplicação -->
    <FooterComponent/>
  </div>
</template>

<script>
// Importe todos os componentes de header
import MainHeader from '@/components/header/MainHeader.vue';
import SearchHeader from '@/components/header/SearchHeader.vue';
import HeaderLogin from '@/components/header/HeaderLogin.vue';
import HeaderPainelControle from '@/components/header/HeaderPainelControle.vue';
import ChatBot from '@/components/chatbot/ChatBot.vue'; 


// NOVO: Importe o seu componente de Footer
// CORREÇÃO: O caminho foi ajustado de '@/components/FooterComponent.vue' para '@/components/footer/footer.vue'
import FooterComponent from '@/components/footer/footer.vue'; // Ajustado conforme a estrutura de pastas (src/components/footer/footer.vue)

export default {
  name: 'App',
  components: {
    MainHeader,
    SearchHeader,
    HeaderLogin,
    HeaderPainelControle,
    // NOVO: Registrar o FooterComponent para que ele possa ser usado no template
    FooterComponent,
    ChatBot 
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
/* Estilos globais */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garante que o contêiner principal ocupa toda a altura da tela */
}

/* Adicionei a classe flex-grow no router-view no template 
  para garantir que o conteúdo da página empurre o footer para baixo 
  quando o conteúdo da página for pequeno.
*/
.flex-grow {
  flex-grow: 1;
}

</style>
