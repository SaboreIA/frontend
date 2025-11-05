<template>
  <div class="mt-6 flex flex-col md:flex-row gap-8 items-start">
    
    <div v-if="loading" class="text-center pr-8 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0">
        <p class="text-4xl font-extrabold text-gray-900">...</p>
        <p class="text-sm font-semibold mt-1 text-yellow-600">Carregando</p> 
        <p class="text-xs text-gray-500 mt-1">Buscando avaliações...</p>
    </div>

    <div v-else-if="totalReviews > 0" class="flex-shrink-0 text-center pr-8 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0">
      <p class="text-4xl font-extrabold text-gray-900">{{ averageRating.toFixed(1) }}</p>
      <p class="text-sm font-semibold mt-1 text-yellow-600">{{ excellentText }}</p> 
      <p class="text-xs text-gray-500 mt-1">Baseado em {{ totalReviews }} avaliações</p>
    </div>
    
    <div v-if="totalReviews > 0" class="flex-grow w-full">
      <h4 class="text-sm font-semibold text-gray-700 mb-3 uppercase">Média por Categoria</h4>
      
      <div v-for="rating in ratingsData" :key="rating.label" class="flex items-center space-x-2 mb-2">
        
        <span class="text-xs font-medium text-gray-600 w-24 text-right">{{ rating.label }}</span>
        
        <div class="flex-grow bg-gray-200 rounded-full h-2">
          <div 
            :class="[
                'h-2 rounded-full transition-all duration-500', 
                'bg-yellow-500'
            ]"
            :style="{ width: rating.percentage }"
          ></div>
        </div>
        
        <span class="text-xs text-gray-500 w-16 text-left">{{ rating.average.toFixed(1) }} / 5</span>
      </div>
    </div>
    <div v-else-if="!loading" class="text-gray-500 italic">
        Ainda não há avaliações para exibir as estatísticas.
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 1. Defina um mapeamento para os nomes das categorias
const CATEGORY_MAP = {
    rating1: 'Sabor',
    rating2: 'Atendimento',
    rating3: 'Ambiente',
    rating4: 'Preço',
};
const categoryKeys = Object.keys(CATEGORY_MAP); // ['rating1', 'rating2', 'rating3', 'rating4']

// Estado
const reviews = ref([]);
const loading = ref(true);

// Simulação de API
async function fetchReviewsData() {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dados de simulação com MÚLTIPLAS avaliações e as 4 categorias
    reviews.value = [
        // avgRating pode ser ignorado na média geral, se for recalculada
        { avgRating: 4.0, rating1: 5, rating2: 4, rating3: 5, rating4: 2 }, 
        { avgRating: 4.5, rating1: 5, rating2: 5, rating3: 4, rating4: 4 }, 
        { avgRating: 3.5, rating1: 3, rating2: 4, rating3: 3, rating4: 4 }, 
        { avgRating: 5.0, rating1: 5, rating2: 5, rating3: 5, rating4: 5 }, 
        { avgRating: 3.0, rating1: 2, rating2: 3, rating3: 3, rating4: 4 }, 
    ];
    
    loading.value = false;
}

// 3. Cálculos de Estatísticas

// Total de avaliações
const totalReviews = computed(() => reviews.value.length);

// Média da Nota GERAL (RECALCULADA A PARTIR DE TODAS AS CATEGORIAS)
const averageRating = computed(() => {
    if (totalReviews.value === 0) return 0;

    let totalSum = 0;
    const totalPossibleRatings = totalReviews.value * categoryKeys.length; // Ex: 5 reviews * 4 categorias = 20 notas

    reviews.value.forEach(review => {
        categoryKeys.forEach(key => {
            // Soma todas as notas de todas as categorias
            if (review[key] && typeof review[key] === 'number') {
                totalSum += review[key];
            }
        });
    });

    return totalSum / totalPossibleRatings;
});

// Texto para a nota média
const excellentText = computed(() => {
    const avg = averageRating.value;
    if (avg >= 4.5) return 'Excelente';
    if (avg >= 3.5) return 'Muito Bom';
    if (avg >= 2.5) return 'Bom';
    if (avg >= 1.5) return 'Regular';
    return 'Ruim';
});

// Distribuição da Nota POR CATEGORIA (Médias Individuais para as Barras)
const ratingsData = computed(() => {
    if (totalReviews.value === 0) return [];

    const results = [];

    // 1. Acumular a soma das notas de cada categoria
    const categoryTotals = categoryKeys.reduce((acc, key) => {
        acc[key] = 0;
        return acc;
    }, {});

    reviews.value.forEach(review => {
        categoryKeys.forEach(key => {
            if (review[key] && typeof review[key] === 'number') {
                categoryTotals[key] += review[key];
            }
        });
    });

    // 2. Calcular a Média e a Porcentagem para cada categoria
    categoryKeys.forEach(key => {
        const total = categoryTotals[key];
        const average = total / totalReviews.value;
        
        // Calcula o percentual em relação à nota máxima (5) para a barra de progresso
        const percentage = (average / 5) * 100;

        results.push({
            label: CATEGORY_MAP[key], // Ex: 'Sabor'
            average: average,
            percentage: `${percentage.toFixed(0)}%`, // Ex: '90%'
        });
    });

    return results;
});

onMounted(() => {
    fetchReviewsData();
});
</script>