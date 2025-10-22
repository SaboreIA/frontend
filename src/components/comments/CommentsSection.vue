<template>
  <div class="mt-12">
    
    <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
      Avaliações dos Clientes
    </h2>
    
    <div v-if="comments.length > 0">
      <CommentsCard 
        v-for="c in visibleComments" 
        :key="c.id" 
        :comment="c" 
        :restaurantIconUrl="restaurantIconUrl"
        :restaurantName="restaurantName"
      />
      
      <div v-if="hasMoreComments" class="mt-8 text-center">
        <button 
          @click="loadMoreComments"
          class="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors"
        >
          Carregar Mais Avaliações ({{ comments.length - visibleComments.length }} restantes)
        </button>
      </div>
      
    </div>
    <div v-else class="text-gray-500 italic p-4 border rounded-lg">
      Nenhuma avaliação encontrada para este restaurante. Seja o primeiro a avaliar!
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import CommentsCard from './CommentsCard.vue'; 

const COMMENTS_PER_LOAD = 3;
const commentsToShow = ref(COMMENTS_PER_LOAD);

const props = defineProps({
    restaurantName: {
        type: String,
        default: 'Restaurante Desconhecido'
    },
    restaurantIconUrl: {
        type: String,
        default: '' 
    }
});


const comments = ref([
  {
    id: 101,
    authorName: 'Jason Bourn',
    content: 'Achei o fartitos melhor',
    timestamp: new Date('2025-10-02T10:00:00').getTime(),
    avatarUrl: 'https://avatars.githubusercontent.com/u/110035910?v=4',
    likes: 5,
    rating: 4, 
    imageUrl: 'https://www.estadao.com.br/resizer/v2/7QUA26CFRBGCVI6IEGF77EQAL4.jpg?quality=80&auth=78ed2b1edb567949608499d79fe2dd43aa8e6a0997b4350b3ffadbb6a5356df0&width=720&height=410&focal=2031,1508', 

    categories: [
        { name: 'Sabor', rating: 2 }, 
        { name: 'Atendimento', rating: 3 },
        { name: 'Ambiente', rating: 3 },
        { name: 'Preço', rating: 3 },
    ],
  },
  {
    id: 102,
    authorName: 'Kurauchi the Hashira',
    content: 'Os sushis são impecáveis! O lugar é tranquilo e perfeito para um jantar a dois. Recomendo o combinado especial.',
    timestamp: new Date('2025-10-05T15:30:00').getTime(),
    avatarUrl: 'https://ae01.alicdn.com/kf/S6907414bd92f47b4b8608c4b776e159aJ.jpg',
    likes: 8,
    rating: 5,
    imageUrl: '', 

    categories: [
        { name: 'Sabor', rating: 5 }, 
        { name: 'Atendimento', rating: 5 },
        { name: 'Ambiente', rating: 4 },
        { name: 'Preço', rating: 4 },
    ],
  },

  {
    id: 103,
    authorName: 'Max Verstappen',
    content: 'A experiência foi razoável. O ambiente é bom, mas o serviço foi um pouco lento.',
    timestamp: new Date('2025-10-15T12:00:00').getTime(),
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg',
    likes: 3,
    rating: 3,
    imageUrl: '',

    categories: [
        { name: 'Sabor', rating: 3 }, 
        { name: 'Atendimento', rating: 2 },
        { name: 'Ambiente', rating: 4 },
        { name: 'Preço', rating: 3 },
    ],
  },

  {
    id: 104,
    authorName: 'Solid Snake',
    content: 'Comida excelente e pratos muito bem apresentados. Uma joia escondida na cidade!',
    timestamp: new Date('2025-10-20T19:00:00').getTime(),
    avatarUrl: 'https://preview.redd.it/kb7acy2tmha41.jpg?width=1080&crop=smart&auto=webp&s=f1eb58821bccae8082b4413959869cdec7afea24',
    likes: 15,
    rating: 5,
    imageUrl: '',

    categories: [
        { name: 'Sabor', rating: 5 }, 
        { name: 'Atendimento', rating: 5 },
        { name: 'Ambiente', rating: 5 },
        { name: 'Preço', rating: 4 },
    ],
  },
]);

const visibleComments = computed(() => {
  return comments.value.slice(0, commentsToShow.value);
});

const hasMoreComments = computed(() => {
  return commentsToShow.value < comments.value.length;
});

const loadMoreComments = () => {
  commentsToShow.value += COMMENTS_PER_LOAD;
};
</script>