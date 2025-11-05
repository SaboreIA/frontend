<template>
  <div class="p-6 rounded-xl bg-gray-100 shadow-lg border border-gray-200 mt-16">
    
    <section class="mb-5 border-b border-gray-300 pb-3">
      <div class="flex items-center space-x-2 pl-2">
        <div 
          :class="[
            'w-3 h-3 rounded-full flex-shrink-0',
            status.color === 'text-green-600' ? 'bg-green-600' : 'bg-red-600'
          ]"
        ></div>
        <p class="text-lg font-bold" :class="status.color">
          {{ status.text }}
        </p>
      </div>
    </section>

    <h3 class="text-md pl-1 font-bold text-gray-800 mb-4">HORÁRIO DE FUNCIONAMENTO</h3>
    
    <div v-if="hoursData && hoursData.length" class="space-y-3 text-sm">
      <div v-for="day in hoursData" :key="day.label" class="flex justify-between">
        <span class="font-medium text-gray-700 w-1/3">{{ day.label }}</span>
        <span :class="['font-semibold text-right w-2/3', day.hours.toLowerCase().includes('fechado') ? 'text-red-500' : 'text-gray-800']">
          {{ day.hours }}
        </span>
      </div>
    </div>
    
    <div v-else class="text-sm text-gray-500 text-center py-2">
        Horário de funcionamento não disponível.
    </div>
    
    <p class="mt-4 text-xs text-red-600 font-semibold">
      Pode variar em feriados. Ligue para confirmar.
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    hoursData: {
        type: Array,
        required: true,
        default: () => []
    },

    status: {
        type: Object,
        required: true,
        default: () => ({ text: 'HORÁRIO INDISPONÍVEL', color: 'text-gray-400' })
    }
});
</script>