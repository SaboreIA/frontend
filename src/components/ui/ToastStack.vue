<template>
  <teleport to="body">
    <div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto rounded-2xl border shadow-lg px-4 py-3 flex items-start gap-3"
          :class="toastClasses(toast.type)"
        >
          <div class="flex-1">
            <p v-if="toast.title" class="text-sm font-semibold">{{ toast.title }}</p>
            <p class="text-sm text-gray-700" v-html="toast.message"></p>
          </div>
          <button
            type="button"
            class="text-gray-500 hover:text-gray-700 transition"
            aria-label="Fechar notificação"
            @click="dismiss(toast.id)"
          >
            ✕
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useToastStore } from '@/api/stores/toastStore';

const toastStore = useToastStore();
const { items } = storeToRefs(toastStore);

const toasts = computed(() => items.value);

const dismiss = (id) => {
  toastStore.dismiss(id);
};

const toastClasses = (type) => {
  switch (type) {
    case 'success':
      return 'border-green-200 bg-green-50 text-green-900';
    case 'error':
      return 'border-red-200 bg-red-50 text-red-900';
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-900';
    default:
      return 'border-slate-200 bg-white text-slate-900';
  }
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(20px) skewY(1deg);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(20px) skewY(-1deg);
}
</style>
