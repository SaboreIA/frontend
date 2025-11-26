<template>
  <div class="max-w-4xl mx-auto -mt-12 mb-16 p-8">
    <h1 class="text-4xl text-center font-bold mb-6 text-black">Sobre Nós</h1>
    
    <h2 class="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Nossa Proposta</h2>
    <p class="text-lg text-gray-700 mb-4">
      Nosso sistema usa inteligência artificial para te ajudar a encontrar o restaurante perfeito de forma rápida e personalizada. Basta dizer o que você procura e, em segundos, mostramos as melhores opções levando em conta seu gosto, o clima e até o horário!
    </p>
    <p class="text-lg text-gray-700 mb-4">
      Comparamos desde avaliações de clientes até relevância de cada restaurante. Assim, você sempre recebe sugestões certeiras para aproveitar ótimos momentos — seja para um jantar romântico ou um encontro com amigos.
    </p>

    <div class="bg-gray-700 text-white rounded-xl p-6 mt-8 shadow-lg">
      <h2 class="text-xl text-color text-yellow-500 font-semibold mb-2">Nossa Missão</h2>
      <p>
        Ajudar usuários a encontrarem as melhores opções de gastronomia e lazer de forma rápida, segura e personalizada.
      </p>
    </div>

    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
        A Tecnologia por Trás da Solução
      </h2>

      <p class="text-lg text-gray-700 mb-6">
        Este projeto foi concebido e desenvolvido como parte da atividade Fábrica de Projetos 2025 da Unimar. Nossa arquitetura foi cuidadosamente planejada para garantir escalabilidade, performance e uma experiência de usuário fluida e moderna.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="bg-gray-700 p-6 rounded-lg shadow-md border-4 border-yellow-400 hover:border-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
          <h3 class="text-xl font-bold text-yellow-500 mb-4 border-b border-gray-600 pb-2">Front-end: UI/UX e Ferramentas</h3>
          
          <div class="flex flex-wrap justify-around items-center space-x-2 mb-4">
            <div class="tool-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png" alt="HTML5" class="w-16 h-16 object-contain rounded-lg border-2 border-yellow-600 p-1 bg-white">
              <span class="text-xs text-white block text-center mt-1">HTML5</span>
            </div>
            <div class="tool-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" alt="JavaScript" class="w-16 h-16 object-contain rounded-lg border-2 border-yellow-600 p-1 bg-white">
              <span class="text-xs text-white block text-center mt-1">JavaScript</span>
            </div>
            <div class="tool-icon">
              <img src="https://www.drupal.org/files/project-images/screenshot_361.png" alt="Tailwind CSS" class="w-16 h-16 object-contain rounded-lg border-2 border-yellow-600 p-1 bg-white">
              <span class="text-xs text-white block text-center mt-1">Tailwind</span>
            </div>
          </div>

          <ul class="space-y-3 text-white">
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold text-xl">•</span>
              <div>
                Vue.js (Composition API): Escolhemos o Vue.js pela sua reatividade e curva de aprendizado suave. O JavaScript moderno permitiu construir uma interface dinâmica e performática.
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold text-xl">•</span>
              <div>
                Tailwind CSS (Responsividade Mobile): Utilizamos este framework utilitário para acelerar o design e garantir a completa integração para versão mobile do site, assegurando que todos os componentes fossem responsivos e visualmente consistentes.
              </div>
            </li>
          </ul>
        </div>
        
        <div class="bg-gray-100 p-6 rounded-lg shadow-md border-4 border-blue-500 hover:border-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105">
          <h3 class="text-xl font-bold text-blue-700 mb-4 border-b border-gray-300 pb-2">Back-end: Serviços e Integrações</h3>
          
          <div class="flex flex-wrap justify-around items-center space-x-2 mb-4">
            <div class="tool-icon">
              <img src="https://i.namu.wiki/i/rR0JqoHBX6JAFtqYRWEFCutl8t2UvLGETvnivzsAzcUgvycs-EDmvEW9Buj8AdK36K7FelgNRzf5gZW2T7vtQA.svg" alt="C#" class="w-16 h-16 object-contain rounded-lg border-2 border-yellow-600 p-1 bg-white">
              <span class="text-xs text-gray-700 block text-center mt-1">C#</span>
            </div>
            <div class="tool-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Microsoft_.NET_logo.svg/1200px-Microsoft_.NET_logo.svg.png" alt=".NET" class="w-16 h-16 object-contain rounded-lg border-2 border-yellow-600 p-1 bg-white">
              <span class="text-xs text-gray-700 block text-center mt-1">.NET Core</span>
            </div>
            <div class="tool-icon">
              <img src="https://avatars.githubusercontent.com/u/3717923?s=280&v=4" alt="Google Maps" class="w-16 h-16 object-contain rounded-lg border-2 border-yellow-600 p-1 bg-white">
              <span class="text-xs text-gray-700 block text-center mt-1">Google Maps API</span>
            </div>
          </div>
          
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold text-xl">•</span>
              <div>
                C# e .NET Core (API RESTful): O C# proporcionou alta performance, segurança e estabilidade, sendo a base do nosso servidor.
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold text-xl">•</span>
              <div>
                Integração de Localização: Implementamos a **API do Google Maps** para exibir a localização exata dos restaurantes no mapa e calcular rotas, integrando essas informações diretamente com a nossa API proprietária.
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-yellow-600 mr-2 font-bold text-xl">•</span>
              <div>
                API Própria e IA: Nossa API desenvolvida em C# gerencia o consumo de dados de Usuários e Restaurantes, fazendo o calcúlos das lógicas necessárias.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="mt-12 border-t pt-8">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800 text-center pb-2 uppercase">
        Equipe da Fábrica de Projetos
      </h2>
      <p class="text-lg text-gray-700 mb-4">
        O desenvolvimento foi um esforço colaborativo, utilizando metodologias ágeis para garantir entregas incrementais e de alta qualidade. O time foi responsável por todo o ciclo de vida do projeto, desde a concepção da ideia até o deploy final.
      </p>


      <div>
        <img src="/src/assets/images/foto_da_equipe/foto do grupo.jpg" alt="Foto da equipe de desenvolvimento" class="max-w-xl h-auto rounded-lg shadow-xl mx-auto block object-cover mb-10"
          style="max-height: 500px; width: auto"> <!--TROCAR FOTO AQUII!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
      </div>


      <p class="text-lg text-gray-700 text-center italic">
        "O desafio da Fábrica de Projetos nos permitiu aplicar os conhecimentos de ponta em Full Stack, integrando a robustez do C# com a agilidade e modernidade do Vue.js, além de dominar a integração de APIs externas como o Google Maps."
      </p>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.tool-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
}

@media (min-width: 1024px) {
  .about {
min-height: 100vh;
display: flex;
align-items: center;
}
}
</style>