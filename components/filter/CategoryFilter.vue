<template>
  <div class="text-center flex flex-wrap gap-3 justify-center">
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="$emit('filter', cat.id)"
      :class="[
        'text-center gap-2 px-4 py-2 rounded-3xl border transition font-semibold shadow-sm',
        selected === cat.id
          ? 'bg-yellow-600 text-white border-yellow-600'
          : 'bg-white text-gray-700 border-yellow-600 hover:bg-yellow-600',
      ]"
    >
      <component
        :is="cat.icon"
        class="w-5 h-5"
        :class="selected === cat.id ? 'text-white' : 'text-amber-600'"
      />
      {{ cat.name }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  categories: {
    type: Array,
    required: true,
  },
  selected: Number,
});

defineEmits(["filter"]);
</script>
