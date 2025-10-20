<template>
  <div>
    <MainHeader /> 
      
        <MainContent class="-mt-28" /> 

    <DestaquesContent class="mt-10"/>

  </div>
</template>

<script>
// (Seu script de importação e registro permanece o mesmo)
import SearchHeader from '@/components/header/SearchHeader.vue'; 
import DestaquesContent from '@/components/HomeView/DestaquesContent.vue';
import MainContent from '@/components/HomeView/MainContent.vue';

export default {
  components: {
    SearchHeader, 
    MainContent,
    DestaquesContent
  }
};
</script>

<style scoped>
/* Seu estilo permanece o mesmo */
</style>