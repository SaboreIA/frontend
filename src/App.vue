<template>
  <div id="app" class="min-h-screen bg-white">
    
    <MainHeader :variant="headerVariant" />
    <div :class="[paddingClass]"></div>

    <router-view class="flex-grow mb-20" />
    <ChatBot />
    <FooterComponent/>
  </div>
</template>

<script>
import MainHeader from '@/components/header/MainHeader.vue';
import ChatBot from '@/components/chatbot/ChatBot.vue'; 


import FooterComponent from '@/components/footer/footer.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
    FooterComponent,
    ChatBot 
  },
  computed: {
    headerVariant() {
      const meta = this.$route.meta || {};

      if (meta.requiresDashboardHeader) {
        return 'dashboard';
      }

      if (meta.requiresMinimalHeader) {
        return 'minimal';
      }

      return 'default';
    },

    paddingClass() {
      if (this.headerVariant === 'dashboard' || this.headerVariant === 'minimal') {
        return 'pt-20 md:pt-24';
      }

      return 'pt-24 md:pt-28';
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
