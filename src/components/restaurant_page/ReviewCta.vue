<template>
    <div class="flex items-center space-x-4">
        <span class="text-sm font-medium text-gray-600 hover:text-yellow-600 cursor-pointer transition">
            Veja os comentários
        </span>

        <button @click="$emit('requestReview')" :class="[
            'px-4 py-2 rounded-lg text-sm font-bold shadow-md transition duration-150 border-2 border-transparent',
            primaryColor === 'bg-yellow-600'
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        ]">
            Faça uma avaliação
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    primaryColor: {
        type: String,
        default: 'bg-amber-600'
    }
});

defineEmits(['requestReview']);
</script>