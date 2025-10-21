<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 1. Definição da Lista de Slides e Importação das Imagens
import italianoFundo from '@/assets/images/restaurantes/restaurante_italiano.jpg';
import macarraoPrato from '@/assets/images/restaurantes/macarrao.png';

import japonesFundo from '@/assets/images/restaurantes/restaurante_japones.png';
import sushiPrato from '@/assets/images/restaurantes/sushi.png';

import mexicanoFundo from '@/assets/images/restaurantes/restaurante_mexicano.jpg';
import burritoPrato from '@/assets/images/restaurantes/burrito.png';

import veganoFundo from '@/assets/images/restaurantes/restaurante_vegano.jpg';
import veganoPrato from '@/assets/images/restaurantes/vegan.png';

const slides = ref([
    {
        fundo: italianoFundo,
        prato: macarraoPrato,
        texto: "Comida Italiana?"
    },
    {
        fundo: japonesFundo,
        prato: sushiPrato,
        texto: "Comida Japonesa?"
    },
    {
        fundo: mexicanoFundo,
        prato: burritoPrato,
        texto: "Comida Mexicana?"
    },
    {
        fundo: veganoFundo,
        prato: veganoPrato,
        texto: "Comida Vegana?"
    }
]);

// 2. Variáveis de Controle de Slide e Animação
const currentSlideIndex = ref(0);
const displayedText = ref('');
let typingTimeout = null;

// TEMPOS AJUSTADOS
const typingSpeed = 70; // ms por caractere
const deletingSpeed = 40; // ms por caractere
const pauseTimeAfterTyping = 10000; // 10 segundos de pausa após digitar tudo
const TOTAL_SLIDE_DURATION = 10000; // 10 segundos de tempo total de visualização

// Função para calcular o tempo que as animações de texto levam
const calculateAnimationDuration = (text) => {
    const textLength = text.length;
    // (Tempo para digitar) + (Pausa após digitar) + (Tempo para deletar)
    return (textLength * typingSpeed) + pauseTimeAfterTyping + (textLength * deletingSpeed);
};

// 3. Propriedades Computadas para o Slide Atual
const currentSlide = computed(() => slides.value[currentSlideIndex.value]);

// 4. Lógica de Troca de Slide
const nextSlide = () => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length;
    displayedText.value = '';
    startTypingAnimation(currentSlide.value.texto);
};


// 5. Lógica da Animação de Digitação/Deleção
const typeText = (fullText, charIndex) => {
    if (charIndex < fullText.length) {
        displayedText.value += fullText.charAt(charIndex);
        typingTimeout = setTimeout(() => typeText(fullText, charIndex + 1), typingSpeed);
    } else {
        // Pausa após digitar tudo
        typingTimeout = setTimeout(() => startDeletingAnimation(fullText.length - 1), pauseTimeAfterTyping);
    }
};

const startDeletingAnimation = (charIndex) => {
    if (charIndex >= 0) {
        displayedText.value = displayedText.value.substring(0, charIndex);
        typingTimeout = setTimeout(() => startDeletingAnimation(charIndex - 1), deletingSpeed);
    } else {
        // *** CALCULA O TEMPO RESTANTE PARA COMPLETAR O CICLO DE 10 SEGUNDOS ***
        const animationDuration = calculateAnimationDuration(currentSlide.value.texto);
        
        // Tempo que a tela fica parada antes de chamar o próximo slide
        const remainingTime = TOTAL_SLIDE_DURATION - animationDuration;

        // Garante um delay mínimo (e que não seja negativo)
        const delay = Math.max(1500, remainingTime); // Mínimo de 1.5s de tela parada.

        // Chama o próximo slide (reiniciando o ciclo)
        typingTimeout = setTimeout(nextSlide, delay);
    }
};

const startTypingAnimation = (text) => {
    clearTimeout(typingTimeout);
    displayedText.value = '';
    typeText(text, 0);
};

// 6. Montagem e Desmontagem (Gerenciamento de Ciclo de Vida)
onMounted(() => {
    // Inicia o primeiro ciclo
    startTypingAnimation(currentSlide.value.texto);
});

onUnmounted(() => {
    clearTimeout(typingTimeout);
});
</script>

<template>
    <main class="relative w-full h-[50vh] overflow-hidden flex items-center justify-center bg-white shadow-2xl rounded-xl font-roboto">

        <div 
            :style="{ backgroundImage: 'url(' + currentSlide.fundo + ')' }"
            class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        >
            <div class="absolute inset-0 bg-yellow-900 opacity-60 backdrop-blur-sm transition-opacity duration-1000"></div>
        </div>

        <div class="relative z-10 w-full flex h-full py-8">
            
            <div class="w-full lg:w-3/5 flex flex-col justify-center px-4 lg:px-8 text-white space-y-8">
                
                <div class="absolute inset-0 bg-black opacity-70 backdrop-blur-none hidden lg:block golden-panel-width"></div>
                
                <h1 class="text-6xl lg:text-7xl font-medium tracking-tight drop-shadow-lg leading-tight z-20" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                    O que você deseja comer hoje?
                </h1>
                
                <div class="bg-white text-2xl font-bold p-3 lg:p-4 rounded-xl shadow-2xl transition duration-500 ease-in-out text-black w-fit z-20">
                    <span class="text-yellow-600">
                        {{ displayedText }}<span class="animate-pulse">|</span>
                    </span>
                </div>

                <div class="mt-8 max-w-xl z-20">
                    <div class="relative flex items-center bg-white p-2 rounded-full shadow-2xl">
                        <svg class="w-6 h-6 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <input
                            type="text"
                            placeholder="Informe um destino, hotel, restaurante, atração..."
                            class="w-full py-3 px-4 text-gray-700 focus:outline-none placeholder-gray-500"
                        />
                        <button
                            class="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                        >
                            Buscar
                            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                    
                    <div class="text-center mt-4 text-sm">
                        <a href="#" class="text-white hover:text-amber-300 transition duration-200 flex items-center justify-center">
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Perto de mim
                        </a>
                    </div>
                </div>

            </div>

            <div class="lg:w-2/5 hidden lg:flex justify-center items-center p-4 lg:p-8">
                <Transition name="prato-slide-up" mode="out-in">
                    <div 
                        :key="currentSlideIndex"
                        class="relative w-full max-w-sm rounded-xl overflow-hidden transform -rotate-6 translate-x-12 translate-y-12"
                    >
                        <img 
                            :src="currentSlide.prato" 
                            :alt="'Prato de ' + currentSlide.texto.replace('?', '')" 
                            class="w-full h-full object-contain"
                        />
                    </div>
                </Transition>
            </div>

        </div>
    </main>
</template>

<style scoped>
/* -------------------------------------------------------------------------- */
/* ESTILO DA FONTE */
/* -------------------------------------------------------------------------- */
.font-roboto {
    font-family: 'Roboto', sans-serif;
    font-weight: 700; 
}


/* -------------------------------------------------------------------------- */
/* ANIMAÇÃO DE CURSOR E BACKDROP */
/* -------------------------------------------------------------------------- */
/* Animação do cursor | piscando */
.animate-pulse {
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

/* NOVO: Ajuste de Largura para o Retângulo Dourado */
.golden-panel-width {
    width: calc(60% + 2px); 
    z-index: 10; 
}

/* Forçando um desfoque um pouco mais leve (sm) */
.backdrop-blur-sm {
    filter: blur(2px); 
}

/* -------------------------------------------------------------------------- */
/* CORREÇÃO CSS: Transição do Prato (Slide de Baixo para Cima) */
/* -------------------------------------------------------------------------- */
.prato-slide-up-enter-active {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out; 
}

.prato-slide-up-leave-active {
  transition: opacity 0.4s ease-in; /* Saída: Fade rápido */
}

.prato-slide-up-enter-from {
  opacity: 0;
  /* Garante que ele comece BEM abaixo, mantendo a inclinação (-6deg) e o descolamento horizontal (translate-x-12) */
  transform: translateX(3rem) translateY(10rem) rotate(-6deg); 
}

.prato-slide-up-leave-to {
  opacity: 0; /* Desaparece com fade */
}
</style>