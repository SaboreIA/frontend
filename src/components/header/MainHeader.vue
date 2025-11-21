<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <router-link to="/">
          <img src="../icons/logo.png" alt="logo_SaborIA" class="w-12 h-12 object-contain">
        </router-link>
      </div>

      <nav
        v-if="showDesktopNav"
        class="hidden md:flex space-x-6"
      >
        <router-link
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150"
          @click="handleNavClick(item, $event)"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="flex items-center space-x-3">
        <button
          v-if="showMenuToggle"
          @click="toggleMobileNav"
          class="md:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition duration-150"
          :aria-expanded="isNavOpen.toString()"
          aria-controls="mobile-nav"
        >
          <svg
            v-if="!isNavOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="flex items-center space-x-3">
          <router-link
            to="/restaurantes/cadastrar"
            class="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-slate-600 font-semibold text-sm md:text-base shadow-sm hover:bg-slate-700 transition-colors duration-150 text-white"
          >
            Cadastrar Restaurante 
          </router-link>

          <router-link
            v-if="!authStore.isLoggedIn"
            to="/login"
            class="inline-flex items-center px-4 py-2 rounded-full bg-yellow-600 font-semibold text-sm md:text-base shadow-sm hover:bg-yellow-700 transition-colors duration-150 text-white"
          >
            Login
          </router-link>

          <button
            v-else
            @click="handleLogout"
            class="inline-flex items-center px-4 py-2 rounded-full bg-yellow-600 font-semibold text-sm md:text-base shadow-sm hover:bg-red-700 transition-colors duration-150 text-white"
          >
            Logout
          </button>
          
          <button
            v-if="authStore.isLoggedIn"
            @click="abrirModalEdicao"
            class="p-2 rounded-full text-yellow-600 hover:bg-gray-100 transition duration-150"
            title="Editar perfil"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>

        </div>

        <button
          @click="toggleTheme"
          :aria-label="isDarkModeEnabled ? 'Ativar modo claro' : 'Ativar modo escuro'"
          :class="[
            'relative inline-flex flex-shrink-0 h-7 w-14 border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none',
            isDarkModeEnabled ? 'bg-gray-700 border-gray-700' : 'bg-gray-200 border-gray-200'
          ]"
          :aria-checked="isDarkModeEnabled.toString()"
          role="switch"
        >
          <span class="sr-only">Toggle dark mode</span>
          <span
            :class="[
              'pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
              isDarkModeEnabled ? 'translate-x-7' : 'translate-x-0'
            ]"
          >
            <span
              :class="[
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ease-in-out duration-200',
                isDarkModeEnabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
              ]"
              aria-hidden="true"
            >
              <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.354 7.354l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <span
              :class="[
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ease-in-out duration-200',
                isDarkModeEnabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
              ]"
              aria-hidden="true"
            >
              <svg class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </div>

    <div
      v-if="showMobileNav"
      id="mobile-nav"
      class="md:hidden bg-white border-t border-gray-200"
    >
      <nav class="flex flex-col px-4 py-4 space-y-2">
        <router-link
          v-for="item in navItems"
          :key="`mobile-${item.label}`"
          :to="item.to"
          class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150"
          @click="handleMobileNavClick(item, $event)"
        >
          {{ item.label }}
        </router-link>

        <router-link
          v-if="!authStore.isLoggedIn"
          to="/login"
          class="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-full bg-yellow-600 text-white font-semibold text-base shadow-sm hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-600 transition-colors duration-150"
          @click="isNavOpen = false"
        >
          Login
        </router-link>

        <router-link
          to="/restaurantes/cadastrar"
          class="md:hidden inline-flex items-center justify-center px-4 py-2 rounded-full bg-purple-600 text-white font-semibold text-base shadow-sm hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-600 transition-colors duration-150"
          @click="isNavOpen = false"
        >
          Cadastrar Restaurante
        </router-link>
      </nav>
    </div>

    <UserModal
      v-if="mostrarModal"
      :isOpen="mostrarModal"
      :userData="authStore.user" @close="fecharModal"
      @save="salvarDadosUsuario"
    />
  </header>
</template>


<script>
import UserModal from '../userModal/UserModal.vue';
import { useAuthStore } from '@/api/stores/authStore';
import { computed } from 'vue'; 

export default {
    name: 'MainHeader',
    components: {
        UserModal
    },
    
    setup() {
        const authStore = useAuthStore();
        return { authStore }; 
    },
    
    props: {
        variant: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            isDarkModeEnabled: false,
            isUserThemeOverride: false,
            themeMediaQuery: null,
            themeTransitionTimeout: null,
            mostrarModal: false,
            dadosUsuario: null, 
            
            isNavOpen: false,
            navItems: [
                { label: 'Início', to: '/' },
                { label: 'Restaurantes', to: '/restaurantes' },
                { label: 'Sobre', to: '/sobre' },
                { label: 'Planos', to: '/planos', scrollTarget: 'planos' },
                { label: 'Contato', to: '/contato', scrollTarget: 'contato' }
            ]
        };
    },
    computed: {
        isMinimalVariant() {
            return this.variant === 'minimal';
        },
        isDashboardVariant() {
            return this.variant === 'dashboard';
        },
        showDesktopNav() {
            return !this.isMinimalVariant && !this.isDashboardVariant;
        },
        showUserGreeting() {
            return this.authStore.isLoggedIn && this.showUserActions;
        },
        showUserActions() {
            return !this.isMinimalVariant && !this.isDashboardVariant;
        },
        showMenuToggle() {
            return this.showDesktopNav;
        },
        showMobileNav() {
            return this.showMenuToggle && this.isNavOpen;
        },
    },
    watch: {
        variant() {
            this.isNavOpen = false;
        },
        '$route.path'() {
            this.isNavOpen = false;
        }
    },
    mounted() {
        this.initializeTheme();
    },
    beforeUnmount() {
        if (this.themeMediaQuery?.removeEventListener) {
            this.themeMediaQuery.removeEventListener('change', this.handleSystemThemeChange);
        } else if (this.themeMediaQuery?.removeListener) {
            this.themeMediaQuery.removeListener(this.handleSystemThemeChange);
        }
    },
    methods: {
        async handleLogout() {
            this.authStore.logout();
            
            if (this.$route.path !== '/') {
                this.$router.push('/');
            }
        },
        toggleTheme() {
            this.applyTheme(!this.isDarkModeEnabled, true, true);
        },
        initializeTheme() {
            if (typeof window === 'undefined' || typeof document === 'undefined') {
                return;
            }

            let storedTheme = null;
            try {
                storedTheme = localStorage.getItem('theme');
            } catch (error) {
                storedTheme = null;
            }

            if (storedTheme === 'dark' || storedTheme === 'light') {
                this.isUserThemeOverride = true;
                this.applyTheme(storedTheme === 'dark', false, false);
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.applyTheme(prefersDark, false, false);
            }

            this.themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (this.themeMediaQuery?.addEventListener) {
                this.themeMediaQuery.addEventListener('change', this.handleSystemThemeChange);
            } else if (this.themeMediaQuery?.addListener) {
                this.themeMediaQuery.addListener(this.handleSystemThemeChange);
            }
        },
        handleSystemThemeChange(event) {
            if (this.isUserThemeOverride) {
                return;
            }
            this.applyTheme(event.matches, false, true);
        },
        applyTheme(enableDarkMode, persist = true, withTransition = false) {
            if (typeof document === 'undefined') {
                this.isDarkModeEnabled = enableDarkMode;
                return;
            }

            this.isDarkModeEnabled = enableDarkMode;
            const root = document.documentElement;

            if (withTransition) {
                if (this.themeTransitionTimeout) {
                    clearTimeout(this.themeTransitionTimeout);
                    this.themeTransitionTimeout = null;
                }
                root.classList.add('theme-transition');
                this.themeTransitionTimeout = window.setTimeout(() => {
                    root.classList.remove('theme-transition');
                    this.themeTransitionTimeout = null;
                }, 400);
            }

            root.classList.toggle('dark', enableDarkMode);
            root.setAttribute('data-theme', enableDarkMode ? 'dark' : 'light');
            root.style.colorScheme = enableDarkMode ? 'dark' : 'light';

            if (persist) {
                this.isUserThemeOverride = true;
                try {
                    localStorage.setItem('theme', enableDarkMode ? 'dark' : 'light');
                } catch (error) {
                }
            }
        },
        abrirModalEdicao() {
            this.mostrarModal = true;
        },
        fecharModal() {
            this.mostrarModal = false;
        },
        salvarDadosUsuario(novosDados) {
            console.log('Dados recebidos do modal, assumindo que o UserModal salvou via store.');
            this.fecharModal();
        },
        toggleMobileNav() {
            if (!this.showMenuToggle) {
                return;
            }
            this.isNavOpen = !this.isNavOpen;
        },
        handleNavClick(item, event) {
            if (item.scrollTarget && this.$route.path === '/') {
                event.preventDefault();
                this.scrollToSection(item.scrollTarget);
            }
        },
        handleMobileNavClick(item, event) {
            this.handleNavClick(item, event);
            this.isNavOpen = false;
        },
        scrollToSection(sectionId) {
            if (this.$route.path !== '/') {
                this.$router.push({ path: '/', hash: `#${sectionId}` });
                return;
            }

            this.$nextTick(() => {
                const target = document.getElementById(sectionId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
};
</script>


<style scoped>
.nav-link {
  cursor: pointer;
  text-decoration: none;
}
</style>