<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="loading" class="text-center py-10 text-xl text-gray-600">
      Carregando informações do restaurante...
    </div>
    <div v-else-if="error" class="text-center py-10 text-xl text-red-600">
      Erro ao carregar o restaurante. Verifique a API.
    </div>

    <div v-else-if="restaurant" class="space-y-8">
           
      
      <section>
        <h2 class="text-2xl font-semibold mb-3">Sobre o Restaurante</h2>
        <p class="text-gray-700">{{ restaurant.description }}</p>
      </section>


    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../../api/api";

const restaurantId = 1;

const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);


const fetchRestaurant = async () => {
  loading.value = true;
  error.value = false;
  try {
    const response = await api.get(`/restaurants/${restaurantId}`);
    restaurant.value = response.data;
  } catch (e) {
    console.error("Falha ao buscar restaurante:", e);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRestaurant);

const restaurantStatus = computed(() => {
  if (!restaurant.value) return {};

  const isActive = restaurant.value.isActive;
  return {
    text: isActive ? "ABERTO" : "FECHADO",
    color: isActive ? "text-green-600" : "text-red-600",
  };
});

const restaurantContactInfo = computed(() => {
  if (!restaurant.value) return {};

  return {
    number: restaurant.value.phoneNumber || null,

    site: restaurant.value.site ? `http://${restaurant.value.site}` : null,
    menu: "https://seumenu.com.br/sabor-oriental",
    mail: "sabororiental@contato.com",
  };
});
</script>

<style scoped>
</style>
