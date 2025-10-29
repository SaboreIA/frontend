<template>
    <div v-if="loading" class="flex justify-between items-center mb-4">
        <div class="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
    <div v-else-if="restaurant" class="flex justify-between items-center mb-4">
        <div>
            
            <h1 class="text-4xl font-extrabold text-gray-800">
                {{ restaurant.name }} 
            </h1>
        </div>
        <div class="flex items-center space-x-2 mt-1">
            <span class="text-lg font-bold text-yellow-600">{{ restaurant.rating || 'N/A'}}</span> 
            <span class="text-md text-gray-500">({{ restaurant.nReviews || 0 }} Avaliações)</span>
        </div>
        <button
            @click="$emit('toggleSave')"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 border-2 border-amber-600"
            :class="isSaved ? 'bg-amber-600 text-white hover:bg-amber-700' : 'text-amber-600 bg-white hover:bg-amber-50'"
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
import { ref, watch, defineProps, defineEmits } from 'vue';
import api from "../../api/api"; 

const props = defineProps({
    restaurantId: {
        type: [String, Number],
        required: true,
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
});

const restaurant = ref(null);
const loading = ref(true);
const error = ref(false);

const fetchRestaurant = async (id) => {
    loading.value = true;
    error.value = false;
    try {
        const response = await api.get(`/restaurants/${id}`);
        restaurant.value = response.data; 
    } catch (e) {
        error.value = true;
    } finally {
        loading.value = false;
    }
};

watch(() => props.restaurantId, (newId) => {
    fetchRestaurant(newId);
}, { immediate: true });

defineEmits(['toggleSave']);
</script>