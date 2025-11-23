<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-10 bg-white">
    <h1 class="text-3xl font-bold text-yellow-600 mb-6 text-center">DESTAQUES</h1>

    <div v-if="loading" class="py-10 text-center text-gray-500">
      Carregando restaurantes em destaque...
    </div>

    <div v-else-if="errorMessage" class="py-10 text-center text-red-500">
      {{ errorMessage }}
    </div>

    <div
      v-else-if="restaurantesFiltrados.length === 0"
      class="py-10 text-center text-gray-500"
    >
      Nenhum restaurante em destaque disponível no momento.
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
    >
      <RestauranteCard
        v-for="restaurante in restaurantesFiltrados"
        :key="restaurante.id"
        :restaurante="restaurante"
        :average-rating="restaurante.averageRating"
        :total-reviews="restaurante.totalReviews"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import RestauranteCard from './DestaqueContent_Cards.vue';
import api from '@/api/api';

const restaurantes = ref([]);
const loading = ref(true);
const errorMessage = ref('');

const HIGHLIGHT_LIMIT = 6;
const DEFAULT_IMAGE = 'https://placehold.co/600x400?text=Restaurante';

const parseResponseList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

const extractAverageRating = (restaurant) => {
  const ratingCandidates = [
    restaurant.averageRating,
    restaurant.avgRating,
    restaurant.rating,
    restaurant.score,
    restaurant.mediaAvaliacoes,
  ];
  const rating = ratingCandidates.find((value) => value != null);
  return rating != null ? Number(rating) : null;
};

const extractTotalReviews = (restaurant) => {
  const reviewCandidates = [
    restaurant.totalReviews,
    restaurant.reviewsCount,
    restaurant.reviewCount,
    restaurant.qtdAvaliacoes,
  ];
  const reviews = reviewCandidates.find((value) => value != null);
  return reviews != null ? Number(reviews) : 0;
};

const computeRelevanceScore = (restaurant) => {
  const rating = extractAverageRating(restaurant) ?? 0;
  const reviews = extractTotalReviews(restaurant);
  return rating * 10 + reviews;
};

const enrichRestaurant = (restaurant) => {
  const fallbackImage =
    restaurant.coverImageUrl ||
    restaurant.imageUrl ||
    restaurant.imageURL ||
    restaurant.imageUrl1 ||
    restaurant.imageUrl2 ||
    DEFAULT_IMAGE;

  const averageRating = extractAverageRating(restaurant);
  const totalReviews = extractTotalReviews(restaurant);

  return {
    ...restaurant,
    coverImageUrl: fallbackImage,
    averageRating,
    totalReviews,
    relevanceScore: computeRelevanceScore(restaurant),
  };
};

const carregarDestaques = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const { data } = await api.get('/Restaurants', {
      params: {
        pageNumber: 1,
        pageSize: 24,
      },
    });

    const lista = parseResponseList(data).map(enrichRestaurant);

    lista.sort((a, b) => {
      if (b.relevanceScore === a.relevanceScore) {
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      }
      return b.relevanceScore - a.relevanceScore;
    });

    restaurantes.value = lista.slice(0, HIGHLIGHT_LIMIT);
  } catch (error) {
    console.error('Erro ao carregar destaques:', error);
    errorMessage.value =
      'Não foi possível carregar os restaurantes em destaque. Tente novamente mais tarde.';
    restaurantes.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  carregarDestaques();
});

const restaurantesFiltrados = computed(() => restaurantes.value);
</script>