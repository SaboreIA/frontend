<template>
  <div class="max-w-[1450px] mx-auto p-4 sm:p-6 lg:p-8 bg-white -mt-28">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Restaurantes</h1>

    <div v-if="loading" class="text-center p-10 text-blue-500">
      <p class="text-xl">Carregando lista de restaurantes da API...</p>
    </div>

    <div v-else>
      <div
        v-if="restaurantes.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <RestauranteCard
          v-for="restaurante in restaurantes" 
          :key="restaurante.id"
          :restaurante="restaurante"
        />
      </div>

      <div v-else class="text-center py-10 text-gray-500 text-lg">
        Nenhum restaurante carregado da API.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import RestauranteCard from '../../components/HomeView/DestaqueContent_Cards.vue'; 

const restaurantes = ref([]);
const loading = ref(true);

const fetchRestaurants = async () => {
  loading.value = true;
  try {
    const urlBase = 'http://localhost:5000/api/Restaurants'; 
    
    const response = await axios.get(urlBase, {
      params: {
        pageNumber: 1,
        pageSize: 10 
      }
    }); 
    
    if (response.data && response.data.items) {
      restaurantes.value = response.data.items; 
    } 
    else if (response.data && response.data.data) {
        restaurantes.value = response.data.data;
    }
    else if (Array.isArray(response.data)) {
        restaurantes.value = response.data;
    } else {
        console.error("Formato de resposta da API de paginação não reconhecido:", response.data);
        restaurantes.value = [];
    }

    console.log("Restaurantes carregados para teste:", restaurantes.value);

  } catch (error) {
    console.error('Erro ao buscar a lista de restaurantes:', error);
    restaurantes.value = []; 
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRestaurants);

</script>