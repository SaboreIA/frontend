<template>
  <div class="flex flex-wrap gap-3 justify-center">
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="$emit('filter', cat.id)"
      :class="[
        'flex items-center gap-2 px-4 py-2 rounded-3xl border transition font-semibold shadow-sm',
        selected === cat.id
          ? 'bg-amber-600 text-white border-amber-600'
          : 'bg-white text-gray-700 border-yellow-600 hover:bg-yellow-600'
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
import { defineProps, defineEmits } from 'vue'
import {
  FireIcon,
  StarIcon,
  TagIcon,
  BookmarkIcon,
  CalendarDaysIcon
} from '@heroicons/vue/24/solid'

defineProps({
  categories: {
    type: Array,
    required: true
  },
  selected: Number
})

defineEmits(['filter'])
</script>
