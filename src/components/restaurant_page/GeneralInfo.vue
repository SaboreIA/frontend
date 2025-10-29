<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="loading" class="text-center py-10 text-xl text-gray-600">
      Carregando informações do restaurante...
    </div>
    <div v-else-if="error" class="text-center py-10 text-xl text-red-600">
      Erro ao carregar o restaurante. Verifique a API.
    </div>

    <div v-else-if="restaurant" class="space-y-8">
      
      <section class="mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-2">VISÃO GERAL</h2>
        
        <div class="mb-6 flex items-center space-x-2">
          <div 
            :class="[
              'w-3 h-3 rounded-full flex-shrink-0',
              status.color === 'text-green-600' ? 'bg-green-600' : 'bg-red-600' // Cor do círculo
            ]"
          ></div>
          <p class="text-lg font-bold" :class="status.color">
            {{ status.text }}
          </p>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3">Sobre o Restaurante</h2>
        <p class="text-gray-700">{{ restaurant.description || 'Nenhuma descrição detalhada fornecida.' }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3">Contato</h2>
        <ul class="space-y-1 text-gray-700">
            <li v-if="restaurantContactInfo.number">
                📞 Telefone: <a :href="`tel:${restaurantContactInfo.number}`" class="text-yellow-600 hover:underline">{{ restaurantContactInfo.number }}</a>
            </li>
            <li v-if="restaurantContactInfo.site">
                🌐 Site: <a :href="restaurantContactInfo.site" target="_blank" class="text-yellow-600 hover:underline">{{ restaurantContactInfo.site }}</a>
            </li>
            <li v-if="restaurantContactInfo.menu">
                🍽️ Menu: <a :href="restaurantContactInfo.menu" target="_blank" class="text-yellow-600 hover:underline">{{ restaurantContactInfo.menu }}</a>
            </li>
            <li v-if="restaurantContactInfo.mail">
                📧 Email: <a :href="`mailto:${restaurantContactInfo.mail}`" class="text-yellow-600 hover:underline">{{ restaurantContactInfo.mail }}</a>
            </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, watch } from "vue";
import api from "../../api/api";

const props = defineProps({
    restaurantId: {
        type: [String, Number],
        required: true,
    }
});

const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);


const fetchRestaurant = async (id) => {
    if (!id) return; 

    loading.value = true;
    error.value = false;
    restaurant.value = null; 

    try {
      
        const response = await api.get(`/restaurants/${id}`); 
        restaurant.value = response.data;
    } catch (e) {
        console.error("Falha ao buscar restaurante:", e);
        error.value = true;
    } finally {
        loading.value = false;
    }
};

watch(() => props.restaurantId, (newId) => {
    fetchRestaurant(newId);
}, { immediate: true }); 


const status = computed(() => {
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