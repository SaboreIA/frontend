<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div v-if="loading" class="text-center py-10 text-xl text-gray-600">
      Carregando informações do restaurante...
    </div>
    <div v-else-if="error" class="text-center py-10 text-xl text-red-600">
      Erro ao carregar o restaurante. Verifique a API.
    </div>

    <div v-else-if="restaurant" class="space-y-8">
      <header class="relative rounded-lg overflow-hidden shadow-lg">
        <img
          :src="restaurant.coverImageUrl"
          :alt="`Capa de ${restaurant.name}`"
          class="w-full h-80 object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
          <h1 class="text-4xl font-extrabold text-white">
            {{ restaurant.name }}
          </h1>
        </div>
      </header>

      <section>
        <h2 class="text-2xl font-semibold mb-3">Sobre o Restaurante</h2>
        <p class="text-gray-700">{{ restaurant.description }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Informações e Contato</h2>
        <GeneralInfo
          :status="restaurantStatus"
          :contactInfo="restaurantContactInfo"
        />
      </section>

      <section v-if="restaurant.address">
        <h2 class="text-2xl font-semibold mb-3">Localização</h2>
        <p class="text-gray-700">
          {{ restaurant.address.street }}, {{ restaurant.address.number }}
          <span v-if="restaurant.address.complement"
            >({{ restaurant.address.complement }})</span
          >
        </p>
        <p class="text-gray-700">
          {{ restaurant.address.city }} - {{ restaurant.address.state }},
          {{ restaurant.address.zipCode }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import GeneralInfo from "./GeneralInfo.vue"; // Ajuste o caminho conforme sua estrutura
import api from "../../api/api";

// O ID do restaurante a ser buscado (você pode substituir por uma rota dinâmica se estiver usando vue-router)
const restaurantId = 1;

// Variáveis reativas para o estado da página
const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);

// ------------------------------------
// 1. Lógica de Busca de Dados (API Call)
// ------------------------------------

const fetchRestaurant = async () => {
  loading.value = true;
  error.value = false;
  try {
    // Altere a URL base conforme o endereço da sua API (.NET)
    const response = await api.get(`/restaurants/${restaurantId}`);
    restaurant.value = response.data;
  } catch (e) {
    console.error("Falha ao buscar restaurante:", e);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// Chama a função de busca assim que o componente é montado
onMounted(fetchRestaurant);

// ------------------------------------
// 2. Computed Properties para Mapear Props
// ------------------------------------

// Cria a prop 'status' a partir dos dados do restaurante
const restaurantStatus = computed(() => {
  if (!restaurant.value) return {};

  const isActive = restaurant.value.isActive;
  return {
    text: isActive ? "ABERTO" : "FECHADO",
    color: isActive ? "text-green-600" : "text-red-600",
  };
});

// Cria a prop 'contactInfo' a partir dos dados do restaurante
const restaurantContactInfo = computed(() => {
  if (!restaurant.value) return {};

  return {
    // Usa o phoneNumber do JSON (14 99855-2372)
    // Se você quer "14 98894-9896", terá que mudar na API ou aqui manualmente
    number: restaurant.value.phoneNumber || null,

    // Mapeia site do JSON para site da prop e adiciona o protocolo HTTP/HTTPS
    site: restaurant.value.site ? `http://${restaurant.value.site}` : null,

    // **NOVOS VALORES ADICIONADOS PARA SIMULAR A IMAGEM 1**
    // Estes campos não existem no seu JSON de exemplo da Imagem 2,
    // então estou fornecendo valores fixos aqui para a visualização.
    // O ideal é que eles venham da sua API se forem dados reais do restaurante.
    menu: "https://seumenu.com.br/sabor-oriental", // Exemplo de link para o menu
    mail: "sabororiental@contato.com",
  };
});
</script>

<style scoped>
/* Adicione estilos específicos para esta página aqui se necessário */
</style>
