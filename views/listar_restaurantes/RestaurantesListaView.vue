<template>
  <div class="max-w-[1450px] mx-auto p-6">
    <CategoryFilter
      :categories="categories"
      :selected="selectedCategory"
      @filter="applyFilter"
    />

    <div v-if="loading" class="text-center p-10 text-amber-600">
      Carregando restaurantes...
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
    >
      <RestauranteCard
        v-for="r in filteredRestaurants"
        :key="r.id"
        :restaurante="r"
        :average-rating="reviews[r.id]?.averageRating"
        :categories="categories"
      />
    </div>

    <div
      v-if="!loading && filteredRestaurants.length === 0"
      class="text-center py-10 text-gray-500 text-lg"
    >
      Nenhum restaurante encontrado nesta categoria.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import CategoryFilter from "@/components/filter/CategoryFilter.vue";
import RestauranteCard from "@/components/HomeView/DestaqueContent_Cards.vue";

const restaurantes = ref([]);
const reviews = ref({});
const loading = ref(true);
const selectedCategory = ref(null);

const API_BASE = "http://localhost:5001/api";

const categories = ref([
  { id: 1, name: "Japonesa" },
  { id: 2, name: "Italiana" },
  { id: 3, name: "Lanchonete" },
  { id: 4, name: "Pizzaria" },
  { id: 5, name: "Cafeteria" },
  { id: 6, name: "Vegana" },
  { id: 7, name: "Mexicana" },
  { id: 8, name: "Churrascaria" },
  { id: 9, name: "Sorveteria" },
  { id: 10, name: "Pâtisserie" },
]);

const fetchRestaurants = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get(`${API_BASE}/Restaurants`, {
      params: { pageNumber: 1, pageSize: 10 },
    });
    restaurantes.value = data.items || data.data || data || [];
    for (const r of restaurantes.value) await fetchReviewsForRestaurant(r.id);
  } catch (error) {
    console.error("Erro ao carregar restaurantes:", error);
  } finally {
    loading.value = false;
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

function applyFilter(id) {
  selectedCategory.value = selectedCategory.value === id ? null : id;
}

const filteredRestaurants = computed(() => {
  if (!selectedCategory.value) return restaurantes.value;
  return restaurantes.value.filter(
    (r) =>
      Array.isArray(r.categoryIds) &&
      r.categoryIds.includes(selectedCategory.value)
  );
});

onMounted(fetchRestaurants);
</script>
