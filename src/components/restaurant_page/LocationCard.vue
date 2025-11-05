<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
    
    <template v-if="address && address.street">
      
      <div 
        :id="MAP_ID" 
        class="bg-gray-200 h-40 flex items-center justify-center rounded-lg shadow-inner"
      >
        <span v-if="!mapInitialized" class="text-lg font-bold text-gray-600">Carregando Mapa...</span>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Localização</h3>
        
        <p class="text-gray-600 whitespace-pre-line">
          {{ address.street }}, {{ address.number }}
          <span v-if="address.complement">({{ address.complement }})</span>
        </p>
        <p class="text-gray-600 whitespace-pre-line">
          {{ address.city }} - {{ address.state }},
          {{ address.zipCode }}
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
import { ref, defineProps, computed, watch, onMounted } from "vue";

const MAP_ID = "mapContainer";

const props = defineProps({
    address: {
        type: Object,
        required: true,
        default: () => ({ street: null, number: null, city: null, state: null, zipCode: null, complement: null })
    },
    restaurantName: {
        type: String,
        default: 'Local'
    }
});

const mapInitialized = ref(false);
let map; 

const fetchRestaurant = async (id) => {
    loading.value = true;
    error.value = false;
    restaurant.value = null; 
    mapInitialized.value = false;

    try {
        const response = await api.get(`/restaurants/11`);
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

let geocoder;

const mapLink = computed(() => {
    if (!props.address || !props.address.street) return '#';

    const addr = props.address;
    const addressString = `${addr.street} ${addr.number}, ${addr.city} - ${addr.state}`;
    
    const baseUrl = `https://www.google.com/maps/dir/?api=1&destination=`;
    return `${baseUrl}${encodeURIComponent(addressString)}`;
});

const getCoord = async () => {
    if (!restaurant.value || !restaurant.value.address) return null;

    const apiKey = 'SUA_CHAVE_API';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${apiKey}`;
}

async function initMap() {
    if (mapInitialized.value || !window.google || !window.google.maps || !props.address.street) return; 

    const { Map, Geocoder, Marker } = window.google.maps;
    
    if (!geocoder) {
        geocoder = new Geocoder();
    }

    const fullAddress = `${props.address.street} ${props.address.number}, ${props.address.city} - ${props.address.state}`;

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
                title: props.restaurantName
            });
            
            mapInitialized.value = true;
        } else {
            console.error("Geocodificação falhou. Status: " + status);
        }
    });
}

watch(() => props.address.street, (newStreet) => {
    if (newStreet) {
        setTimeout(initMap, 100); 
    }
}, { immediate: true });

onMounted(() => {
    if (props.address.street) {
        initMap();
    }
});
</script>