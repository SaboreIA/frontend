<template>
  <div class="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
      
      <div class="p-6 bg-gray-50 border-b border-gray-200">
        <h3 class="text-2xl font-bold text-gray-900">
          Termos e Condições de Assinatura
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Leia atentamente antes de prosseguir com a compra.
        </p>
      </div>

      <div class="p-6 h-96 overflow-y-auto space-y-4 text-gray-700 text-sm custom-scrollbar">
        
        <h4 class="font-bold text-base text-gray-900">1. Termos Gerais e Aceitação</h4>
        <p>
          Ao assinar qualquer um dos nossos planos (Básico, Premium ou VIP), o usuário concorda integralmente com os termos e condições descritos aqui. Este contrato é efetivo na data da primeira transação e será renovado automaticamente de acordo com o ciclo de pagamento selecionado (mensal, trimestral ou anual).
        </p>

        <h4 class="font-bold text-base text-gray-900 pt-2 border-t mt-4 border-gray-100">2. Pagamento e Renovação Automática</h4>
        <p>
          O pagamento é recorrente e será cobrado no início de cada ciclo de assinatura, utilizando o método de pagamento cadastrado. Em caso de falha na cobrança, o serviço será suspenso após um período de carência de 7 (sete) dias. A renovação é automática e o preço é garantido pelo período de duração do ciclo escolhido.
        </p>

        <h4 class="font-bold text-base text-gray-900 pt-2 border-t mt-4 border-gray-100">3. Cancelamento e Políticas de Reembolso</h4>
        <p>
          O cancelamento pode ser efetuado a qualquer momento através do painel de controle do usuário. O acesso ao plano permanecerá ativo até o final do período de faturamento vigente, sem direito a reembolso proporcional por meses não utilizados. Reembolsos só serão aplicáveis em caso de falha técnica comprovada do nosso serviço que impeça a utilização total das funcionalidades por mais de 48 horas.
        </p>

        <h4 class="font-bold text-base text-gray-900 pt-2 border-t mt-4 border-gray-100">4. Limites e Benefícios Específicos dos Planos</h4>
        <ul class="list-disc pl-5 space-y-1">
            <li>**Plano BÁSICO:** Limite de 50 Comentários Exibidos e 1 Deleção de Comentário por mês. Não inclui Suporte Dedicado.</li>
            <li>**Plano PREMIUM:** Limite de 250 Comentários Exibidos, 5 Deleções por mês e 1 Comentário em Destaque.</li>
            <li>**Plano VIP:** Comentários Exibidos Ilimitados, 15 Deleções por mês, 3 Comentários em Destaque e Suporte Prioritário.</li>
        </ul>
        <p>
          A violação destas regras ou o uso indevido da plataforma, incluindo a tentativa de burlar os limites de uso, resultará na suspensão imediata da conta sem direito a reembolso.
        </p>

        <p class="pt-4 text-center text-xs italic text-gray-400">
            Última atualização: Outubro de 2025.
        </p>
      </div>

      <div class="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
        <button 
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150"
        >
          Fechar
        </button>
        <button 
          @click="$emit('accept')"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Aceito os Termos
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['accept', 'cancel']);

</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>