<template>
  <div>
    <button 
      @click="toggleChat" 
      class="fixed bottom-4 right-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full p-3 shadow-lg z-50 flex items-center justify-center hover:scale-110 transition-transform duration-200"
      aria-label="Abrir assistente"
    >
      <ChatBubbleLeftIcon class="w-6 h-6" />
    </button>

    <transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed bottom-24 right-6 bg-white rounded-xl shadow-xl w-80 z-50"
      >
        <div class="p-4 border-b font-bold text-yellow-600 flex justify-between items-center">
          Atendimento SaboreIA
          <button @click="toggleChat" class="text-gray-400 hover:text-gray-600 text-lg font-bold ml-2" aria-label="Fechar">×</button>
        </div>
        <div class="h-80 overflow-y-auto p-4 flex flex-col gap-2">
          <div v-for="(msg, idx) in chat" :key="idx" :class="msg.user ? 'text-right' : 'text-left'">
            <span class="inline-block px-3 py-2 mb-1 rounded text-sm" :class="msg.user ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'">
              {{ msg.text }}
            </span>
          </div>
          <div v-if="mostrarOpcoes" class="flex flex-col mt-2 gap-1">
            <button
              v-for="(opt, i) in opcoes"
              :key="i"
              @click="enviarPergunta(opt.key, opt.label)"
              class="bg-yellow-600 hover:bg-yellow-700 text-white font-normal rounded text-sm py-2 px-2 text-left transition-colors duration-200"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)
const mostrarOpcoes = ref(true)
const chat = ref([
  { user: false, text: "Olá! Tire suas dúvidas sobre o sistema. Clique em uma das opções abaixo:" }
])

const opcoes = ref([
  { label: "Como a IA entende minha busca?", key: "comoIAFunciona" },
  { label: "O clima influencia nas sugestões?", key: "climaInfluencia" },
  { label: "Como é feito o ranking?", key: "rankingRestaurantes" },
  { label: "Como melhorar recomendações?", key: "melhorarResultados" },
  { label: "Os horários são atualizados?", key: "horarioAtualizado" }
])

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    resetarChat()
  }
}

function resetarChat() {
  chat.value = [
    { user: false, text: "Olá! Tire suas dúvidas sobre o sistema. Clique em uma das opções abaixo:" }
  ]
  mostrarOpcoes.value = true
}

function enviarPergunta(perguntaKey, label) {
  chat.value.push({ user: true, text: label })
  mostrarOpcoes.value = false
  
  setTimeout(() => {
    let resposta = ""
    
    switch (perguntaKey) {
      case 'comoIAFunciona':
        resposta = "Nossa IA analisa palavras-chave da sua busca e cruza com avaliações, localização, clima e disponibilidade em tempo real."
        break
      case 'climaInfluencia':
        resposta = "Sim! A IA leva em conta o clima para destacar lugares mais adequados. Em dias frios, priorizamos lugares aconchegantes."
        break
      case 'rankingRestaurantes':
        resposta = "O ranking mistura avaliações reais de usuários, destaque por plano contratado e relevância conforme sua busca específica."
        break
      case 'melhorarResultados':
        resposta = "Use buscas específicas como 'para jantar romântico' ou 'aceita pets'. Sempre avalie os lugares que visitar!"
        break
      case 'horarioAtualizado':
        resposta = "Sim! Os horários são atualizados pelos parceiros. Em datas especiais, recomendamos confirmar pelo telefone."
        break
      default:
        resposta = "Desculpe, não entendi. Selecione uma das opções."
    }
    
    chat.value.push({ user: false, text: resposta })
    chat.value.push({ user: false, text: "Posso ajudar com mais alguma coisa?" })
    mostrarOpcoes.value = true
  }, 800)
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
