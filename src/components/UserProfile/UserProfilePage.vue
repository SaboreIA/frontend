<template>
  <div class="min-h-screen bg-white text-gray-800 -mt-32">
    <div class="relative">
      <!-- Banner -->
      <div
        class="h-40 bg-gray-300 md:h-64"
        :style="{
          backgroundImage:
            'url(\'https://via.placeholder.com/1200x250/ccc/aaa?text=Banner+do+Perfil\')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <div class="absolute top-4 right-4 z-10 hidden md:block">
          <button
            @click="goToEditProfile"
            class="px-4 py-2 text-xs font-semibold text-white bg-yellow-600 rounded shadow hover:bg-yellow-700 transition duration-150"
          >
            EDITAR PERFIL
          </button>
        </div>
      </div>

      <!-- Conteúdo principal -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 -mt-20">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Coluna Esquerda -->
          <div class="space-y-6">
            <!-- Avatar -->
            <div
              class="relative justify-center md:justify-start -mt-4 md:-mt-[0px]"
            >
              <div
                class="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-lg z-20 bg-gray-200"
              >
                <img
                  :src="user.profilePic"
                  alt="Foto de Perfil"
                  class="h-full w-full rounded-full object-cover"
                  style="object-position: center 30%"
                />
                <button
                  @click="goToEditProfile"
                  class="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-150 transform hover:scale-105"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Nome e cargos -->
            <div class="text-center md:text-left -mt-4">
              <h1 class="text-3xl font-bold">{{ user.name }}</h1>
              <p class="text-gray-500 mt-1">@{{ user.username }}</p>

              <div class="mt-3 justify-center md:justify-start gap-2">
                <span
                  v-for="tag in user.roles"
                  :key="tag"
                  class="px-3 py-1 text-xs font-semibold text-white rounded-full"
                  :class="{
                    'bg-purple-600': tag === 'Degustador',
                    'bg-blue-600': tag === 'Especialista',
                    'bg-cyan-600': tag === 'Crítico',
                  }"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Infos básicas -->
            <div class="space-y-3">
              <div class="flex items-center text-sm text-gray-700">
                <svg
                  class="w-4 h-4 mr-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>{{ user.city }}</span>
              </div>

              <div class="flex items-center text-sm text-gray-700">
                <svg
                  class="w-4 h-4 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h.01M12 11h.01M15 11h.01M7 16h.01M12 16h.01M15 16h.01M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6H4z"
                  ></path>
                </svg>
                <span>Entrou em {{ user.joinedDate }}</span>
              </div>
            </div>

            <!-- Estatísticas -->
            <h2 class="text-xl font-bold text-gray-800 border-b pb-2">
              ESTATÍSTICAS DE AVALIAÇÃO
            </h2>

            <div
              class="bg-white p-6 rounded-lg shadow-lg border border-gray-200 space-y-4"
            >
              <h3 class="text-lg font-semibold text-gray-800">Resumo</h3>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-center justify-between">
                  <span class="font-medium">Avaliações Feitas:</span>
                  <span class="font-bold text-red-600">{{
                    user.stats.reviewsCompleted
                  }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="font-medium">Restaurantes Favoritos:</span>
                  <span class="font-bold text-red-600">{{
                    user.stats.favoriteRestaurants
                  }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="font-medium">Média de Nota:</span>
                  <span class="flex items-center font-bold text-yellow-600">
                    {{ user.stats.averageRating.toFixed(1) }}
                    <StarIcon class="w-4 h-4 ml-1 fill-yellow-600" />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Coluna Direita: Comentários -->
          <div class="md:col-span-2 space-y-6 mt-24">
            <UserComment
              v-for="review in reviews"
              :key="review.id"
              :comment="{
                id: review.id,
                restaurantName: review.restaurantName,
                restaurantLogo: review.restaurantLogo,
                authorName: user.name,
                avatarUrl: user.profilePic,
                timestamp: review.date,
                content: review.text,
                likes: review.likes,
                globalRating: 4,
                imageUrl: review.image,
                categories: Object.entries(review.categoryRatings).map(
                  ([name, rating]) => ({
                    name,
                    rating,
                  })
                ),
              }"
            />

            <div class="text-center mt-8">
              <button
                class="px-8 py-3 text-sm font-semibold text-white bg-yellow-600 rounded shadow hover:bg-yellow-700 transition duration-150"
              >
                VER TODAS AS AVALIAÇÕES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserComment from "@/components/UserProfile/UserComment.vue";

const StarIcon = {
  props: ["filled"],
  template: `
    <svg 
      class="w-4 h-4 transition duration-150" 
      :class="{ 'fill-yellow-600': filled, 'fill-gray-300': !filled }" 
      viewBox="0 0 20 20" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.638-.921 1.938 0l1.96 6.027h6.34c.969 0 1.371 1.24.588 1.81l-5.122 3.722 1.96 6.027c.3.921-.755 1.688-1.538 1.057L10 16.025l-5.122 3.722c-.783.57-1.838-.136-1.538-1.057l1.96-6.027-5.122-3.722c-.783-.57-.381-1.81.588-1.81h6.34l1.96-6.027z"/>
    </svg>
  `,
};

export default {
  components: {
    StarIcon,
    UserComment,
  },
  data() {
    return {
      user: {
        id: 1,
        name: "John Doe",
        username: "teste1",
        roles: ["Degustador", "Especialista", "Crítico"],
        city: "Marília City",
        joinedDate: "06/10/2025",
        profilePic:
          "https://cdn.pixabay.com/photo/2020/07/01/16/04/cooking-5360172_960_720.jpg",
        stats: {
          reviewsCompleted: 45,
          favoriteRestaurants: 12,
          averageRating: 4.3,
        },
      },
      reviews: [
        {
          id: 1,
          restaurantName: "Habibs Restaurante",
          restaurantLogo:
            "https://upload.wikimedia.org/wikipedia/pt/9/94/Habib%27s_logo.png",
          date: "03/10/2025",
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          likes: 5,
          categoryRatings: {
            Categoria01: 4,
            Categoria02: 5,
            Categoria03: 3,
            Categoria04: 5,
          },
          image:
            "https://upload.wikimedia.org/wikipedia/commons/5/55/Habibs_pizza.jpg",
        },
        {
          id: 2,
          restaurantName: "Hamburgueria do Zé",
          restaurantLogo:
            "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
          date: "01/10/2025",
          text: "Os hambúrgueres são ótimos, mas o tempo de espera foi um pouco longo. Vale a pena pela qualidade dos ingredientes.",
          likes: 12,
          categoryRatings: {
            Categoria01: 3,
            Categoria02: 4,
            Categoria03: 2,
            Categoria04: 5,
          },
          image:
            "https://via.placeholder.com/300x150/f0f0f0/666?text=Imagem+do+Prato",
        },
      ],
    };
  },
  methods: {
    goToEditProfile() {
      this.$router.push({name: "painel"});
    },
  },
};
</script>
