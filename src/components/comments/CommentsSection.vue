<template>
  <div class="mt-12">
    
    <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
      Avaliações dos Clientes
    </h2>
    
    <div v-if="loading" class="text-center py-10 text-gray-500">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-3"></div>
        Carregando avaliações...
    </div>
    <div v-else-if="error" class="text-center py-10 text-red-600 bg-red-50 rounded-lg">
        Não foi possível carregar as avaliações.
    </div>

    <div v-else-if="allComments.length > 0">
      
      <CommentCard 
        v-for="c in visibleComments" 
        :key="c.id" 
        :commentId="c.id" 
        :authorName="c.authorName"
        :avatarUrl="c.avatarUrl"
        :timestamp="c.timestamp"
        :rating="c.rating"
        :content="c.content"
        :likes="c.likes"
        :imageUrl="c.imageUrl"
        :categories="c.categories"
        @toggleLike="handleToggleLike"
      />
      
      <div v-if="hasMoreComments" class="mt-8 text-center">
        <button 
          @click="loadMoreComments"
          class="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors"
        >
          Carregar Mais Avaliações ({{ allComments.length - visibleComments.length }} restantes)
        </button>
      </div>
      
    </div>
    <div v-else class="text-gray-500 italic p-4 border rounded-lg">
      Nenhuma avaliação encontrada para este restaurante. Seja o primeiro a avaliar!
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import axios from 'axios';
import CommentCard from './CommentsCard.vue';

const props = defineProps({
    restaurantId: {
        type: [String, Number],
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

const API_BASE_URL = 'http://localhost:5000/api'; 
const COMMENTS_PER_LOAD = 3;
const commentsToShow = ref(COMMENTS_PER_LOAD);

const allComments = ref([]);
const loading = ref(true);
const error = ref(false);

const getMockPhoto = (userId) => {
    const imgIndex = (userId || 1) % 50; 
    return `https://i.pravatar.cc/150?img=${imgIndex}`;
};

const getMockCategories = (rating) => {
    const baseRating = Math.max(1, Math.min(5, rating));
    return [
        { name: 'Sabor', rating: baseRating }, 
        { name: 'Atendimento', rating: Math.max(1, baseRating - 1) },
        { name: 'Ambiente', rating: baseRating },
        { name: 'Preço', rating: Math.max(1, baseRating - 1) },
    ];
};

const fetchComments = async (id) => {
    loading.value = true;
    error.value = false;
    allComments.value = [];
    commentsToShow.value = COMMENTS_PER_LOAD;

    if (!id) {
        loading.value = false;
        return;
    }
    
    try {
        const url = `${API_BASE_URL}/Review/restaurant/${id}`; 
        const response = await axios.get(url);
        
        allComments.value = response.data.map(comment => ({
            id: comment.id,
            authorName: comment.userName || 'Usuário Desconhecido',
            content: comment.comment || 'Sem conteúdo de comentário.',
            timestamp: new Date(comment.createdAt).getTime(),
            rating: comment.rating || 3,
            
            avatarUrl: getMockPhoto(comment.userId),
            likes: comment.likes || Math.floor(Math.random() * 10),
            imageUrl: comment.imageUrl || null,
            categories: getMockCategories(comment.rating || 3),
        }));

    } catch (e) {
        console.error(`Falha ao buscar avaliações para o ID ${id}:`, e);
        error.value = true;
    } finally {
        loading.value = false;
    }
};

const handleToggleLike = (commentId) => {
    console.log(`[CommentsSection] Recebido evento 'toggleLike' para o ID: ${commentId}. Implementar lógica de API/Estado aqui.`);
    
    const commentIndex = allComments.value.findIndex(c => c.id === commentId);
    if (commentIndex !== -1) {
    }
};


const visibleComments = computed(() => {
  return allComments.value.slice(0, commentsToShow.value);
});

const hasMoreComments = computed(() => {
  return commentsToShow.value < allComments.value.length;
});

const loadMoreComments = () => {
  commentsToShow.value += COMMENTS_PER_LOAD;
};


// 🚀 CICLO DE VIDA: Carregar quando o restaurantId mudar
watch(() => props.restaurantId, (newId) => {
    fetchComments(newId);
}, { immediate: true });
</script>