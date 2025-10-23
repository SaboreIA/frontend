<template>
<SobreViewContent/>
</template>

<script>
import SobreViewContent from '@/components/Sobre/SobreViewContent.vue';

export default {
  components: {
    SobreViewContent
  }
};

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
