<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8 bg-white">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Restaurantes</h1>

    <div class="mb-8 flex flex-wrap gap-2 justify-center">
      <button
        @click="selecionarTipo('Todos')"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition duration-150 border-2',
          tipoSelecionado === 'Todos'
            ? 'bg-amber-600 text-white border-amber-600 shadow-md' // Ativo
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50', // Inativo
        ]"
      >
        Todos
      </button>

      <button
        v-for="tipo in tiposRestaurante"
        :key="tipo"
        @click="selecionarTipo(tipo)"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition duration-150 border-2',
          tipoSelecionado === tipo
            ? 'bg-amber-600 text-white border-amber-600 shadow-md' // Ativo
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50', // Inativo
        ]"
      >
        {{ tipo }}
      </button>
    </div>

    <div
      v-if="restaurantesFiltrados.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <RestauranteCard
        v-for="restaurante in restaurantesFiltrados"
        :key="restaurante.id"
        :restaurante="restaurante"
      />
    </div>

    <div v-else class="text-center py-10 text-gray-500 text-lg">
      Nenhum restaurante encontrado para o tipo "{{ tipoSelecionado }}".
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import RestauranteCard from './RestaurantesCardView.vue'; 
// OBS: Certifique-se que o caminho de importação para 'RestauranteCard.vue' está correto.

// --- DADOS E LÓGICA ---

// Dados de exemplo
const restaurantes = ref([
  { id: 1, nome: 'Sabor Oriental', tipo: 'Japonesa', nota: 4.8, descricao: 'Melhor sushi da cidade.', imgUrl: 'https://picsum.photos/400/300?random=1' },
  { id: 2, nome: 'O Burrito Loco', tipo: 'Mexicana', nota: 4.5, descricao: 'Tacos e burritos autênticos.', imgUrl: 'https://picsum.photos/400/300?random=2' },
  { id: 3, nome: 'Pizza Fantástica', tipo: 'Pizzaria', nota: 4.9, descricao: 'Forno à lenha e ingredientes frescos.', imgUrl: 'https://picsum.photos/400/300?random=3' },
  { id: 4, nome: 'Hamburgueria do Zé', tipo: 'Lanchonete', nota: 4.2, descricao: 'Hambúrgueres artesanais e batatas fritas.', imgUrl: 'https://picsum.photos/400/300?random=4' },
  { id: 5, nome: 'Comida Vegana', tipo: 'Vegana', nota: 4.7, descricao: 'Opções veganas e fitness.', imgUrl: 'https://picsum.photos/400/300?random=5' },
  { id: 6, nome: 'Temaki Express', tipo: 'Japonesa', nota: 4.6, descricao: 'Temakis feitos na hora.', imgUrl: 'https://picsum.photos/400/300?random=6' },
  { id: 7, nome: 'Churrasco Prime', tipo: 'Churrascaria', nota: 4.7, descricao: 'Carnes nobres e buffet variado.', imgUrl: 'https://picsum.photos/400/300?random=7' },
]);

// Tipos de restaurante únicos para criar os botões de filtro
const tiposRestaurante = computed(() => {
  const tipos = new Set(restaurantes.value.map(r => r.tipo));
  return Array.from(tipos).sort(); 
});

// Estado para guardar o filtro ativo
const tipoSelecionado = ref('Todos');

// Função para mudar o filtro ativo
const selecionarTipo = (tipo) => {
  tipoSelecionado.value = tipo;
};

// Propriedade Computada para a Filtragem (Chave da Reatividade)
const restaurantesFiltrados = computed(() => {
  if (tipoSelecionado.value === 'Todos') {
    return restaurantes.value;
  }
  
  // Filtra o array original com base no tipo selecionado
  return restaurantes.value.filter(
    (restaurante) => restaurante.tipo === tipoSelecionado.value
  );
});
</script>