<template>
  <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100 mb-4">
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center">
        <img
          :src="avatarUrl"
          alt="Avatar"
          class="w-10 h-10 rounded-full mr-3 object-cover border border-gray-200"
        />
        <div>
          <p class="font-semibold text-gray-800 text-sm">{{ authorName }}</p>
          <p class="text-xs text-gray-500">{{ formattedDate }}</p>
        </div>
      </div>

      <div class="flex items-center text-gray-600">
        <div class="flex items-center mr-4">
          <span
            v-for="n in 5"
            :key="n"
            :class="[
              'w-3 h-3 rounded-full mr-1',
              n <= rating ? 'bg-yellow-600' : 'bg-gray-300'
            ]"
          ></span>
        </div>

        <button
          @click="toggleLike"
          class="flex items-center mr-3 transition-colors cursor-pointer"
          :class="liked ? 'text-yellow-600' : 'hover:text-yellow-600 text-gray-600'"
        >
          <component
            :is="liked ? HandThumbUpSolidIcon : HandThumbUpOutlineIcon"
            class="w-5 h-5 transition-transform duration-200"
            :class="liked ? 'scale-110' : ''"
          />
          <span class="text-sm font-medium ml-1">{{ currentLikes }}</span>
        </button>

        <EllipsisVerticalIcon class="w-5 h-5 text-gray-500 hover:text-gray-700" />
      </div>
    </div>

    <div class="text-gray-700 text-base leading-relaxed mb-4">
      <p>{{ content }}</p>
    </div>

    <div
      v-if="categories && categories.length"
      class="grid grid-cols-2 md:grid-cols-4 gap-y-3 mb-4"
    >
      <div
        v-for="(cat, index) in categories"
        :key="index"
        class="flex flex-col items-start"
      >
        <p class="text-sm font-medium text-gray-700">{{ cat.name }}</p>
        <div class="flex items-center mt-1">
          <span
            v-for="n in 5"
            :key="n"
            :class="[
              'w-3 h-3 rounded-full mr-1',
              n <= cat.rating ? 'bg-yellow-600' : 'bg-gray-300'
            ]"
          ></span>
        </div>
      </div>
    </div>

    <div v-if="imageUrl" class="mt-8 mb-2 flex justify-center">
      <img
        :src="imageUrl"
        alt="Imagem do Comentário"
        class="w-64 h-64 object-cover rounded-lg border border-gray-200"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from "vue";
import {
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline";
import { HandThumbUpIcon as HandThumbUpSolidIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  commentId: [String, Number],
  avatarUrl: {
    type: String,
    default: "https://i.pravatar.cc/150?img=1",
  },
  authorName: {
    type: String,
    default: "Usuário Anônimo",
  },
  timestamp: [String, Date],
  rating: Number,
  content: String,
  likes: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
  categories: {
    type: Array,
    default: () => [],
  },
});

const liked = ref(false);
const currentLikes = ref(props.likes);

const toggleLike = () => {
  liked.value = !liked.value;

  if (liked.value) {
    currentLikes.value++;
    localStorage.setItem(`liked_comment_${props.commentId}`, "true");
  } else {
    currentLikes.value--;
    localStorage.removeItem(`liked_comment_${props.commentId}`);
  }
};

onMounted(() => {
  if (localStorage.getItem(`liked_comment_${props.commentId}`) === "true") {
    liked.value = true;
  }
});

const formattedDate = computed(() => {
  try {
    return new Date(props.timestamp).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  } catch {
    return "Data inválida";
  }
});
</script>