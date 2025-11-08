<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

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

const currentSlideIndex = ref(0);
const displayedText = ref('');
let typingTimeout = null;

const typingSpeed = 70; 
const deletingSpeed = 40; 
const pauseTimeAfterTyping = 10000; 
const TOTAL_SLIDE_DURATION = 10000;

const calculateAnimationDuration = (text) => {
    const textLength = text.length;
    return (textLength * typingSpeed) + pauseTimeAfterTyping + (textLength * deletingSpeed);
};

const currentSlide = computed(() => slides.value[currentSlideIndex.value]);

const nextSlide = () => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length;
    displayedText.value = '';
    startTypingAnimation(currentSlide.value.texto);
};


const typeText = (fullText, charIndex) => {
    if (charIndex < fullText.length) {
        displayedText.value += fullText.charAt(charIndex);
        typingTimeout = setTimeout(() => typeText(fullText, charIndex + 1), typingSpeed);
    } else {
        typingTimeout = setTimeout(() => startDeletingAnimation(fullText.length - 1), pauseTimeAfterTyping);
    }
};

const startDeletingAnimation = (charIndex) => {
    if (charIndex >= 0) {
        displayedText.value = displayedText.value.substring(0, charIndex);
        typingTimeout = setTimeout(() => startDeletingAnimation(charIndex - 1), deletingSpeed);
    } else {
        const animationDuration = calculateAnimationDuration(currentSlide.value.texto);
        
        const remainingTime = TOTAL_SLIDE_DURATION - animationDuration;

        const delay = Math.max(1500, remainingTime);

        typingTimeout = setTimeout(nextSlide, delay);
    }
};

const startTypingAnimation = (text) => {
    clearTimeout(typingTimeout);
    displayedText.value = '';
    typeText(text, 0);
};

onMounted(() => {
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

                <div class="mt-8 max-w-xl z-20 mb-4">
                    <div class="relative flex items-center bg-white p-2 rounded-full shadow-2xl">
                        <svg class="w-6 h-6 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <input
                            type="text"
                            placeholder="Quero comer sushi hoje, o que me recomenda?"
                            class="w-full py-3 px-4 text-gray-700 focus:outline-none placeholder-gray-500"
                        />
                        <button
                            class="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                        >
                            Buscar
                            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
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
.font-roboto {
    font-family: 'Roboto', sans-serif;
    font-weight: 700; 
}


.animate-pulse {
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.golden-panel-width {
    width: calc(60% + 2px); 
    z-index: 10; 
}

.backdrop-blur-sm {
    filter: blur(2px); 
}

.prato-slide-up-enter-active {
  transition: opacity 0.8s ease-out, transform 0.8s ease-out; 
}

.prato-slide-up-leave-active {
  transition: opacity 0.4s ease-in;
}

.prato-slide-up-enter-from {
  opacity: 0;
  transform: translateX(3rem) translateY(10rem) rotate(-6deg); 
}

.prato-slide-up-leave-to {
  opacity: 0;
}
</style>