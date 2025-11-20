<template>
  <div class="flex flex-wrap gap-3 justify-center">
    <button
      @click="$emit('filter', null)"
      :class="[
        'px-4 py-2 rounded-3xl border transition font-semibold shadow-sm text-center', 
        selected === null
          ? 'bg-amber-600 text-white border-amber-600'
          : 'bg-white text-gray-700 border-yellow-600 hover:bg-amber-600 hover:text-white'
      ]"
    >
      Todos
    </button>
    
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="$emit('filter', cat.id)"
      :class="[
        'px-4 py-2 rounded-3xl border transition font-semibold shadow-sm text-center',
        selected === cat.id
          ? 'bg-amber-600 text-white border-amber-600'
          : 'bg-white text-gray-700 border-yellow-600 hover:bg-amber-600 hover:text-white'
      ]"
    >
      {{ cat.name }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: Array,
  selected: [Number, null]
});

defineEmits(['filter']);
</script>