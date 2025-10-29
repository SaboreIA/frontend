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
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div v-if="restaurantContactInfo.site" class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-amber-600 flex-shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <a 
          :href="restaurantContactInfo.site" 
          target="_blank" 
          class="text-gray-700 text-sm hover:text-amber-600 transition truncate"
        >
          {{ restaurantContactInfo.site.replace('http://', '').replace('https://', '') || 'SITE' }}
        </a>
      </div>

      <div v-if="restaurantContactInfo.number" class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-amber-600 flex-shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
        <a 
          :href="`tel:${restaurantContactInfo.number.replace(/\D/g, '')}`" 
          class="text-gray-700 text-sm hover:text-amber-600 transition"
        >
          {{ restaurantContactInfo.number }}
        </a>
      </div>

      <div v-if="restaurantContactInfo.menu" class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-amber-600 flex-shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
        <a 
          :href="restaurantContactInfo.menu" 
          target="_blank" 
          class="text-gray-700 text-sm hover:text-amber-600 transition"
        >
          MENU
        </a>
      </div>

      <div v-if="restaurantContactInfo.mail" class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-amber-600 flex-shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <a 
          :href="`mailto:${restaurantContactInfo.mail}`" 
          class="text-gray-700 text-sm hover:text-amber-600 transition truncate"
        >
          {{ restaurantContactInfo.mail }}
        </a>
      </div>
      
    </div>
  </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3">Sobre o Restaurante</h2>
        <p class="text-gray-700">{{ restaurant.description || 'Nenhuma descrição detalhada fornecida.' }}</p>
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
      
        const response = await api.get(`/restaurants/11`); 
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