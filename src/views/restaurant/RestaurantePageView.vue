<template>
  <div v-if="restaurante.id" class="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-lg -mt-20">
    
    <HeaderInfoView 
      :name="restaurante.nome" 
      :rating="restaurante.nota" 
      :nReviews="`(${restaurante.nReviews} avaliações)`" 
      :isSaved="restaurante.isSaved" 
      class="mb-6"
      @toggleSave="handleSaveToggle"
    />
    
    <ImageGallery 
      :mainImage="restaurante.mainImage" 
      :thumbnails="restaurante.thumbnails" 
      class="mt-4 mb-8" 
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">VISÃO GERAL</h2>
        
        <GeneralInfoView :status="restaurante.status" :contactInfo="restaurante.contactInfo" />
        
        <p class="text-gray-600 my-6">
          {{ restaurante.descricaoDetalhada }}
        </p>
        
        <LocationCardView :address="restaurante.address" :mapLink="restaurante.mapLink" class="mt-6" />
        
        <div class="mt-12">
          <div class="flex justify-end items-end mb-4 border-b border-gray-200 pb-2">
            <ReviewCTA
              @requestReview="isReviewModalOpen = true" 
              primaryColor="bg-yellow-600"
            />
          </div>
          
          <RestaurantReview 
            v-model:modelValue="isReviewModalOpen"
          /> 
          
          <RatingSummary :averageRating="restaurante.nota" excellentText="Excelente" accentColor="fuchsia" />
        </div>
      </div>
      
      <div class="lg:col-span-1">
        <OpenTimeCardView 
          :hoursData="restaurante.hoursData" 
          class="bg-gray-100 p-6 rounded-xl shadow-inner" 
        />
      </div>
      
    </div>
    
    <CommentsSection class="mt-12" />
    
  </div>
  
  <div v-else class="text-center py-20 text-gray-500">
    <span v-if="route.params.id">Carregando detalhes do restaurante ID: {{ route.params.id }}...</span>
    <span v-else>ID do restaurante não encontrada ou carregamento falhou.</span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; 

// Importação dos Componentes
import HeaderInfoView from '../../components/restaurant_page/HeaderInfo.vue';
import GeneralInfoView from '../../components/restaurant_page/GeneralInfo.vue';
import LocationCardView from '../../components/restaurant_page/LocationCard.vue';
import OpenTimeCardView from '../../components/restaurant_page/OpenTimeCard.vue';
import RatingSummary from '../../components/restaurant_page/RatingSummary.vue';
import ReviewCTA from '../../components/restaurant_page/ReviewCta.vue';
import ImageGallery from '../../components/restaurant_page/ImageGallery.vue'; 
import CommentsSection from '../../components/comments/CommentsSection.vue';
import RestaurantReview from '../../components/restaurant_page/RestaurantReview.vue';


// 1. OBTENÇÃO DA ROTA E ESTADO
const route = useRoute();
const restaurante = ref({}); 

// Estado para controlar a abertura do modal de avaliação
const isReviewModalOpen = ref(false); 


// 2. DADOS DE EXEMPLO (MOCK DATA)
const mockData = {
    '1': { 
        id: 1, 
        nome: 'Sabor Oriental', 
        nota: '4,6', 
        nReviews: 120,
        descricaoDetalhada: 'Descubra a autêntica culinária japonesa no Sabor Oriental. Nossos pratos são preparados com o máximo respeito pela tradição, utilizando ingredientes frescos e técnicas milenares. De sushis e sashimis meticulosamente elaborados a pratos quentes reconfortantes, cada mordida é uma celebração dos sabores e da arte oriental. Venha desfrutar de um ambiente sereno e de um serviço impecável.',
        isSaved: false,
        mainImage: 'https://restauranteyu.com.br/wp-content/uploads/2024/05/AMBIENTE_YU5-1-scaled.jpg',
        thumbnails: [
        'https://blog.duogourmet.com.br/wp-content/uploads/2019/07/37-Duo-Gourmet-sushi.jpg',
        'https://djapa.com.br/wp-content/uploads/2022/01/melhor-restaurante-japones-de-sao-paulo.jpg',
        'https://www.construtoradubai.com.br/wp-content/uploads/2021/05/restaurante-japones-em-osasco-os-7-melhores.jpg'
        ],
        status: { text: 'ABERTO', color: 'text-green-600' },
        contactInfo: { site: '#', menu: '#', number: '14 98894-9896', mail: 'sabororiental@contato.com' },
        address: 'Rua das Flores, 123\nCentro, São Paulo - SP',
        mapLink: '#',
        hoursData: [ 
            { label: 'Segunda', hours: '11:00 - 22:00' },
            { label: 'Terça', hours: '11:00 - 22:00' },
            { label: 'Quarta', hours: 'Fechado' },
            { label: 'Quinta', hours: '11:00 - 23:00' },
            { label: 'Sexta', hours: '11:00 - 00:00' },
            { label: 'Sábado', hours: '12:00 - 00:00' },
            { label: 'Domingo', hours: '12:00 - 21:00' },
        ]
    },
    // Adicione mais mock data se necessário...
};


// 3. FUNÇÃO DE CARREGAMENTO
const carregarRestaurante = (id) => {
    const restaurantId = String(id); 
    restaurante.value = {}; // Limpa o estado
    
    const data = mockData[restaurantId];
    
    if (data) {
        // Simula um pequeno delay para carregar
        setTimeout(() => {
            restaurante.value = data;
        }, 300);
    } else {
        restaurante.value = { id: null, nome: 'Não Encontrado' }; 
        console.warn(`Dados mock para ID ${restaurantId} não encontrados. Verifique o mockData.`);
    }
};


// 4. CICLO DE VIDA E WATCHER
onMounted(() => {
    if (route.params.id) {
        carregarRestaurante(route.params.id);
    }
});

watch(
  () => route.params.id, 
  (newId) => {
    if (newId) {
      carregarRestaurante(newId);
    }
  }
);

// 5. FUNÇÕES DE INTERAÇÃO
const handleSaveToggle = () => {
    if (restaurante.value.id) {
        restaurante.value.isSaved = !restaurante.value.isSaved;
        console.log(`Restaurante ${restaurante.value.nome} salvo: ${restaurante.value.isSaved}`);
    }
};

// Não precisamos de uma função para abrir, pois o evento do ReviewCTA faz o trabalho:
// @requestReview="isReviewModalOpen = true" 

// A função de fechar é tratada pelo v-model no componente filho:
// <RestaurantReview v-model:modelValue="isReviewModalOpen" />
</script>