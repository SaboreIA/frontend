<template>
  <div class="p-6 rounded-xl bg-gray-100 shadow-lg border border-gray-200">
    <h3 class="text-md pl-5 font-bold text-gray-800 mb-4">HORÁRIO DE FUNCIONAMENTO</h3>
    
    <div class="space-y-3 text-sm">
      <div v-for="day in hoursData" :key="day.label" class="flex justify-between">
        <span class="font-medium text-gray-700">{{ day.label }}</span>
        <span :class="['font-semibold', day.hours === 'Fechado' ? 'text-black' : 'text-gray-800']">
          {{ day.hours }}
        </span>
      </div>
    </div>
    
    <p class="mt-4 text-xs text-red-600 font-semibold">
      Pode variar em feriados. Ligue para confirmar.
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const hoursData = [
    { label: 'Segunda', hours: '11:00 - 22:00' },
    { label: 'Terça', hours: '11:00 - 22:00' },
    { label: 'Quarta', hours: 'Fechado' },
    { label: 'Quinta', hours: '11:00 - 23:00' },
    { label: 'Sexta', hours: '11:00 - 00:00' },
    { label: 'Sábado', hours: '12:00 - 00:00' },
    { label: 'Domingo', hours: '12:00 - 21:00' },
];

defineProps({
});
</script>