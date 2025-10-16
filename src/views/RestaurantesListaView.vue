<template>
  <div>
    <h1>Lista de Restaurantes</h1>
    <ul v-if="restaurantes.length">
      <li v-for="restaurante in restaurantes" :key="restaurante.id">
        
        <router-link :to="{ name: 'restaurante-detalhe', params: { id: restaurante.id } }">
          {{ restaurante.nome }}
        </router-link>

      </li>
    </ul>
    <p v-else>Nenhum restaurante encontrado.</p>
  </div>
</template>

<script>
// Exemplo básico de dados
const mockRestaurantes = [
    { id: 'burger-house', nome: 'Burger House' },
    { id: 'sushi-zen', nome: 'Sushi Zen' },
    { id: 'churrascaria-gaucha', nome: 'Churrascaria Gaúcha' },
];

export default {
    name: 'RestaurantesListaView',
    data() {
        return {
            restaurantes: mockRestaurantes
        }
    },
    // Em um projeto real, você faria uma chamada Axios aqui para buscar os dados.
    // created() {
    //    axios.get('sua_api/restaurantes').then(response => {
    //        this.restaurantes = response.data;
    //    });
    // }
}
</script>