<template>
  <div>
    <MainHeader /> 
      
        <MainContent class="max-w-[1450px] mx-auto bg-white shadow-2xl rounded-xl -mt-20" /> 

    <DestaquesContent class="mt-10"/>
    <SobreContent />
  </div>
</template>

<script>
// (Seu script de importação e registro permanece o mesmo)
import SearchHeader from '@/components/header/SearchHeader.vue'; 
import DestaquesContent from '@/components/HomeView/DestaquesContent.vue';
import MainContent from '@/components/HomeView/MainContent.vue';
import SobreContent from '@/components/HomeView/SobreContent.vue';

export default {
  components: {
    SearchHeader, 
    MainContent,
    DestaquesContent,
    SobreContent
  }
};
</script>

<style scoped>
/* Seu estilo permanece o mesmo */
</style>