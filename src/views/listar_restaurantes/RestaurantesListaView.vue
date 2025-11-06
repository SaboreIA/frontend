<template>
  <div>
    <div class="w-full flex justify-center px-4 sm:px-6 lg:px-8 pt-6">
      <RestaurantSearchBar
        v-model="searchTerm"
        @search="handleSearchTerm"
        @clear="handleSearchClear"
        @results="handleSearchResults"
      />
    </div>

    <div class="max-w-[1450px] mx-auto p-4 sm:p-6 lg:p-8 bg-white mt-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Restaurantes</h1>

      <div v-if="loading" class="text-center p-10 text-blue-500">
        <p class="text-xl">Carregando lista de restaurantes da API...</p>
      </div>

      <div v-else>
        <div
          v-if="filteredRestaurantes.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <RestauranteCard
            v-for="restaurante in filteredRestaurantes"
            :key="restaurante.id"
            :restaurante="restaurante"
            :average-rating="getAverageRating(restaurante.id)"
            :total-reviews="getTotalReviews(restaurante.id)"
            @review-submitted="handleReviewSubmitted"
          />
        </div>

        <div v-else-if="restaurantes.length > 0" class="text-center py-10 text-gray-500 text-lg">
          Nenhum restaurante corresponde à sua busca.
        </div>

        <div v-else class="text-center py-10 text-gray-500 text-lg">
          Nenhum restaurante carregado da API.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import RestauranteCard from '../../components/HomeView/DestaqueContent_Cards.vue'; 
import RestaurantSearchBar from '@/components/restaurants/RestaurantSearchBar.vue';

const restaurantes = ref([]);
const loading = ref(true);
const reviews = ref({});
const searchTerm = ref('');

const API_BASE = 'http://localhost:5001/api';

const fetchRestaurants = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE}/Restaurants`, {
      params: { pageNumber: 1, pageSize: 10 }
    });
    
    if (response.data?.items) {
      restaurantes.value = response.data.items;
    } else if (Array.isArray(response.data)) {
      restaurantes.value = response.data;
    } else if (response.data?.data) {
      restaurantes.value = response.data.data;
    } else {
      console.error('Formato de resposta da API de restaurantes não reconhecido:', response.data);
    }

    for (const r of restaurantes.value) {
      await fetchReviewsForRestaurant(r.id);
    }

  } catch (error) {
    console.error('Erro ao buscar a lista de restaurantes:', error);
    restaurantes.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchReviewsForRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_BASE}/Review/restaurant/${restaurantId}`);
    const items = response.data?.items || [];

    if (items.length === 0) {
      reviews.value[restaurantId] = { averageRating: 0, totalReviews: 0 };
      return;
    }

    const avg = items.reduce((sum, r) => sum + (r.avgRating || 0), 0) / items.length;

    reviews.value[restaurantId] = {
      averageRating: avg,
      totalReviews: items.length
    };

  } catch (error) {
    console.error(`Erro ao buscar avaliações do restaurante ${restaurantId}:`, error);
    reviews.value[restaurantId] = { averageRating: 0, totalReviews: 0 };
  }
};

const getAverageRating = (restaurantId) =>
  reviews.value[restaurantId]?.averageRating || 0;

const getTotalReviews = (restaurantId) =>
  reviews.value[restaurantId]?.totalReviews || 0;

const handleReviewSubmitted = async (restaurantId) => {
  console.log(`Nova avaliação enviada para o restaurante ${restaurantId}. Recarregando dados...`);
  await fetchReviewsForRestaurant(restaurantId);
};

const filteredRestaurantes = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();

  if (!term) {
    return restaurantes.value;
  }

  return restaurantes.value.filter((restaurante) => {
    const name = (restaurante.name || restaurante.nome || '').toLowerCase();
    const cuisine = (restaurante.cuisine || restaurante.category || restaurante.tipo || '').toLowerCase();
    const description = (restaurante.description || '').toLowerCase();

    return (
      name.includes(term) ||
      cuisine.includes(term) ||
      description.includes(term)
    );
  });
});

const handleSearchTerm = (term) => {
  searchTerm.value = term;
};

const handleSearchClear = () => {
  searchTerm.value = '';
};

const handleSearchResults = (results) => {
  console.log('Resultados da pesquisa (lista):', results);
};

onMounted(fetchRestaurants);
</script>
