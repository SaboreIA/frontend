<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
    
    <div v-if="loading" class="md:col-span-2 text-center py-4 text-gray-500">
      Carregando endereço...
    </div>
    <div v-else-if="error" class="md:col-span-2 text-center py-4 text-red-600">
      Falha ao carregar endereço.
    </div>

    <template v-else-if="restaurant && restaurant.address">
      
      <div 
        ref="mapContainerRef"
        :id="MAP_ID" 
        class="bg-gray-200 h-40 flex items-center justify-center rounded-lg shadow-inner"
      >
        <span v-if="!mapInitialized" class="text-lg font-bold text-gray-600">VER MAPA</span>
      </div>
      
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

import { ref, defineProps, computed, watch } from "vue";
import api from "../../api/api"; 

const MAP_ID = "mapContainer";

const props = defineProps({
    restaurantId: {
        type: [String, Number],
        required: true 
    }
});

const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);
const mapInitialized = ref(false);

let map; 

const fetchRestaurant = async (id) => {
    loading.value = true;
    error.value = false;
    restaurant.value = null; 
    mapInitialized.value = false;

    try {
        const response = await api.get(`/restaurants/${id}`);
        restaurant.value = response.data; 
        
        if (restaurant.value && restaurant.value.address) {
            await initMap();
        }
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
    const addressString = `${addr.street} ${addr.number}, ${addr.city} - ${addr.state}`;
    
    const baseUrl = `https://www.google.com/maps/dir/?api=1&destination=`;
    return `${baseUrl}${encodeURIComponent(addressString)}`;
});

async function initMap() {
    if (mapInitialized.value || !window.google || !window.google.maps) return; 

    try {
        const { Map, Geocoder } = window.google.maps;
        
        const Marker = window.google.maps.Marker; 
        
        const geocoder = new Geocoder();

        const fullAddress = `${restaurant.value.address.street} ${restaurant.value.address.number}, ${restaurant.value.address.city} - ${restaurant.value.address.state}`;

        geocoder.geocode({ address: fullAddress }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const position = results[0].geometry.location;
                
                map = new Map(document.getElementById(MAP_ID), {
                    center: position,
                    zoom: 15,
                    mapId: "DEMO_MAP_ID" 
                });

                new Marker({
                    position: position,
                    map: map, 
                    title: restaurant.value.name
                });
                
                mapInitialized.value = true;
            } else {
                console.error("Geocodificação falhou devido a: " + status);
            }
        });

    } catch (e) {
        console.error("Falha ao carregar o Google Maps SDK ou Geocoder:", e);
        error.value = true;
    }
}


watch(() => props.restaurantId, (newId) => {
    if (newId) {
        fetchRestaurant(newId);
    }
}, { immediate: true }); 
</script>