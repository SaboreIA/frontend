<template>
    <div class="flex items-center space-x-4">
        <span class="text-sm font-medium text-gray-600 hover:text-amber-600 cursor-pointer transition">
            Todos os comentários
        </span>
        
        <button 
            @click="$emit('requestReview')"
            :class="[
                'px-4 py-2 rounded-lg text-sm font-bold shadow-md transition duration-150 border-2 border-transparent', 
                primaryColor === 'bg-amber-600' 
                    ? 'bg-amber-600 text-white hover:bg-amber-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300' // Alternativa
            ]"
        >
            Faça uma avaliação
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    primaryColor: {
        type: String,
        default: 'bg-amber-600' // Usa o amber como padrão de destaque
    }
});

defineEmits(['requestReview']);
</script>