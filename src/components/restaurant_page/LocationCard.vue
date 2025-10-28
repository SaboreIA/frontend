<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
    
    <div v-if="loading" class="md:col-span-2 text-center py-4 text-gray-500">
      Carregando endereço...
    </div>
    <div v-else-if="error" class="md:col-span-2 text-center py-4 text-red-600">
      Falha ao carregar endereço.
    </div>

    <template v-else-if="restaurant && restaurant.address">
      
      <a :href="mapLink" target="_blank" 
         class="bg-gray-200 h-40 flex items-center justify-center rounded-lg shadow-inner cursor-pointer hover:opacity-90 transition">
        <span class="text-lg font-bold text-gray-600">VER MAPA</span>
      </a>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Localização</h3>
        
        <p class="text-gray-600 whitespace-pre-line">
          {{ restaurant.address.street }}, {{ restaurant.address.number }}
          <span v-if="restaurant.address.complement">({{ restaurant.address.complement }})</span>
        </p>
        <p class="text-gray-600 whitespace-pre-line">
          {{ restaurant.address.city }} - {{ restaurant.address.state }},
          {{ restaurant.address.zipCode }}
        </p>
        
        <a :href="mapLink" target="_blank" class="mt-2 inline-block text-yellow-600 hover:text-yellow-700 text-sm font-medium transition">
          Rotas no Google Maps
        </a>
      </div>
      
    </template>
    <div v-else class="md:col-span-2 text-center py-4 text-gray-500">
        Endereço não disponível.
    </div>
  </div>
</template>

<script setup>
// O script setup permanece o mesmo
import { ref, onMounted, defineProps, computed, watch } from "vue";
import api from "../../api/api"; // Módulo de API

const props = defineProps({
    restaurantId: {
        type: [String, Number],
        required: true 
    }
});

const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);

const fetchRestaurant = async (id) => {
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


const mapLink = computed(() => {
    if (!restaurant.value || !restaurant.value.address) return '#';

    const addr = restaurant.value.address;
    const addressString = `${addr.street} ${addr.number} ${addr.city} ${addr.state}`;
    
    // CORRIGIDO: Use `encodeURIComponent` corretamente.
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;
});

watch(() => props.restaurantId, (newId) => {
    if (newId) {
        fetchRestaurant(newId);
    }
}, { immediate: true }); 
</script>