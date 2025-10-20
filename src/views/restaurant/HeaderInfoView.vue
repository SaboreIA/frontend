<template>
    <div class="flex justify-between items-center mb-4">
        <div>
            <h1 class="text-4xl font-extrabold text-gray-900">{{ name }}</h1>
            
            <div class="flex items-center space-x-2 mt-1">
                <span class="text-lg font-bold text-amber-600">{{ rating }}</span> 
                <span class="text-md text-gray-500">{{ nReviews }}</span>
            </div>
        </div>

        <button
            @click="$emit('toggleSave')"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 border-2 border-amber-600"
            :class="isSaved ? 'bg-amber-600 text-white hover:bg-amber-700' : 'text-amber-600 bg-white hover:bg-amber-50'"
        >
            <svg v-if="isSaved" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M11.645 20.91l-.007-.003-.021-.005-.018-.005A8.257 8.257 0 019.54 20.375c-2.315-.551-4.138-1.76-5.45-3.08-1.579-1.58-2.677-3.657-2.677-5.96V6.254a4.486 4.486 0 012.39-4.148 4.606 4.606 0 012.634-.142 4.486 4.486 0 011.685.539l.215.112c.594.303 1.096.792 1.487 1.34A8.23 8.23 0 0012 5.25v15.66l-.355-.175z" />
                <path d="M12.355 20.91l.007-.003.021-.005.018-.005A8.257 8.257 0 0014.46 20.375c2.315-.551 4.138-1.76 5.45-3.08 1.579-1.58 2.677-3.657 2.677-5.96V6.254a4.486 4.486 0 00-2.39-4.148 4.606 4.606 0 00-2.634-.142 4.486 4.486 0 00-1.685.539l-.215.112c-.594.303-1.096.792-1.487 1.34A8.23 8.23 0 0112 5.25v15.66l.355-.175z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0Z" />
            </svg>
            <span class="uppercase">Salvar</span>
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    nReviews: {
        type: String,
        required: true,
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['toggleSave']);
</script>