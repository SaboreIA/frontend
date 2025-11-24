<template>
  <div class="mt-12">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
      Avaliações dos Clientes ({{ reviews.length }})
    </h2>
    
    <div v-if="reviews.length > 0">
      <CommentCard 
        v-for="c in visibleComments" 
        :key="c.id || c.timestamp" :commentId="c.id" 
        :authorName="c.userName || c.authorName" :avatarUrl="c.userPhoto || getMockPhoto(c.userId)" :timestamp="c.createdAt || c.timestamp" :rating="c.avgRating"
        :content="c.comment || c.content" :likes="c.likes || 0"
        :imageUrl="c.imageUrl"
        :categories="formatCategories(c.ratings)" />

      <div v-if="hasMoreComments" class="mt-8 text-center">
        <button 
          @click="loadMoreComments"
          class="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors"
        >
          Carregar Mais Avaliações ({{ reviews.length - visibleComments.length }} restantes)
        </button>
      </div>
    </div>

    <div v-else class="text-gray-500 italic p-4 border rounded-lg">
      Nenhuma avaliação encontrada para este restaurante. Seja o primeiro a avaliar!
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import CommentCard from './CommentsCard.vue';

const props = defineProps({
  restaurantId: {
    type: [String, Number],
    required: true,
  },
  reviews: { 
    type: Array, 
    default: () => [],
    required: true, 
  },
  restaurantName: {
    type: String,
    default: 'Restaurante Desconhecido'
  },
  restaurantIconUrl: {
    type: String,
    default: '' 
  }
});

const COMMENTS_PER_LOAD = 3;
const commentsToShow = ref(COMMENTS_PER_LOAD);


const getMockPhoto = (userId) => {
  const imgIndex = (userId || 1) % 50; 
  return `https://i.pravatar.cc/150?img=${imgIndex}`;
};

const formatCategories = (ratings) => {
    if (!ratings) return [];
    
    const categoryMap = {
        comida: 'Comida',
        ambiente: 'Ambiente',
        atendimento: 'Atendimento',
        precos: 'Preços',
    };

    return Object.keys(ratings)
        .filter(key => ratings[key] !== null)
        .map(key => ({
            name: categoryMap[key] || key,
            rating: ratings[key],
        }));
};


const visibleComments = computed(() => {
  return props.reviews.slice(0, commentsToShow.value);
});

const hasMoreComments = computed(() => {
  return commentsToShow.value < props.reviews.length;
});

const loadMoreComments = () => {
  commentsToShow.value += COMMENTS_PER_LOAD;
};


const handleToggleLike = (commentId) => {
  console.log(`[CommentsSection] Like toggled for comment ID: ${commentId}`);
  const comment = props.reviews.find(c => (c.id === commentId || c.timestamp === commentId));
  if (comment) {
    comment.likes = (comment.likes || 0) + 1;
  }
};
</script>