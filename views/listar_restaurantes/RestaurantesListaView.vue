<template>
  <div>
    <div class="max-w-[1450px] mx-auto p-4 sm:p-6 lg:p-8 bg-white mt-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 -mt-32 text-center uppercase">
        Restaurantes
      </h1>

      <div class="w-full flex justify-center px-4 sm:px-6 lg:px-8 pt-6">
        <RestaurantSearchBar
          v-model="searchTerm"
          @search="handleSearchTerm"
          @clear="handleSearchClear"
          @results="handleSearchResults"
        />
      </div>

      <div class="w-full flex justify-center mt-6 px-4 sm:px-6 lg:px-8">
        <RestaurantCategoryFilter
          :categories="categories"
          :selected="selectedCategory"
          @filter="applyFilter"
        />
      </div>

      <div v-if="loading" class="text-center p-10 text-blue-500">
        <p class="text-xl">Carregando lista de restaurantes da API...</p>
      </div>

      <div v-else>
        <div
          v-if="filteredRestaurantes.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6"
        >
          <RestauranteCard
            class="mt-8"
            v-for="restaurante in filteredRestaurantes"
            :key="restaurante.id"
            :restaurante="restaurante"
            :average-rating="getAverageRating(restaurante.id)"
            :total-reviews="getTotalReviews(restaurante.id)"
            @review-submitted="handleReviewSubmitted"
          />
        </div>

        <div v-if="loadingMore" class="text-center py-4 text-gray-500">
          Carregando mais restaurantes...
        </div>

        <div v-if="!loading && hasMorePages" class="flex justify-center mt-6">
          <button
            @click="loadMore"
            :disabled="loadingMore"
            class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            Carregar Mais Restaurantes
          </button>
        </div>

        <div
          v-else-if="restaurantes.length > 0 && !hasMorePages && !searchTerm && !selectedCategory"
          class="text-center py-10 text-gray-500 text-lg"
        ></div>

        <div
          v-else-if="restaurantes.length > 0"
          class="text-center py-10 text-gray-500 text-lg"
        >
          Nenhum restaurante corresponde à sua busca ou filtro.
        </div>

        <div v-else class="text-center py-10 text-gray-500 text-lg">
          Nenhum restaurante carregado da API.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import RestauranteCard from "../../components/HomeView/DestaqueContent_Cards.vue";
import RestaurantSearchBar from "@/components/restaurants/RestaurantSearchBar.vue";
import RestaurantCategoryFilter from "@/components/filter/CategoryFilter.vue";

const restaurantes = ref([]);
const loading = ref(true);
const loadingMore = ref(false);
const reviews = ref({});
const searchTerm = ref("");
const categories = ref([]);
const selectedCategory = ref(null);
const currentPage = ref(1);
const hasMorePages = ref(true);

const API_BASE = "http://localhost:5001/api";
const PAGE_SIZE = 6;

const getAverageRating = (restaurantId) => {
  return reviews.value[restaurantId]
    ? reviews.value[restaurantId].averageRating
    : 0;
};

const getTotalReviews = (restaurantId) => {
  return reviews.value[restaurantId]
    ? reviews.value[restaurantId].totalReviews
    : 0;
};

const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/tag`);
    const fetchedTags = Array.isArray(data)
      ? data
      : data.items || data.data || [];

    categories.value = fetchedTags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
};

const fetchRestaurants = async (page = 1, append = false) => {
  if (page === 1) loading.value = true;
  else loadingMore.value = true;

  try {
    const { data } = await axios.get(
      `${API_BASE}/Restaurants?pageNumber=${page}&pageSize=${PAGE_SIZE}`
    );

    let newRestaurants =
      data.items || data.data || (Array.isArray(data) ? data : []);

    if (newRestaurants.length > 0) {
      restaurantes.value = append
        ? [...restaurantes.value, ...newRestaurants]
        : newRestaurants;

      hasMorePages.value = newRestaurants.length === PAGE_SIZE;
      currentPage.value = page;

      await Promise.all(
        newRestaurants.map((r) => fetchReviewsForRestaurant(r.id))
      );

      await Promise.all(newRestaurants.map(r => loadRestaurantTags(r)));

    } else {
      hasMorePages.value = false;
      if (!append) restaurantes.value = [];
    }
  } catch (error) {
    console.error(
      `ERRO CRÍTICO: Falha ao carregar restaurantes da página ${page}.`,
      error
    );
    if (!append) restaurantes.value = [];
    hasMorePages.value = false;
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const fetchReviewsForRestaurant = async (restaurantId) => {
  try {
    const { data } = await axios.get(
      `${API_BASE}/Review/restaurant/${restaurantId}`
    );
    const items = data.items || [];
    const avg =
      items.length > 0
        ? items.reduce((s, r) => s + (r.avgRating || 0), 0) / items.length
        : 0;

    reviews.value[restaurantId] = {
      averageRating: avg,
      totalReviews: items.length,
    };
  } catch {
    reviews.value[restaurantId] = { averageRating: 0, totalReviews: 0 };
  }
};

const loadMore = () => {
  fetchRestaurants(currentPage.value + 1, true);
};

function applyFilter(id) {
  selectedCategory.value = selectedCategory.value === id ? null : id;
}

const handleSearchTerm = (term) => {
  searchTerm.value = term;
};

const handleSearchClear = () => {
  searchTerm.value = "";
};

const handleReviewSubmitted = async (restaurantId) => {
  await fetchReviewsForRestaurant(restaurantId);
};

const restaurantsFilteredByCategory = computed(() => {
  const selected = Number(selectedCategory.value);

  if (!selectedCategory.value) {
    return restaurantes.value;
  }

  return restaurantes.value.filter((r) => {
    if (Array.isArray(r.tagIds) && r.tagIds.includes(selected)) {
      return true;
    }

    const tags = r.tags || [];

    if (!Array.isArray(tags)) return false;

    return tags.some(tag => {
      if (tag.id && Number(tag.id) === selected) return true;

      if (tag.tag && Number(tag.tag.id) === selected) return true;

      if (tag.Category && Number(tag.Category.id) === selected) return true;

      if (tag.categoryId && Number(tag.categoryId) === selected) return true;

      return false;
    });
  });
});

const filteredRestaurantes = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  const list = restaurantsFilteredByCategory.value;

  if (!term) return list;

  return list.filter((restaurante) => {
    const name = (restaurante.name || "").toLowerCase();
    const description = (restaurante.description || "").toLowerCase();
    return name.includes(term) || description.includes(term);
  });
});

const loadRestaurantTags = async (restaurant) => {
  try {
    const { data } = await axios.get(`${API_BASE}/Restaurants/${restaurant.id}`);

    restaurant.tagIds = data.tagIds || [];
    restaurant.tags = data.tags || [];
    
  } catch (error) {
    console.warn("Não foi possível carregar tags para o restaurante", restaurant.id);
    restaurant.tagIds = [];
    restaurant.tags = [];
  }
};

onMounted(async () => {
  await fetchCategories();
  fetchRestaurants(1);
});
</script>
