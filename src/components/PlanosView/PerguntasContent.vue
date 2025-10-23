<template>
  <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-10">
      Perguntas Frequentes
    </h2>

    <dl class="mt-6 space-y-6">
      <div v-for="(faq, index) in faqs" :key="index" class="pt-6 border-b border-gray-200">
        <dt class="text-lg">
          <button 
            @click="toggleFaq(index)"
            :aria-expanded="faq.open"
            class="text-left w-full flex justify-between items-start text-gray-800 focus:outline-none"
          >
            <span class="font-medium text-xl hover:text-blue-600 transition duration-150">
              {{ faq.question }}
            </span>
            <span class="ml-6 h-7 flex items-center">
              <svg 
                class="h-6 w-6 transform transition-transform duration-300" 
                :class="{ '-rotate-180 text-blue-600': faq.open, 'rotate-0 text-gray-400': !faq.open }"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </dt>
        <dd v-show="faq.open" class="mt-4 pr-12 pb-6">
          <p class="text-base text-gray-600">
            {{ faq.answer }}
          </p>
        </dd>
      </div>
    </dl>
    
    <div class="mt-10 text-center text-gray-600">
        Ainda tem dúvidas? Entre em contato com nosso <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">Suporte Dedicado</a>.
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// Definição das Perguntas e Respostas
const faqsData = [
  {
    question: "O que significa 'Deletação de Comentários' e como funciona?",
    answer: "A Deleção de Comentários permite que você remova reviews ou avaliações inadequadas do seu perfil no site. O plano BÁSICO permite 1 deleção por mês, o PREMIUM permite 5, e o VIP, 15. Isso ajuda a manter a imagem e a qualidade da sua página.",
    open: false
  },
  {
    question: "Qual a principal diferença entre os planos PREMIUM e VIP?",
    answer: "A principal diferença está no volume de uso e suporte. O plano VIP oferece Comentários Exibidos ILIMITADOS (o PREMIUM tem um limite de 250), o triplo de Comentários em Destaque (3 por vez) e um Nível de Recomendação PRIORITÁRIO em nosso algoritmo, ideal para restaurantes de alto volume.",
    open: false
  },
  {
    question: "O plano BÁSICO inclui os benefícios de 'Comentários em Destaque' e 'Suporte Dedicado'?",
    answer: "Não. O plano BÁSICO é focado nas funcionalidades essenciais de monitoramento. Os benefícios de destacar comentários (para promoção) e ter um canal de Suporte Dedicado são exclusivos dos planos PREMIUM e VIP, para clientes que buscam maior controle e atenção.",
    open: false
  },
  {
    question: "Há algum desconto na assinatura de 12 meses?",
    answer: "Sim! Oferecemos descontos significativos nas assinaturas de 3 e 12 meses em comparação com o pagamento mensal, especialmente para os planos PREMIUM e VIP. A assinatura de 12 meses é a 'Melhor Oferta' e proporciona a maior economia anual.",
    open: false
  },
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer: "Claro! Você pode fazer o upgrade (mudar para um plano superior, como de BÁSICO para PREMIUM) a qualquer momento. O valor restante do seu plano atual será proporcionalmente creditado na nova fatura. O downgrade pode ser feito após o ciclo de faturamento atual."
  }
];

// 1. Variável reativa para armazenar as FAQs
const faqs = ref(faqsData);

// 2. Função para alternar o estado de abertura da pergunta
const toggleFaq = (index) => {
  faqs.value = faqs.value.map((item, i) => {
    // Fecha todas as outras perguntas e abre apenas a clicada
    if (i === index) {
      return { ...item, open: !item.open };
    } else {
      // Opcional: Para ter apenas uma pergunta aberta por vez
      return { ...item, open: false };
    }
  });
};
</script>

<style scoped>
/* Nenhum estilo adicional é necessário, o Tailwind CSS cuida de tudo. */
</style>