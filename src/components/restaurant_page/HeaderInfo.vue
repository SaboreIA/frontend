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
            <span class="text-lg font-bold text-yellow-600">{{ restaurant.rating }}</span> 
            <span class="text-md text-gray-500">{{ restaurant.nReviews }}</span>
        </div>
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