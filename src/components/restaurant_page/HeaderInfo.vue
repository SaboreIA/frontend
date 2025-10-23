<template>
    <div class="flex justify-between items-center mb-4">
        <div>
            <h1 class="text-4xl font-extrabold text-gray-800">{{ name }}</h1>
            
            <div class="flex items-center space-x-2 mt-1">
                <span class="text-lg font-bold text-yellow-600">{{ rating }}</span> 
                <span class="text-md text-gray-500">{{ nReviews }}</span>
            </div>
        </div>

        <button
            @click="$emit('toggleSave')"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 border-2 border-yellow-600"
            :class="isSaved ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'text-yellow-600 bg-white hover:bg-yellow-50'"
        >
            <svg v-if="isSaved" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0Z" />
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