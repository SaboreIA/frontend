<template>
    <div>
      <button 
        @click="toggleChat" 
        class="fixed bottom-4 right-4 bg-yellow-600 hover:bg-yellow-700 text-white text-2xl rounded-full p-2 shadow-lg z-50 flex items-center justify-center"
        aria-label="Abrir assistente"
      >💬
      </button>
  
      <transition name="fade">
        <div 
          v-if="isOpen" 
          class="fixed bottom-24 right-6 bg-white rounded-xl shadow-xl w-80 z-50"
        >
          <div class="p-4 border-b font-bold text-yellow-600 flex justify-between items-center">
            Dúvidas Frequentes
            <button @click="toggleChat" class="text-gray-400 hover:text-gray-600 text-lg font-bold ml-2" aria-label="Fechar">×</button>
          </div>
          <div class="p-4">
            <div v-if="!etapa">
              <button
                class="w-full mb-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm"
                @click="escolheOpcao('comoIAFunciona')"
              >
                Como a IA entende o que eu quero?
              </button>
              <button
                class="w-full mb-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm"
                @click="escolheOpcao('climaInfluencia')"
              >
                O clima realmente influencia nas sugestões?
              </button>
              <button
                class="w-full mb-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm"
                @click="escolheOpcao('rankingRestaurantes')"
              >
                Como vocês ranqueiam os restaurantes?
              </button>
              <button
                class="w-full mb-2 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm"
                @click="escolheOpcao('melhorarResultados')"
              >
                Como melhorar as recomendações?
              </button>
              <button
                class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm"
                @click="escolheOpcao('horarioAtualizado')"
              >
                Os horários estão sempre atualizados?
              </button>
            </div>
            <div v-else>
              <p class="mb-3 text-gray-800 text-sm">{{ resposta }}</p>
              <button
                class="w-full bg-gray-200 hover:bg-gray-300 text-yellow-700 py-2 rounded mt-2"
                @click="resetar"
              >
                Nova dúvida
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const isOpen = ref(false)
  const etapa = ref(null)
  const resposta = ref("")
  
  function toggleChat() {
    isOpen.value = !isOpen.value
    if (!isOpen.value) resetar()
  }
  
  function escolheOpcao(opcao) {
    etapa.value = opcao
    switch (opcao) {
      case 'comoIAFunciona':
        resposta.value = "Nossa IA analisa palavras-chave na sua busca (tipo de comida, horário, ocasião) e cruza essas informações com nosso banco de dados, levando em conta avaliações, localização, clima e disponibilidade em tempo real para sugerir a melhor opção.";
        break
      case 'climaInfluencia':
        resposta.value = "Sim! A IA considera a temperatura e condições climáticas atuais. Em dias frios, priorizamos lugares aconchegantes e sopas. Em dias quentes, destacamos ambientes climatizados ou ao ar livre com bebidas refrescantes.";
        break
      case 'rankingRestaurantes':
        resposta.value = "O ranking combina três fatores: avaliações de clientes reais, nível do plano contratado pelo estabelecimento e relevância da sua busca. Isso garante sugestões úteis sem comprometer a qualidade.";
        break
      case 'melhorarResultados':
        resposta.value = "Quanto mais específico você for na busca, melhor! Adicione detalhes como 'para jantar romântico', 'com estacionamento' ou 'aceita pets'. Também avalie os lugares que visitar — isso treina nossa IA.";
        break
      case 'horarioAtualizado':
        resposta.value = "Sim! Os restaurantes parceiros atualizam os horários diretamente no sistema, e nossa IA valida essas informações constantemente. Mas recomendamos confirmar por telefone em datas especiais ou feriados.";
        break
      default:
        resposta.value = "Selecione uma das dúvidas frequentes para saber mais.";
    }
  }
  
  function resetar() {
    etapa.value = null
    resposta.value = ""
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
  