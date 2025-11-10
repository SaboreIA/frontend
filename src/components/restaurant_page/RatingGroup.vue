<template>
  <div class="rating-group flex justify-between items-center">
    <label class="text-gray-700 font-medium">{{ label }}</label>
    
    <div class="flex space-x-2 rating-input-container"> 
      <div v-for="i in 5" :key="i" class="flex items-center">
        <input 
          type="radio" 
          :id="name + '-' + i" 
          :name="name + '-rating'" 
          :value="i" 
          :checked="rating === i"
          @change="$emit('update:rating', i)"
          class="rating-input peer" 
          required 
        />
        <label :for="name + '-' + i" class="rating-label">{{ i }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["label", "name", "rating"]);
defineEmits(["update:rating"]);
</script>

<style scoped>
.rating-input {
  display: none;
}
.rating-label {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;
  border: 2px solid #d1d5db;
  color: #4b5563;
  user-select: none;
}

.rating-input-container {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.rating-group input:checked + .rating-label,
.rating-group input:checked ~ input + .rating-label,
.rating-group input:hover + .rating-label,
.rating-group input:hover ~ input + .rating-label {
  background-color: #fbbf24; 
  border-color: #fbbf24;
  color: white;
  transform: scale(1.1);
}
</style>