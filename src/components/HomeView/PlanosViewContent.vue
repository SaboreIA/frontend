<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-extrabold text-gray-900 text-center mb-10">
        Impulsione seu Restaurante com nossos Planos
      </h2>

      <div class="grid grid-cols-3 gap-4 mb-10">
        
        <button 
          @click="selectedPlan = 'VIP'" 
          :class="[
            selectedPlan === 'VIP' ? 'bg-gray-900 text-white shadow-xl ring-4 ring-gray-400' : 'bg-gray-800 text-white hover:bg-gray-900',
            'p-4 rounded-xl transition duration-300 transform hover:scale-[1.02] text-center'
          ]">
          <span class="block text-xl font-bold">VIP</span>
          <span class="block text-sm opacity-80">Controle total e suporte dedicado</span>
        </button>

        <button 
          @click="selectedPlan = 'PREMIUM'" 
          :class="[
            selectedPlan === 'PREMIUM' ? 'bg-yellow-600 text-white shadow-xl ring-4 ring-yellow-300' : 'bg-yellow-500 text-gray-800 hover:bg-yellow-600 hover:text-white',
            'p-4 rounded-xl transition duration-300 transform hover:scale-[1.02] text-center'
          ]">
          <span class="block text-xl font-bold">PREMIUM</span>
          <span class="block text-sm opacity-90">Maximize sua visibilidade e controle</span>
        </button>

        <button 
          @click="selectedPlan = 'BASICO'" 
          :class="[
            selectedPlan === 'BASICO' ? 'bg-white text-gray-800 shadow-xl ring-4 ring-grey-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-100',
            'p-4 rounded-xl transition duration-300 transform hover:scale-[1.02] text-center'
          ]">
          <span class="block text-xl text-black font-bold">BÁSICO</span>
          <span class="block text-sm text-black">Essencial para começar a monitorar</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <div class="lg:col-span-7 flex flex-col">
            
            <div v-if="selectedPlan === 'BASICO'" class="bg-white rounded-xl shadow-lg p-6 flex-grow border border-gray-300 transition-opacity duration-500">
                <h3 class="text-3xl font-extrabold text-gray-600 mb-4 border-b-2 border-gray-200 pb-2">
                    BÁSICO
                </h3>
                <p class="text-gray-600 text-lg mb-6">Essencial para restaurantes iniciantes. Inclui:</p>
                <ul class="space-y-4">
                    <li class="flex items-center text-black font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M17 8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586M17 8L5 8"></path></svg>
                        <span>Comentários Exibidos: <span class="text-black">Até 50</span></span>
                    </li>
                    <li class="flex items-center text-black font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        <span>Deleção de Comentários: <span class="text-red-500">1 por mês</span></span>
                    </li>
                    <li class="flex items-center text-black font-bold text-lg">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.115a1 1 0 011.902 0l1.43 2.89a1 1 0 00.75.54L19 6.2a1 1 0 01.55 1.7L16.2 9.87a1 1 0 00-.34 1.05l.7 3.3a1 1 0 01-1.5 1.07l-2.7-1.42a1 1 0 00-1.1 0l-2.7 1.42a1 1 0 01-1.5-1.07l.7-3.3a1 1 0 00-.34-1.05L4.5 7.9a1 1 0 01.55-1.7l3.8-1.66a1 1 0 00.75-.54l1.43-2.89z"></path></svg>
                        <span class="italic">Comentários em Destaque (Não Incluso)</span>
                    </li>
                    <li class="flex items-center text-black font-bold text-lg">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <span class="italic">Suporte Dedicado (Não Incluso)</span>
                    </li>
                </ul>
            </div>
            
            <div v-else-if="selectedPlan === 'PREMIUM'" class="bg-white rounded-xl shadow-lg p-6 flex-grow border-4 border-yellow-600 transition-opacity duration-500">
                <h3 class="text-3xl font-extrabold text-yellow-600 mb-4 border-b-2 border-yellow-600 pb-2">
                    PREMIUM
                </h3>
                <p class="text-gray-600 text-lg mb-6">Controle Elevado para restaurantes em crescimento. Inclui:</p>
                <ul class="space-y-4">
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M17 8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586M17 8L5 8"></path></svg>
                        <span>Comentários Exibidos: <span class="text-yellow-700">Até 250</span></span>
                    </li>
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        <span>Deleção de Comentários: <span class="text-red-700">5 por mês</span></span>
                    </li>
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.115a1 1 0 011.902 0l1.43 2.89a1 1 0 00.75.54L19 6.2a1 1 0 01.55 1.7L16.2 9.87a1 1 0 00-.34 1.05l.7 3.3a1 1 0 01-1.5 1.07l-2.7-1.42a1 1 0 00-1.1 0l-2.7 1.42a1 1 0 01-1.5-1.07l.7-3.3a1 1 0 00-.34-1.05L4.5 7.9a1 1 0 01.55-1.7l3.8-1.66a1 1 0 00.75-.54l1.43-2.89z"></path></svg>
                        <span>Comentário em Destaque: <span class="text-yellow-700">1 por vez</span></span>
                    </li>
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <span>Nível de Recomendação: <span class="text-yellow-700">Elevado</span></span>
                    </li>
                </ul>
            </div>
            
            <div v-else-if="selectedPlan === 'VIP'" class="bg-white rounded-xl shadow-lg p-6 flex-grow border border-gray-800 transition-opacity duration-500">
                <h3 class="text-3xl font-extrabold text-gray-800 mb-4 border-b-2 border-gray-800 pb-2">
                    VIP
                </h3>
                <p class="text-black text-lg mb-6">Controle total e suporte prioritário. Inclui todos os benefícios Premium e:</p>
                <ul class="space-y-4">
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M17 8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586M17 8L5 8"></path></svg>
                        <span>Comentários Exibidos: <span class="text-yellow-700">Ilimitado</span></span>
                    </li>
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        <span>Deleção de Comentários: <span class="text-red-700">15 por mês</span></span>
                    </li>
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                        <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.115a1 1 0 011.902 0l1.43 2.89a1 1 0 00.75.54L19 6.2a1 1 0 01.55 1.7L16.2 9.87a1 1 0 00-.34 1.05l.7 3.3a1 1 0 01-1.5 1.07l-2.7-1.42a1 1 0 00-1.1 0l-2.7 1.42a1 1 0 01-1.5-1.07l.7-3.3a1 1 0 00-.34-1.05L4.5 7.9a1 1 0 01.55-1.7l3.8-1.66a1 1 0 00.75-.54l1.43-2.89z"></path></svg>
                        <span>Comentário em Destaque: <span class="text-yellow-700">3 por vez</span></span>
                    </li>
                    <li class="flex items-center text-gray-700 font-bold text-lg">
                            <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span>Nível de Recomendação: <span class="text-yellow-700">Prioritário</span></span>
                        </li>
                </ul>
            </div>
            
            <div class="mt-4 text-gray-600 text-sm">
                A assinatura é renovada automaticamente até ser cancelada. Consulte os <a href="#" class="text-blue-600 hover:underline">Termos e Condições</a> para mais detalhes.
            </div>
        </div>

        <div class="lg:col-span-5 flex flex-col">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">
                Escolha um plano de assinatura
            </h3>
            
            <div class="bg-gray-50 rounded-xl p-4 shadow-inner flex-grow">
                <div class="space-y-3">
                    
                    <label class="block cursor-pointer p-3 rounded-lg hover:bg-white transition duration-150 border border-transparent"
                           :class="{'bg-white  border-blue-500': selectedDuration === 1, 'bg-white text-gray-800': selectedDuration !== 1}">
                        <input type="radio" name="duracao" value="1" v-model="selectedDuration" class="form-radio text-blue-600" checked>
                        <span class="ml-3 font-semibold text-gray-800">Assinatura de 1 Mês</span>
                        <div class="ml-6 mt-1">
                            <p class="text-xl font-bold text-black">{{ formatPrice(currentPrice) }}</p>
                            <p class="text-sm text-black">Pague a cada mês. A assinatura continuará ativa até ser cancelada.</p>
                        </div>
                    </label>

                    <label class="block cursor-pointer p-3 rounded-lg hover:bg-white transition duration-150 border border-transparent"
                           :class="{'bg-white border-blue-500': selectedDuration === 3}">
                        <input type="radio" name="duracao" value="3" v-model="selectedDuration" class="form-radio text-blue-600">
                        <span class="ml-3 font-semibold text-gray-800">Assinatura de 3 meses</span>
                        <div class="ml-6 mt-1">
                            <p class="text-xl font-bold text-gray-900">{{ formatPrice(currentPrice3Months) }}</p>
                            <p v-if="selectedPlan !== 'BASICO'" class="text-xs text-green-600 font-medium mt-1">Economize {{ formatPrice(currentSavings3Months) }}</p>
                            <p class="text-sm text-black">Pague a cada 3 meses. A assinatura continuará ativa até ser cancelada.</p>
                        </div>
                    </label>
                    
                    <label class="block cursor-pointer p-3 rounded-lg hover:bg-white transition duration-150 border border-transparent"
                           :class="{'bg-white border-blue-500': selectedDuration === 12}">
                        <input type="radio" name="duracao" value="12" v-model="selectedDuration" class="form-radio text-blue-600">
                        <span class="ml-3 font-semibold text-gray-800">Assinatura de 12 meses</span>
                        <div class="ml-6 mt-1">
                            <p class="text-xl font-bold text-white-900">{{ formatPrice(currentPrice12Months) }}</p>
                            <p v-if="selectedPlan !== 'BASICO'" class="text-sm text-green-700 font-medium mt-1">Melhor Oferta! Economize {{ formatPrice(currentSavings12Months) }}</p>
                            <p class="text-sm text-black">Pague a cada 12 meses. A assinatura continuará ativa até ser cancelada.</p>
                        </div>
                    </label>
                </div>

                <div class="mt-8">
                    <button class="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 1. Variável reativa para o plano selecionado (inicia em PREMIUM)
const selectedPlan = ref('PREMIUM'); 

// 2. Variável reativa para a duração selecionada (inicia em 1 mês)
const selectedDuration = ref(1);

// 3. Estrutura de preços por plano
const prices = {
    BASICO: {
        // Essential: R$ 43,90 / R$ 114,90 / R$ 359,90 (Baseado em image_190c9a.png)
        monthly: 43.90,
        threeMonths: 114.90,
        twelveMonths: 359.90,
    },
    PREMIUM: {
        // Extra: R$ 65,90 / R$ 186,90 / R$ 592,90 (Baseado em image_190c56.png)
        monthly: 65.90,
        threeMonths: 186.90,
        twelveMonths: 592.90,
    },
    VIP: {
        // Deluxe: R$ 76,90 / R$ 219,90 / R$ 691,90 (Baseado em image_190c3a.png)
        monthly: 76.90,
        threeMonths: 219.90,
        twelveMonths: 691.90,
    }
};

// 4. Funções Computadas para obter os preços e economias do plano ATUALMENTE selecionado
const currentPlanData = computed(() => prices[selectedPlan.value]);

const currentPrice = computed(() => currentPlanData.value.monthly);
const currentPrice3Months = computed(() => currentPlanData.value.threeMonths);
const currentPrice12Months = computed(() => currentPlanData.value.twelveMonths);

// Cálculo da Economia
const currentSavings3Months = computed(() => {
    const monthlyPrice = currentPlanData.value.monthly;
    const price3Months = currentPlanData.value.threeMonths;
    return (monthlyPrice * 3) - price3Months;
});

const currentSavings12Months = computed(() => {
    const monthlyPrice = currentPlanData.value.monthly;
    const price12Months = currentPlanData.value.twelveMonths;
    return (monthlyPrice * 12) - price12Months;
});

// 5. Função de formatação de preço para Real Brasileiro
function formatPrice(value) {
    if (typeof value !== 'number') return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}
</script>

<style scoped>
/* Estilos para Radio Buttons */
.form-radio {
  /* Estilização para compatibilidade com navegadores mais antigos ou customização */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  border-width: 2px;
  border-color: theme('colors.gray.400');
}

.form-radio:checked {
  background-color: theme('colors.blue.600');
  border-color: theme('colors.blue.600');
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
}

/* Oculta o input real e usa o label para o clique */
label input[type="radio"] {
  position: absolute;
  opacity: 0;
}

/* Destaca o label (cartão de preço) quando o rádio está selecionado */
label:has(input[type="radio"]:checked) {
    background-color: theme('colors.white');
    border-color: theme('colors.blue.500');
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); /* Sombra sutil */
}
</style>