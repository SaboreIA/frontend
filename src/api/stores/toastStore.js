import { defineStore } from 'pinia';

let toastIdCounter = 0;
const timeoutRegistry = new Map();

const DEFAULT_DURATION = 4500;

const normalizePayload = (payload) => {
  if (typeof payload === 'string') {
    return { message: payload };
  }
  return payload || {};
};

export const useToastStore = defineStore('toast', {
  state: () => ({
    items: [],
  }),
  actions: {
    showToast(payload = {}) {
      const { title = '', message = '', type = 'info', duration = DEFAULT_DURATION } = normalizePayload(payload);
      if (!message) return null;

      const id = ++toastIdCounter;
      this.items.push({ id, title, message, type });

      if (duration !== null) {
        const timeout = setTimeout(() => {
          this.dismiss(id);
        }, duration);
        timeoutRegistry.set(id, timeout);
      }

      return id;
    },
    success(payload) {
      return this.showToast({ ...normalizePayload(payload), type: 'success' });
    },
    error(payload) {
      return this.showToast({ ...normalizePayload(payload), type: 'error', duration: 6000 });
    },
    warning(payload) {
      return this.showToast({ ...normalizePayload(payload), type: 'warning' });
    },
    info(payload) {
      return this.showToast({ ...normalizePayload(payload), type: 'info' });
    },
    dismiss(id) {
      const index = this.items.findIndex((toast) => toast.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
      if (timeoutRegistry.has(id)) {
        clearTimeout(timeoutRegistry.get(id));
        timeoutRegistry.delete(id);
      }
    },
    clearAll() {
      this.items = [];
      timeoutRegistry.forEach((timeout) => clearTimeout(timeout));
      timeoutRegistry.clear();
    },
  },
});
