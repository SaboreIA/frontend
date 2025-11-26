<template>
    <div class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-4xl font-extrabold text-gray-900 text-center mb-4">
                Impulsione seu Restaurante com nossos Planos
            </h2>
            <p class="text-xl text-gray-600 text-center mb-12">
                Escolha o plano ideal para gerenciar sua reputação online e atrair mais clientes.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                
                <div class="bg-white rounded-xl shadow-lg transition duration-300 flex flex-col border-4 border-gray-500
                            transform hover:scale-105 hover:shadow-2xl">
                
                    <div class="bg-gray-500 p-6 text-white text-center">
                        <h3 class="text-3xl font-bold mb-1">BÁSICO</h3>
                        <p class="text-sm text-white">Essencial para começar a monitorar.</p>
                        <div class="mt-4 text-4xl font-extrabold text-yellow-500">R$ 59<span class="text-xl font-medium">/mês</span></div>
                    </div>
                    
                    <div class="p-6 flex-grow">
                        <ul class="space-y-4">
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M17 8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586M17 8L5 8"></path></svg>
                            <span>Comentários Exibidos: <span class="font-semibold">Até 50</span></span>
                                                <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </li>
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            <span>Deleção de Comentários: <span class="font-semibold">1 por mês</span></span>
                            <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </li>
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.115a1 1 0 011.902 0l1.43 2.89a1 1 0 00.75.54L19 6.2a1 1 0 01.55 1.7L16.2 9.87a1 1 0 00-.34 1.05l.7 3.3a1 1 0 01-1.5 1.07l-2.7-1.42a1 1 0 00-1.1 0l-2.7 1.42a1 1 0 01-1.5-1.07l.7-3.3a1 1 0 00-.34-1.05L4.5 7.9a1 1 0 01.55-1.7l3.8-1.66a1 1 0 00.75-.54l1.43-2.89z"></path></svg>
                            <span>Comentários em Destaque: <span class="font-semibold">Nenhum</span></span>
                        </li>
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span>Nível de Recomendação: <span class="font-semibold">Padrão</span></span>
                        </li>
                        </ul>
                    </div>
                    <div class="p-6">
                        <button class="w-full py-3 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition duration-150">
                            <router-link to="/planos">Assinar Plano Basico</router-link>                        
                        </button>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-2xl transition duration-500 flex flex-col 
                            transform hover:scale-105 border-4 border-yellow-600"> 
                    
                    <div class="bg-yellow-600 p-6 text-white text-center relative">
                        <span class="absolute top-2 -right-1 bg-red-600 text-xs font-bold px-3 py-1 rounded-bl-lg">MAIS POPULAR</span>
                        <h3 class="text-4xl font-extrabold mb-1 mt-4">PREMIUM</h3>
                        <p class="text-base font-medium opacity-90">Maximize sua visibilidade e controle!</p>
                        <div class="mt-4 text-5xl font-extrabold text-white">R$ 149<span class="text-xl font-medium">/mês</span></div>
                    </div>
                    
                    <div class="p-6 flex-grow">
                        <ul class="space-y-4">
                            <li class="flex items-center text-gray-700">
                                <svg class="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M17 8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586M17 8L5 8"></path></svg>
                                <span>Comentários Exibidos: <span class="font-semibold">Até 250</span></span>
                                <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </li>
                            <li class="flex items-center text-gray-700">
                                <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                <span>Deleção de Comentários: <span class="font-semibold">5 por mês</span></span>
                                <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </li>
                            <li class="flex items-center text-gray-700">
                                <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.115a1 1 0 011.902 0l1.43 2.89a1 1 0 00.75.54L19 6.2a1 1 0 01.55 1.7L16.2 9.87a1 1 0 00-.34 1.05l.7 3.3a1 1 0 01-1.5 1.07l-2.7-1.42a1 1 0 00-1.1 0l-2.7 1.42a1 1 0 01-1.5-1.07l.7-3.3a1 1 0 00-.34-1.05L4.5 7.9a1 1 0 01.55-1.7l3.8-1.66a1 1 0 00.75-.54l1.43-2.89z"></path></svg>
                                <span>Comentários em Destaque: <span class="font-semibold">1 por vez</span></span>
                                <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </li>
                            <li class="flex items-center text-gray-700">
                                <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                <span>Nível de Recomendação: <span class="font-semibold">Elevado</span></span>
                                <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </li>
                        </ul>
                    </div>
                    <div class="p-6">
                        <button class="w-full py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition duration-150 shadow-md">
                            <router-link to="/planos">Assinar Plano Premium</router-link>                        
                        </button>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg transition duration-300 flex flex-col 
                            transform hover:scale-105 hover:shadow-2xl border-4 border-gray-800">
                
                    <div class="bg-gray-800 p-6 text-white text-center">
                        <h3 class="text-3xl font-bold mb-1">VIP</h3>
                        <p class="text-sm opacity-80">Controle total e suporte prioritário.</p>
                        <div class="mt-4 text-4xl font-extrabold text-yellow-500">R$ 299<span class="text-xl font-medium">/mês</span></div>
                    </div>
                    
                    <div class="p-6 flex-grow">
                        <ul class="space-y-4">
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M17 8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586M17 8L5 8"></path></svg>
                            <span>Comentários Exibidos: <span class="font-semibold">Ilimitado</span></span>
                            <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </li>
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            <span>Deleção de Comentários: <span class="font-semibold">15 por mês</span></span>
                            <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </li>
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.115a1 1 0 011.902 0l1.43 2.89a1 1 0 00.75.54L19 6.2a1 1 0 01.55 1.7L16.2 9.87a1 1 0 00-.34 1.05l.7 3.3a1 1 0 01-1.5 1.07l-2.7-1.42a1 1 0 00-1.1 0l-2.7 1.42a1 1 0 01-1.5-1.07l.7-3.3a1 1 0 00-.34-1.05L4.5 7.9a1 1 0 01.55-1.7l3.8-1.66a1 1 0 00.75-.54l1.43-2.89z"></path></svg>
                            <span>Comentários em Destaque: <span class="font-semibold">3 por vez</span></span>
                            <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </li>
                        <li class="flex items-center text-gray-700">
                            <svg class="w-6 h-6 mr-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span>Nível de Recomendação: <span class="font-semibold">Prioritário</span></span>
                            <svg class="w-5 h-5 ml-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </li>
                        </ul>
                    </div>
                    <div class="p-6">
                        <button class="w-full py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition duration-150 shadow-md">
                            <router-link to="/planos">Assinar Plano VIP</router-link>

                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>