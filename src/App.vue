<template>
  <div id="app" class="min-h-screen bg-white">
    
    <MainHeader :variant="headerVariant" />
    <div :class="[paddingClass]"></div>

    <router-view class="flex-grow mb-20" />
    <ChatBot />
    <FooterComponent/>
    <ToastStack />
  </div>
</template>

<script>
import MainHeader from '@/components/header/MainHeader.vue';
import ChatBot from '@/components/chatbot/ChatBot.vue'; 


import FooterComponent from '@/components/footer/footer.vue';
import ToastStack from '@/components/ui/ToastStack.vue';

export default {
  name: 'App',
  components: {
    MainHeader,
    FooterComponent,
    ChatBot,
    ToastStack,
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

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.flex-grow {
  flex-grow: 1;
}

</style>
