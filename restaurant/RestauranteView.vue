<template>
  <div>
    <h1>Restaurante Detalhe (ID: {{ $route.params.id }})</h1>
    <p v-if="restaurante">Nome: {{ restaurante.nome }}</p>
    <p v-else>Carregando dados...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RestauranteView',
  data() {
    return {
      restaurante: null,
      loading: true
    };
  },
  created() {
    this.fetchRestauranteData();
  },
  watch: {
    '$route': 'fetchRestauranteData'
  },
  methods: {
    async fetchRestauranteData() {
      // 1. Pega o ID da URL
      const restauranteId = this.$route.params.id;
      this.loading = true;

      try {
        // 2. Faz a chamada Axios usando o ID
        const response = await axios.get(`sua_api/restaurantes/${restauranteId}`);

        // 3. Salva os dados no estado do componente
        this.restaurante = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Erro ao carregar restaurante:", error);
        this.loading = false;
      }
    }
  }
}
</script>