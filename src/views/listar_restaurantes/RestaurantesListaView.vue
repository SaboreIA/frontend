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
import {ref, onMounted, computed} from "vue";
import axios from "axios";
import RestauranteCard from "../../components/HomeView/DestaqueContent_Cards.vue";
import RestaurantSearchBar from "@/components/restaurants/RestaurantSearchBar.vue";
import RestaurantCategoryFilter from "@/components/filter/CategoryFilter.vue";

const restaurantes = ref([]);
const loading = ref(true);
const reviews = ref({});
const searchTerm = ref("");
const categories = ref([]);
const selectedCategory = ref(null);
const currentPage = ref(1);

const API_BASE = "http://localhost:5001/api";

const categoryIdToNameMap = computed(() => {
  return categories.value.reduce((map, cat) => {
    map[cat.id] = cat.name.toLowerCase();
    return map;
  }, {});
});

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
    const {data} = await axios.get(`${API_BASE}/tag`);
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

const fetchRestaurants = async (page = currentPage.value) => {
  loading.value = true;
  try {
    const url = `${API_BASE}/restaurants/${page}`;
    const {data} = await axios.get(url);
    currentPage.value = page;

    let newRestaurants;

    if (Array.isArray(data.items)) {
      newRestaurants = data.items;
    } else if (Array.isArray(data.data)) {
      newRestaurants = data.data;
    } else if (Array.isArray(data)) {
      newRestaurants = data;
    }
    else if (typeof data === "object" && data !== null && data.id) {
      newRestaurants = [data];
    }
    else {
      newRestaurants = [];
    }

    restaurantes.value = newRestaurants;
    console.log(
      restaurantes.value.length,
      "É Array?",
      Array.isArray(restaurantes.value)
    );

    if (Array.isArray(restaurantes.value) && restaurantes.value.length > 0) {
      await Promise.all(
        restaurantes.value.map((r) => fetchReviewsForRestaurant(r.id))
      );
    }
  } catch (error) {
    console.error(
      `ERRO CRÍTICO: Falha ao carregar restaurantes da página ${page}.`,
      error
    );
    restaurantes.value = [];
  } finally {
    loading.value = false;
  }
};

const fetchReviewsForRestaurant = async (restaurantId) => {
  try {
    const {data} = await axios.get(
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
    reviews.value[restaurantId] = {averageRating: 0, totalReviews: 0};
  }
};

function applyFilter(id) {
  selectedCategory.value = selectedCategory.value === id ? null : id;
}

const restaurantsFilteredByCategory = computed(() => {
  if (!selectedCategory.value) {
    return restaurantes.value;
  }
  const selectedCategoryName =
    categoryIdToNameMap.value[selectedCategory.value];

  if (!selectedCategoryName) {
    return restaurantes.value;
  }

  return restaurantes.value.filter(
    (r) =>
      Array.isArray(r.categories) &&
      r.categories.some(
        (categoryObject) =>
          (categoryObject.name || "").toLowerCase() === selectedCategoryName
      )
  );
});

const filteredRestaurantes = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  const listToSearch = restaurantsFilteredByCategory.value;

  if (!term) {
    return listToSearch;
  }

  return listToSearch.filter((restaurante) => {
    const name = (restaurante.name || restaurante.nome || "").toLowerCase();
    const cuisine = (
      restaurante.cuisine ||
      restaurante.category ||
      restaurante.tipo ||
      ""
    ).toLowerCase();
    const description = (restaurante.description || "").toLowerCase();

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
  searchTerm.value = "";
};

const handleSearchResults = (results) => {
  console.log("Resultados da pesquisa (lista):", results);
};

const handleReviewSubmitted = async (restaurantId) => {
  await fetchReviewsForRestaurant(restaurantId);
};

onMounted(() => {
  fetchCategories();
  fetchRestaurants(1);
});
</script>