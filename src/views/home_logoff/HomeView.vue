<template>
  <div>
    <MainHeader /> 
    
    <MainContent />
    
    <div class="max-w-7xl px-4 sm:px-6 lg:px-8">
      </div>
  </div>
</template>

<script>
// Ajuste o caminho de SearchHeader se ele estiver em um local diferente
import SearchHeader from '@/components/header/SearchHeader.vue'; 
import MainContent from '@/components/HomeView/MainContent.vue';

export default {
  // A chave 'components' é obrigatória na Options API para registrar o componente
  components: {
    SearchHeader, // Agora o Vue sabe o que é a tag <SearchHeader>
    MainContent   // Agora o Vue sabe o que é a tag <MainContent />
  }
};
</script>

<style scoped>
/* Removemos o estilo .home-view-container antigo, pois não será usado para limitação de largura */
</style>