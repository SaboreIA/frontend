<template>
    <div class="flex justify-between items-center mb-4">
        <div>
            <h1 class="text-4xl font-extrabold text-gray-800">
                {{ name }} 
            </h1>
        </div>
        
        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 mt-1">
                <span class="text-lg font-bold text-yellow-600">{{ rating || 'N/A' }}</span> 
                <span class="text-md text-gray-500">({{ nReviews || 0 }} Avaliações)</span>
            </div>
            
            <button
                @click="$emit('toggleSave')"
                class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 border-2 border-amber-600"
                :class="isSaved ? 'bg-amber-600 text-white hover:bg-amber-700' : 'text-amber-600 bg-white hover:bg-amber-50'"
                aria-label="Salvar restaurante"
            >
                <svg v-if="isSaved" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M6 3a3 3 0 00-3 3v13.5a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm1.5 6a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0Z" />
                </svg>
                <span class="uppercase">Salvar</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({

    name: {
        type: String,
        required: true,
    },
    rating: {
        type: [Number, String],
        default: '4.5',
    },
    nReviews: {
        type: [Number, String],
        default: '120',
    },

    isSaved: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['toggleSave']);
</script>