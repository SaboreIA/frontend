<template>
  <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100 mb-4">
    
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center">
        <img
          :src="comment.avatarUrl"
          alt="Avatar"
          class="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
        />
        <div>
          <p class="font-semibold text-gray-800 text-sm">{{ comment.authorName }}</p>
          <p class="text-xs text-gray-500">{{ formattedDate }}</p>
        </div>
      </div>
      
      <div class="flex items-center text-gray-600">
        <div class="flex items-center mr-4">
          <span v-for="n in 5" :key="n" :class="['w-3 h-3 rounded-full mr-1', n <= comment.rating ? 'bg-yellow-600' : 'bg-gray-300']"></span>
        </div>
        
        <button 
          @click="toggleLike(comment.id)" 
          class="flex items-center mr-3 hover:text-yellow-600 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
          </svg>
          <span class="text-sm font-medium ml-1">{{ comment.likes }}</span>
        </button>
        
        <button class="text-gray-500 hover:text-gray-700">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
        </button>
      </div>
    </div>

    <div class="text-gray-700 text-base leading-relaxed mb-4">
      <p>{{ comment.content }}</p>
    </div>

    <div v-if="comment.categories && comment.categories.length" class="grid grid-cols-2 md:grid-cols-4 gap-y-3 mb-4">
      <div v-for="(cat, index) in comment.categories" :key="index" class="flex flex-col items-start">
        <p class="text-sm font-medium text-gray-700">{{ cat.name }}</p>
        <div class="flex items-center mt-1">
          <span v-for="n in 5" :key="n" :class="['w-3 h-3 rounded-full mr-1', n <= cat.rating ? 'bg-yellow-600' : 'bg-gray-300']"></span>
        </div>
      </div>
    </div>

    <div v-if="comment.imageUrl" class="mt-8 mb-2 flex justify-center">
      <img
        :src="comment.imageUrl"
        alt="Imagem do Comentário"
        class="w-64 h-64 object-cover rounded-lg border border-gray-200"
      />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
    // ... default props
  },
});

const toggleLike = (commentId) => {
    console.log(`Like/Unlike clicado no comentário ID: ${commentId}`);
};

const formattedDate = computed(() => {
  try {
    return new Date(props.comment.timestamp).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  } catch (e) {
    return 'Data inválida';
  }
});
</script>