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
  { id: 1, nome: 'Sabor Oriental', tipo: 'Japonesa', nota: 4.8, descricao: 'Melhor sushi da cidade.', imgUrl: 'https://restauranteyu.com.br/wp-content/uploads/2024/05/AMBIENTE_YU5-1-scaled.jpg' },
  { id: 2, nome: 'O Burrito Loco', tipo: 'Mexicana', nota: 4.5, descricao: 'Tacos e burritos autênticos.', imgUrl: 'https://uploads.dicasdadisneyeorlando.com/sites/5/2019/10/comida-mexicana-orlando.jpg' },
  { id: 3, nome: 'Pizza Fantástica', tipo: 'Pizzaria', nota: 4.9, descricao: 'Forno à lenha e ingredientes frescos.', imgUrl: 'https://cdn6.campograndenews.com.br/uploads/noticias/2024/04/11/ff4a4d2f15d176841c0d647dccb66774a35c7103.jpg' },
  { id: 4, nome: 'Hamburgueria do Zé', tipo: 'Lanchonete', nota: 4.2, descricao: 'Hambúrgueres artesanais e batatas fritas.', imgUrl: 'https://picsum.photos/400/300?random=4' },
  { id: 5, nome: 'Green Piece', tipo: 'Vegana', nota: 4.7, descricao: 'Opções veganas e fitness.', imgUrl: 'https://ciclovivo.com.br/wp-content/uploads/2024/06/purana-brunch-vegano-1024x663.jpg' },
  { id: 6, nome: 'Temaki Express', tipo: 'Japonesa', nota: 4.6, descricao: 'Temakis feitos na hora.', imgUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/85/e1/f6/temaki-now.jpg?w=1100&h=1100&s=1' },
  { id: 7, nome: 'Churrasco Prime', tipo: 'Churrascaria', nota: 4.7, descricao: 'Carnes nobres e buffet variado.', imgUrl: 'https://s2-oglobo.glbimg.com/ZeRtIyym-63-0GPjjBHfxhBujPc=/0x0:4424x5538/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/C/u/yEIAqIRTezxh1mxSG5AA/20231023-rufino-026-alta-credtomasrangel.jpg' },
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