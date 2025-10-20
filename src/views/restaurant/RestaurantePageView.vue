<template>
  <div v-if="restaurante.id" class="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-lg mt-4">
    
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
    
    <NavBar 
      :tabs="['SOBRE', 'HORÁRIO DE FUNCIONAMENTO', 'IMAGENS', 'AVALIAÇÕES']" 
      class="border-b border-gray-200 mb-6" 
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
          <div class="flex justify-between items-end mb-4 border-b border-gray-200 pb-2">
            <h2 class="text-2xl font-bold text-gray-800">Avaliações</h2>
            <ReviewCTA primaryColor="bg-amber-600" /> 
          </div>
          <RatingSummary :averageRating="restaurante.nota" excellentText="Excelente" accentColor="fuchsia" />
        </div>
      </div>
      
      <div class="lg:col-span-1">
        <OpenTimeCardView 
            :hoursData="restaurante.hoursData" 
            class="bg-gray-100 p-6 rounded-xl shadow-inner sticky top-8" 
        />
      </div>
      
    </div>
  </div>
  
  <div v-else class="text-center py-20 text-gray-500">
      <span v-if="route.params.id">Carregando detalhes do restaurante ID: {{ route.params.id }}...</span>
      <span v-else>ID do restaurante não encontrada ou carregamento falhou.</span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; 

// ⚡ IMPORTAÇÕES CORRIGIDAS: Usando './' para arquivos na mesma pasta (restaurant)
// Assumindo: HeaderInfoView.vue, GeneralInfoView.vue, etc. estão em src/views/restaurant/
import HeaderInfoView from './HeaderInfoView.vue';
import GeneralInfoView from './GeneralInfoView.vue';
import LocationCardView from './LocationCardView.vue';
import OpenTimeCardView from './OpenTimeCardView.vue';
import RatingSummary from './RatingSummaryView.vue'; // Ou RatingSummaryView.vue
import ReviewCTA from './ReviewCtaView.vue';       // Ou ReviewCTAView.vue
import ImageGallery from './ImageGalleryView.vue'; 



// 1. OBTENÇÃO DA ROTA E ESTADO
const route = useRoute();
const restaurante = ref({}); 

// 2. DADOS DE EXEMPLO (MOCK DATA)
// ⚠️ ATENÇÃO: Os dados devem estar completos e as chaves devem ser strings ('1', '2', etc.)
const mockData = {
    '1': { 
        id: 1, 
        nome: 'NOME DO RESTAURANTE', 
        nota: '4,6', 
        nReviews: 120,
        descricaoDetalhada: 'O Lorem ipsum is simply dummy text of the printing and typesetting industry. Este é um exemplo de descrição detalhada que aparecerá na Visão Geral.',
        isSaved: false,
        mainImage: 'https://via.placeholder.com/800x400?text=IMAGEM+PRINCIPAL+ID+1',
        thumbnails: ['https://via.placeholder.com/200x130?text=T1', 'https://via.placeholder.com/200x130?text=T2', 'https://via.placeholder.com/200x130?text=T3'],
        status: { text: 'ABERTO', color: 'text-green-600' },
        contactInfo: { site: '#', menu: '#', number: '11 98888-7777', mail: 'contato@email.com' },
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
    // Adicione outros restaurantes (ex: '2', '3', etc.) para testar IDs diferentes
};


// 3. FUNÇÃO DE CARREGAMENTO (SINCRONA para evitar problemas de timeout)
const carregarRestaurante = (id) => {
    const restaurantId = String(id); 
    restaurante.value = {}; 
    
    const data = mockData[restaurantId];
    
    if (data) {
        // Preenche o objeto reativo e o v-if é ativado
        restaurante.value = data;
    } else {
        // Se ID não for encontrada, o v-if (restaurante.id) continua falso
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

const handleSaveToggle = () => {
    restaurante.value.isSaved = !restaurante.value.isSaved;
};
</script>