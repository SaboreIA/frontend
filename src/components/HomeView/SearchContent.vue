<template>
  <div class="mt-8 max-w-xl z-20 mb-4">
    <div
      class="relative flex items-center bg-white p-2 rounded-full shadow-2xl"
    >
      <svg
        class="w-6 h-6 text-gray-400 ml-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <input
        v-model="query"
        type="text"
        placeholder="Quero comer sushi hoje, o que me recomenda?"
        class="w-full py-3 px-4 bg-transparent text-gray-700 focus:outline-none placeholder-gray-500"
        @keyup.enter="onSearch"
      />
      <button
        @click="onSearch"
        :disabled="isSearching"
        class="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <svg
          v-if="isSearching"
          class="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span :class="{ 'ml-2': isSearching }">
          {{ isSearching ? "Buscando..." : "Buscar" }}
        </span>
        <svg
          v-if="!isSearching"
          class="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  isSearching: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["search"]);
const query = ref("");

const onSearch = async () => {
  if (!query.value.trim() || props.isSearching) return;
  try {
    emit("search", query.value);
  } catch (error) {
    console.error("Erro ao emitir search:", error);
  }
};
</script>

<style scoped>
</style>
