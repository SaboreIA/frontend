<template>
       
  <div>
                   
    <div class="max-w-[1450px] mx-auto p-4 sm:p-6 lg:p-8 bg-white mt-6">
                       
      <h1 class="text-3xl font-bold text-gray-800 mb-6 -mt-32 text-center uppercase">Restaurantes</h1>
           
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
            >Carregar Mais Restaurantes          
          </button>      
        </div>
                 
        <div
          v-else-if="
            restaurantes.length > 0 &&
            !hasMorePages &&
            !searchTerm &&
            !selectedCategory
          "
          class="text-center py-10 text-gray-500 text-lg">        
        </div>
  
        <div
          v-else-if="restaurantes.length > 0"
          class="text-center py-10 text-gray-500 text-lg"
          >Nenhum restaurante corresponde à sua busca ou
          filtro.                                
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

// 🔴 DEBUG: LOGS DE CATEGORIAS
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

    console.log("--- DEBUG: CATEGORIAS CARREGADAS (API TAGS) ---");
    console.log("Estrutura ID/Tipo:", 
        categories.value.map(c => ({ id: c.id, type: typeof c.id, name: c.name }))
    );
    console.log("-----------------------------------------------");
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
};

// 🔴 DEBUG: LOGS DE TAGS DOS RESTAURANTES
const fetchRestaurants = async (page = 1, append = false) => {
  if (page === 1) {
    loading.value = true;
  } else {
    loadingMore.value = true;
  }

  try {
    const url = `${API_BASE}/Restaurants?pageNumber=${page}&pageSize=${PAGE_SIZE}`;
    const {data} = await axios.get(url);
    let newRestaurants;

    if (Array.isArray(data.items)) {
      newRestaurants = data.items;
    } else if (Array.isArray(data.data)) {
      newRestaurants = data.data;
    } else if (Array.isArray(data)) {
      newRestaurants = data;
    } else if (typeof data === "object" && data !== null && data.id) {
      newRestaurants = [data];
    } else {
      newRestaurants = [];
    }

    if (newRestaurants.length > 0) {
      if (append) {
        restaurantes.value = [...restaurantes.value, ...newRestaurants];
      } else {
        restaurantes.value = newRestaurants;
      }
      hasMorePages.value = newRestaurants.length === PAGE_SIZE;

      currentPage.value = page;

      // DEBUG LOG: Verificar o novo campo 'tags' (Corrigido o acesso ao nome)
      console.log("--- DEBUG: TAGS DOS RESTAURANTES (API RESTAURANTS) ---");
      newRestaurants.forEach(r => {
          const tags = r.tags || [];
          const firstTag = tags.length > 0 ? tags[0] : null;
          console.log(
              `Restaurante: ${r.name}`, 
              `Tags carregadas: ${tags.length}`, 
              `Primeira Tag: ${firstTag ? firstTag.name : 'N/A'}`,
              `ID da Tag: ${firstTag ? firstTag.id : 'N/A'}`
          );
      });
      console.log("---------------------------------------------------------");

      await Promise.all(
        newRestaurants.map((r) => fetchReviewsForRestaurant(r.id))
      );
    } else {
      hasMorePages.value = false;
      if (!append) {
        restaurantes.value = [];
      }
    }
  } catch (error) {
    console.error(
      `ERRO CRÍTICO: Falha ao carregar restaurantes da página ${page}.`,
      error
    );
    if (!append) {
      restaurantes.value = [];
    }
    hasMorePages.value = false;
  } finally {
    loading.value = false;
    loadingMore.value = false;
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

const loadMore = () => {
  fetchRestaurants(currentPage.value + 1, true);
};

// ⚡ Funções expostas ao template (Handlers)
function applyFilter(id) {
  selectedCategory.value = selectedCategory.value === id ? null : id;
}

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

// ⚡ LÓGICA DE FILTRO CORRIGIDA
const restaurantsFilteredByCategory = computed(() => {
  if (selectedCategory.value === null) {
    return restaurantes.value;
  }
  
  return restaurantes.value.filter(
    (r) => {
      // Usa o novo campo 'tags' que é um array de objetos
      const tags = r.tags || []; 

      // Verifica se existe algum objeto tag cujo ID coincide com o selectedCategory.value
      // Assumimos que o ID da categoria é Number (como o fetchCategories sugere)
      return Array.isArray(tags) && tags.some(tag => tag.id === selectedCategory.value);
    }
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
    const description = (restaurante.description || "").toLowerCase();

    return (
      name.includes(term) ||
      description.includes(term)
    );
  });
});

onMounted(async () => {
  await fetchCategories();
  fetchRestaurants(1, false);
});
</script>