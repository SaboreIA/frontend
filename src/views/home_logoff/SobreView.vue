<template>
<SobreContent/>
</template>

<script>
import SobreContent from '@/components/HomeView/SobreContent.vue';

export default {
  components: {
    SobreContent
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
