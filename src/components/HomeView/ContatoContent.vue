<template>
    <div class="max-w-2xl mx-auto p-8">
        <h2 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">Entre em Contato</h2>
        
        <form @submit.prevent="submitForm" class="space-y-6">
            
            <div>
                <label for="name" class="block text-base font-medium text-gray-700 mb-2">Nome Completo</label>
                <input 
                    type="text" 
                    id="name" 
                    v-model="formData.name"
                    required
                    class="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="Seu nome"
                />
            </div>

            <div>
                <label for="email" class="block text-base font-medium text-gray-700 mb-2">Endereço de Email</label>
                <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email"
                    required
                    class="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="voce@exemplo.com"
                />
            </div>

            <div>
                <label for="description" class="block text-base font-medium text-gray-700 mb-2">Descrição / Mensagem</label>
                <textarea 
                    id="description" 
                    v-model="formData.description"
                    rows="5"
                    required
                    class="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                    placeholder="Descreva sua solicitação..."
                ></textarea>
            </div>

            <div>
                <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white 
                           bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
                           transition duration-150 ease-in-out disabled:opacity-50"
                >
                    {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
                </button>
            </div>
            
            <div v-if="successMessage" class="mt-4 p-4 rounded-md bg-green-100 text-green-700 text-center text-base">
                {{ successMessage }}
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
    name: '',
    email: '',
    description: ''
});

const isSubmitting = ref(false);
const successMessage = ref('');

const submitForm = () => {
    isSubmitting.value = true;
    successMessage.value = '';

    // Simulação de envio de formulário (substitua por sua lógica de API real)
    setTimeout(() => {
        isSubmitting.value = false;
        
        if (formData.value.name && formData.value.email && formData.value.description) {
            successMessage.value = 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.';
            
            // Opcional: Resetar o formulário após sucesso
            // formData.value.name = '';
            // formData.value.email = '';
            // formData.value.description = '';
            
        } else {
            console.error("Erro ao enviar formulário: Dados incompletos.");
        }
        
    }, 2000); 
};
</script>