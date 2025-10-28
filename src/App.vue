<template>
  <div id="app" class="min-h-screen bg-white">
    
    <component 
      :is="currentHeaderComponent" 
      v-if="currentHeaderComponent" 
    />
    <div :class="[paddingClass]"></div>

    <router-view class="flex-grow mb-20" />
    <ChatBot />
    <FooterComponent/>
  </div>
</template>

<script>
import MainHeader from '@/components/header/MainHeader.vue';
import SearchHeader from '@/components/header/SearchHeader.vue';
import HeaderLogin from '@/components/header/HeaderLogin.vue';
import HeaderPainelControle from '@/components/header/HeaderPainelControle.vue';
import ChatBot from '@/components/chatbot/ChatBot.vue'; 


import FooterComponent from '@/components/footer/footer.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
    SearchHeader,
    HeaderLogin,
    HeaderPainelControle,
    FooterComponent,
    ChatBot 
  },
  computed: {
    currentHeaderComponent() {
      const meta = this.$route.meta;

      if (meta.requiresDashboardHeader) {
        return 'HeaderPainelControle';
      }

      if (meta.requiresMinimalHeader) {
        return 'HeaderLogin';
      }

      if (meta.searchHeader) {
        return 'SearchHeader';
      }

      return 'MainHeader';
    },

    paddingClass() {
      const meta = this.$route.meta;
      const currentHeader = this.currentHeaderComponent;

      if (currentHeader === 'SearchHeader') {
        return 'pt-32'; 
      }

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
