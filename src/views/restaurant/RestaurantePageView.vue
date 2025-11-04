<template>
  <div
    v-if="restaurante.id"
    class="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-lg -mt-20"
  >
    <HeaderInfoView
      :name="restaurante.name"
      :rating="calculatedRatings.average"
      :nReviews="calculatedRatings.total"
      :isSaved="isRestaurantSaved"
      @toggleSave="toggleSaveStatus"
    />

    <ImageGallery
      :mainImage="restaurante.coverImageUrl"
      :thumbnails="galleryThumbnails"
      class="mt-4 mb-8"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <GeneralInfoView
          :status="restaurantStatus"
          :contactInfo="restaurantContactInfo"
          :description="restaurante.description"
        />

        <LocationCardView
          :address="restaurante.address"
          :restaurantName="restaurante.name"
          class="mt-6"
        />

        <div class="mt-12">
          <div
            class="flex justify-end items-end mb-4 border-b border-gray-200 pb-2"
          >
            <ReviewCTA
              @requestReview="isReviewModalOpen = true"
              primaryColor="bg-yellow-600"
            />
          </div>
          
          <RestaurantReview 
            v-model:modelValue="isReviewModalOpen"
            :restaurantNameProp="restaurante.name"
          />

          <RatingSummary
            :averageRating="calculatedRatings.average"
            :totalReviews="calculatedRatings.total"
            :ratingsData="calculatedRatings.distribution"
            :excellentText="calculatedRatings.excellentText"
          />
        </div>
      </div>

      <div class="lg:col-span-1">
        <OpenTimeCardView
          :hoursData="mockHoursData"
          class="bg-gray-100 p-6 rounded-xl shadow-inner"
        />
      </div>
    </div>

    <CommentsSection 
      :restaurantId="restaurante.id"
      class="mt-12" 
    />
  </div>

  <div v-else class="text-center py-20 text-gray-500">
    <span v-if="loading"
      >Carregando detalhes do restaurante ID: {{ route.params.id }}...</span
    >
    <span v-else-if="error">Erro ao carregar os dados do restaurante.</span>
    <span v-else>ID do restaurante não encontrada ou carregamento falhou.</span>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import HeaderInfoView from "../../components/restaurant_page/HeaderInfo.vue";
import GeneralInfoView from "../../components/restaurant_page/GeneralInfo.vue";
import LocationCardView from "../../components/restaurant_page/LocationCard.vue";
import OpenTimeCardView from "../../components/restaurant_page/OpenTimeCard.vue";
import RatingSummary from "../../components/restaurant_page/RatingSummary.vue";
import ReviewCTA from "../../components/restaurant_page/ReviewCta.vue";
import ImageGallery from "../../components/restaurant_page/ImageGallery.vue";
import CommentsSection from "../../components/comments/CommentsSection.vue";
import RestaurantReview from "../../components/restaurant_page/RestaurantReview.vue";

const route = useRoute();
const restaurantId = computed(() => route.params.id);

const loading = ref(true);
const error = ref(false);
const restaurante = ref({id: null, address: {}});
const isRestaurantSaved = ref(false);
const isReviewModalOpen = ref(false);

const toggleSaveStatus = () => {
  isRestaurantSaved.value = !isRestaurantSaved.value;
};

const mockReviews = ref([
    { id: 1, score: 5 }, { id: 2, score: 5 }, { id: 3, score: 5 },
    { id: 4, score: 4 }, { id: 5, score: 4 }, { id: 6, score: 4 },
    { id: 7, score: 3 }, { id: 8, score: 2 }, { id: 9, score: 5 },
    { id: 10, score: 5 }, { id: 11, score: 5 }, { id: 12, score: 4 },
    { id: 13, score: 5 }, { id: 14, score: 5 }, { id: 15, score: 4 },
]);

const calculatedRatings = computed(() => {
    const reviews = mockReviews.value; 
    const totalReviews = reviews.length;
    
    if (totalReviews === 0) {
        return { average: '0.0', total: 0, distribution: [], excellentText: 'Sem Avaliações' };
    }

    const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
    const average = (totalScore / totalReviews).toFixed(1);

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
        const score = Math.min(5, Math.max(1, Math.floor(review.score)));
        if (counts[score] !== undefined) counts[score]++;
    });

    const distributionMap = { 5: 'Excelente', 4: 'Muito Bom', 3: 'Bom', 2: 'Razoável', 1: 'Ruim' };

    const distributionData = Object.keys(counts).sort((a, b) => b - a).map(score => {
        const count = counts[score];
        const percentageValue = (count / totalReviews) * 100;
        
        return {
            label: distributionMap[score],
            percentage: `${percentageValue.toFixed(0)}%`,
        };
    });
    
    let excellentText;
    if (average >= 4.5) {
        excellentText = "Excepcional";
    } else if (average >= 4.0) {
        excellentText = "Excelente";
    } else if (average >= 3.0) {
        excellentText = "Muito Bom";
    } else {
        excellentText = "Médio";
    }

    return {
        average: average,
        total: totalReviews,
        distribution: distributionData,
        excellentText: excellentText
    };
});


const carregarRestaurante = async (id) => {
  if (!id) return;

  loading.value = true;
  error.value = false;
  restaurante.value = {id: null, address: {}};

  try {
    const url = `http://localhost:5001/api/Restaurants/${id}`;
    const response = await axios.get(url);

    restaurante.value = response.data;
  } catch (e) {
    console.error(`Erro ao carregar restaurante ID ${id}:`, e);
    error.value = true;
  } finally {
    loading.value = false;
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
</script>