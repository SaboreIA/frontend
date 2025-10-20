<template>
    <div>
      <!-- Ícone flutuante do chatbot -->
      <button 
        @click="toggleChat" 
        class="fixed bottom-6 right-6 bg-[#B8860B] hover:bg-yellow-700 text-white rounded-full p-4 shadow-lg z-50 flex items-center justify-center"
        aria-label="Abrir chatbot"
      >
        <!-- Usando emoji ou altere para um ícone SVG se quiser -->
        💬
      </button>
      
      <!-- Chat modal/box -->
      <transition name="fade">
        <div 
          v-if="isOpen" 
          class="fixed bottom-24 right-6 bg-white rounded-xl shadow-xl w-80 z-50"
        >
          <div class="p-4 border-b font-bold text-[#B8860B] flex justify-between items-center">
            Chatbot
            <button @click="toggleChat" class="text-gray-400 hover:text-gray-600 text-lg font-bold ml-2" aria-label="Fechar">×</button>
          </div>
          <div class="h-64 overflow-y-auto p-4">
            <div v-for="(msg, idx) in messages" :key="idx" class="mb-2" :class="msg.user ? 'text-right' : 'text-left'">
              <span class="px-3 py-1 rounded" :class="msg.user ? 'bg-[#B8860B] text-white' : 'bg-gray-200 text-gray-700'">
                {{ msg.text }}
              </span>
            </div>
          </div>
          <form @submit.prevent="sendMessage" class="p-4 flex">
            <input
              v-model="message"
              type="text"
              placeholder="Digite sua mensagem..."
              class="flex-1 px-2 py-1 border rounded-l focus:outline-none"
            />
            <button type="submit" class="bg-[#B8860B] text-white px-4 py-1 rounded-r">Enviar</button>
          </form>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const isOpen = ref(false)
  const messages = ref([{ user: false, text: "Olá! Como posso te ajudar?" }])
  const message = ref("")
  
  function toggleChat() {
    isOpen.value = !isOpen.value
  }
  function sendMessage() {
    if (message.value.trim() === "") return
    messages.value.push({ user: true, text: message.value })

    setTimeout(() => {
      messages.value.push({ user: false, text: "Mensagem recebida: " + message.value })
    }, 800)
    message.value = ""
  }
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  