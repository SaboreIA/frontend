<template>
  <footer class="bg-white text-[#2c3e50] border-t border-gray-200 shadow-sm p-8 md:p-10 font-sans">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-20 max-w-6xl mx-auto mb-8 items-start">
      
      <!-- SOBRE -->
      <div>
        <h3 class="text-lg font-bold mb-5 text-yellow-600">SOBRE A SABOREIA</h3>
        <p class="text-gray-700 text-sm leading-relaxed">
          SaboreIA oferece as melhores recomendações de restaurantes com base em inteligência artificial, pensando sempre na sua experiência gastronômica perfeita.
        </p>
      </div>

      <!-- CONTATOS -->
      <div>
        <h3 class="text-lg font-bold mb-5 text-yellow-600">CONTATOS</h3>
        <ul class="list-none p-0 m-0">
          <li class="mb-3">
            <a href="mailto:saboria@gmail.com" class="text-gray-700 text-sm hover:text-[#ff9800] transition duration-300">
              saboria@gmail.com
            </a>
          </li>
          <li class="mb-3">
            <a href="tel:+5514989224922" class="text-gray-700 text-sm hover:text-[#ff9800] transition duration-300">
              (14) 98922-4922
            </a>
          </li>
          <li class="flex space-x-4 mt-5">
            <a href="#" aria-label="Facebook" class="text-gray-400 hover:text-[#ff9800] transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" class="text-gray-400 hover:text-[#ff9800] transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <!-- POLÍTICAS DO SITE -->
      <div>
        <h3 class="text-lg font-bold mb-5 text-yellow-600">POLÍTICAS DO SITE</h3>
        <ul class="list-none p-0 m-0">
          <li class="mb-3"><a href="#" class="text-gray-700 text-sm hover:text-[#ff9800] transition duration-300">Política de Privacidade</a></li>
          <li class="mb-3"><a href="#" class="text-gray-700 text-sm hover:text-[#ff9800] transition duration-300">Termos de Uso</a></li>
          <li class="mb-3"><a href="#" class="text-gray-700 text-sm hover:text-[#ff9800] transition duration-300">Trocas e Devoluções</a></li>
        </ul>
      </div>
      
    </div>
    
    <div class="text-center pt-5 border-t border-gray-100">
        <p class="text-gray-500 text-xs">
            &copy; {{ new Date().getFullYear() }} MeuApp. Todos os direitos reservados.
        </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
</style>
