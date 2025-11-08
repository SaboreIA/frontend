<template>
  <div>
    <MainContent class="max-w-[1450px] mx-auto bg-white shadow-2xl rounded-xl -mt-20" />
    <DestaquesContent class="mt-10" />
    <SobreContent class="mt-10" />
    <div class="border-b pb-2"></div>
    <PlanosContent />
    <ContatoContent />
  </div>
</template>

<script>
import ContatoContent from '@/components/HomeView/ContatoContent.vue';
import DestaquesContent from '@/components/HomeView/DestaquesContent.vue';
import MainContent from '@/components/HomeView/MainContent.vue';
import PlanosContent from '@/components/PlanosView/PlanosContent.vue';
import SobreContent from '@/components/Sobre/SobreContent.vue';

export default {
  components: {
    MainContent,
    DestaquesContent,
    SobreContent,
    PlanosContent,
    ContatoContent
  }
};
</script>

<style scoped>
</style>
