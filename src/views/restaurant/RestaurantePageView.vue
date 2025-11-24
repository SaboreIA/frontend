<template>
  <div
    v-if="restaurante.id"
    class="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-lg"
  >
    <HeaderInfoView
      :restaurant-id="restaurante.id"
      :name="restaurante.name"
      :rating="averageRating"
      :nReviews="totalReviews"
      :isSaved="isRestaurantSaved"
      :restaurantId="restaurante.id"
      @toggleSave="toggleSaveStatus"
      @restaurant-updated="handleRestaurantUpdated"
      @restaurant-deleted="handleRestaurantDeleted"
    />

    <div class="w-full mt-4 relative z-0">
      <ImageGallery
        :mainImage="restaurante.coverImageUrl"
        :thumbnails="galleryThumbnails"
        class="w-full h-full"
      />
    </div>

    <div class="mt-40 relative">
      <div class="mt-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <GeneralInfoView :restaurante="restaurante" class="pl-2"/>

            <LocationCardView
              :address="restaurante.address"
              :restaurantName="restaurante.name"
              class="mt-6"
            />
          </div>

          <div class="lg:col-span-1 order-first lg:order-none">
            <OpenTimeCardView
              :hoursData="processedHoursData"
              :status="restaurantStatus"
              class="bg-gray-100 p-6 rounded-xl shadow-inner sticky top-8"
            />
          </div>
        </div>

        <div class="mt-12">
          <div
            class="flex justify-end items-end mb-4 border-b border-gray-200 pb-2"
          >
            <ReviewCTA
              @requestReview="openReviewModal"
              :averageRating="parseFloat(averageRating)"
              :totalReviews="totalReviews"
              primaryColor="bg-yellow-600"
              @scrollToComments="scrollToComments"
            class="pr-80"/>
          </div>

          <RestaurantReview
            v-model:modelValue="isReviewModalOpen"
            :restaurantName="restaurante.name"
            :restaurantId="restaurante.id"
            :user-id="authStore.userId"
            :user-name="authStore.firstName"
            :user-photo="userPhotoUrl"
            @reviewSubmitted="handleReviewSubmitted"
          />

          <RatingSummary
            :averageRating="averageRating"
            :totalReviews="totalReviews"
            :ratingsData="ratingsDistribution"
            :excellentText="excellentText"
            :loading="loading"
          />
        </div>
      </div>
    </div>

    <div id="commentsSection" class="scroll-mt-20"></div>

    <CommentsSection
      :restaurantId="restaurante.id"
      :reviews="reviews"
      class="mt-12"
    />
  </div>

  <div v-else class="text-center py-20 text-gray-500">
    <span v-if="loading">Carregando detalhes do restaurante...</span>
    <span v-else-if="error">Erro ao carregar os dados do restaurante.</span>
    <span v-else>ID do restaurante não encontrado.</span>
    <span v-if="!loading && !error">Certifique-se de que o ID da rota é válido.</span>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/api/stores/authStore";

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
const router = useRouter();

const authStore = useAuthStore();
const restaurante = ref({});
const loading = ref(true);
const error = ref(false);
const reviews = ref([]);
const isRestaurantSaved = ref(false);
const isReviewModalOpen = ref(false);

const userPhotoUrl = computed(() => {
  return (
    authStore.user?.imageURL ||
    authStore.user?.imageUrl ||
    "https://via.placeholder.com/150/f4f4f4?text=User"
  );
});

const toggleSaveStatus = () =>
  (isRestaurantSaved.value = !isRestaurantSaved.value);

const scrollToComments = () => {
  document
    .getElementById("commentsSection")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const openReviewModal = () => {
  if (!authStore.isLoggedIn) {
    router.push({ path: "/login", query: { redirect: route.fullPath } });
    return;
  }

  if (!restaurante.value.id) return;

  isReviewModalOpen.value = true;
};

const handleReviewSubmitted = (newReview) => {
  isReviewModalOpen.value = false;
  reviews.value.unshift(newReview);
};

const carregarRestaurante = async (id) => {
  loading.value = true;
  error.value = false;

  if (!id || isNaN(id)) {
    error.value = true;
    loading.value = false;
    return;
  }

  try {
    const res = await axios.get(
      `http://localhost:5001/api/Restaurants/${id}`
    );
    restaurante.value = res.data;
    await carregarAvaliacoes(id);
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const carregarAvaliacoes = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:5001/api/review/restaurant/${id}`
    );
    reviews.value = Array.isArray(res.data.items) ? res.data.items : [];
  } catch {
    reviews.value = [];
  }
};

const totalReviews = computed(() => reviews.value.length);

const averageRating = computed(() => {
  if (totalReviews.value === 0) return "0.0";
  const total = reviews.value.reduce(
    (sum, r) => sum + (r.avgRating || 0),
    0
  );
  return (total / totalReviews.value).toFixed(1);
});

const ratingsDistribution = computed(() => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.value.forEach((r) => {
    const score = Math.min(5, Math.max(1, Math.round(r.avgRating || 0)));
    counts[score]++;
  });

  return Object.keys(counts)
    .sort((a, b) => b - a)
    .map((score) => {
      const percent = totalReviews.value
        ? ((counts[score] / totalReviews.value) * 100).toFixed(0)
        : 0;

      const labels = {
        5: "Excelente",
        4: "Muito bom",
        3: "Bom",
        2: "Razoável",
        1: "Ruim",
      };

      return { label: labels[score], percentage: `${percent}%` };
    });
});

const excellentText = computed(() => {
  const avg = parseFloat(averageRating.value);
  if (avg >= 4.5) return "Excepcional";
  if (avg >= 4.0) return "Excelente";
  if (avg >= 3.0) return "Muito bom";
  return "Médio";
});

const galleryThumbnails = computed(() => {
  const imgs = [];
  if (restaurante.value.coverImageUrl) imgs.push(restaurante.value.coverImageUrl);
  if (restaurante.value.imageUrl1) imgs.push(restaurante.value.imageUrl1);
  if (restaurante.value.imageUrl2) imgs.push(restaurante.value.imageUrl2);
  if (restaurante.value.imageUrl3) imgs.push(restaurante.value.imageUrl3);
  return imgs;
});

const JS_DAY_MAP = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

const DAYS_ORDER = [1, 2, 3, 4, 5, 6, 0];

const restaurantStatus = computed(() => {
  const r = restaurante.value;
  if (!r.openTime || !r.closeTime || r.openDay == null || r.closeDay == null)
    return { text: "HORÁRIO INDISPONÍVEL", color: "text-gray-400" };

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes =
    parseInt(r.openTime.split(":")[0]) * 60 +
    parseInt(r.openTime.split(":")[1]);
  const closeMinutes =
    parseInt(r.closeTime.split(":")[0]) * 60 +
    parseInt(r.closeTime.split(":")[1]);

  const isWorkingDay =
    r.openDay <= r.closeDay
      ? currentDay >= r.openDay && currentDay <= r.closeDay
      : currentDay >= r.openDay || currentDay <= r.closeDay;

  if (!isWorkingDay) return { text: "FECHADO", color: "text-red-600" };

  const isOpenNow =
    openMinutes < closeMinutes
      ? currentMinutes >= openMinutes && currentMinutes <= closeMinutes
      : currentMinutes >= openMinutes || currentMinutes <= closeMinutes;

  return isOpenNow
    ? { text: `ABERTO (fecha às ${r.closeTime})`, color: "text-green-600" }
    : { text: `FECHADO (abre às ${r.openTime})`, color: "text-red-600" };
});

const processedHoursData = computed(() => {
  const r = restaurante.value;
  if (!r.openTime || !r.closeTime) return [];

  return DAYS_ORDER.map((dayIndex) => {
    const isWorkingDay =
      r.openDay <= r.closeDay
        ? dayIndex >= r.openDay && dayIndex <= r.closeDay
        : dayIndex >= r.openDay || dayIndex <= r.closeDay;

    return {
      label: JS_DAY_MAP[dayIndex],
      hours: isWorkingDay ? `${r.openTime} - ${r.closeTime}` : "Fechado",
    };
  });
});

onMounted(async () => {
  const id = route.params.id;
  if (id) await carregarRestaurante(id);
});

watch(
  () => route.params.id,
  async (id, oldId) => {
    if (id && id !== oldId) await carregarRestaurante(id);
  }
);
</script>
