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
        
        <LocationCardView :restaurantId="route.params.id" class="mt-6" />
        
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

import HeaderInfoView from '../../components/restaurant_page/HeaderInfo.vue';
import GeneralInfoView from '../../components/restaurant_page/GeneralInfo.vue';
import LocationCardView from '../../components/restaurant_page/LocationCard.vue';
import OpenTimeCardView from '../../components/restaurant_page/OpenTimeCard.vue';
import RatingSummary from '../../components/restaurant_page/RatingSummary.vue';
import ReviewCTA from '../../components/restaurant_page/ReviewCta.vue';
import ImageGallery from '../../components/restaurant_page/ImageGallery.vue'; 
import CommentsSection from '../../components/comments/CommentsSection.vue';
import RestaurantReview from '../../components/restaurant_page/RestaurantReview.vue';


const route = useRoute();
const restaurante = ref({}); 

const isReviewModalOpen = ref(false); 

const mockData = {
    '1': { 
        id: 1, 
        nome: 'Sabor Oriental', 
        nota: '4,6', 
        nReviews: 120,
        isSaved: false,
        mainImage: 'https://restauranteyu.com.br/wp-content/uploads/2024/05/AMBIENTE_YU5-1-scaled.jpg',
        thumbnails: [
        'https://blog.duogourmet.com.br/wp-content/uploads/2019/07/37-Duo-Gourmet-sushi.jpg',
        'https://djapa.com.br/wp-content/uploads/2022/01/melhor-restaurante-japones-de-sao-paulo.jpg',
        'https://www.construtoradubai.com.br/wp-content/uploads/2021/05/restaurante-japones-em-osasco-os-7-melhores.jpg'
        ],
        status: { text: 'ABERTO', color: 'text-green-600' },
        contactInfo: { site: '#', menu: '#', number: '14 98894-9896', mail: 'sabororiental@contato.com' },
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
};


const carregarRestaurante = (id) => {
    const restaurantId = String(id); 
    restaurante.value = {}; 
    
    const data = mockData[restaurantId];
    
    if (data) {
        setTimeout(() => {
            restaurante.value = data;
        }, 300);
    } else {
        restaurante.value = { id: null, nome: 'Não Encontrado' }; 
        console.warn(`Dados mock para ID ${restaurantId} não encontrados. Verifique o mockData.`);
    }
};


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

const handleSaveToggle = () => {
    if (restaurante.value.id) {
        restaurante.value.isSaved = !restaurante.value.isSaved;
        console.log(`Restaurante ${restaurante.value.nome} salvo: ${restaurante.value.isSaved}`);
    }
};

</script>