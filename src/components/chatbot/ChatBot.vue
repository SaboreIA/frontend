<template>
    <div class="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg w-80 z-50">
      <div class="p-4 border-b font-bold text-[#B8860B]">Chatbot</div>
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
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const messages = ref([{ user: false, text: "Olá! Como posso te ajudar?" }])
  const message = ref("")
  
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

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #B8860B;
    border-radius: 6px;
  }
  </style>
  