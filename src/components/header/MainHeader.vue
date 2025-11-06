<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div
      class="container mx-auto px-4 py-3 flex items-center justify-between"
      :class="{ 'flex-wrap gap-4': isSearchVariant }"
    >
      <div class="flex items-center">
        <router-link to="/">
          <img src="../icons/logo.png" alt="logo_SaborIA" class="w-12 h-12 object-contain">
        </router-link>
      </div>

      <div v-if="isSearchVariant" class="hidden md:flex flex-1 mx-4 max-w-lg">
        <div class="relative w-full">
          <input
            type="text"
            v-model="searchTerm"
            @keyup.enter="performSearch"
            placeholder="Pesquisar restaurantes, pratos ou culinária..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition duration-150"
          />
          <button
            @click="performSearch"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>
      </div>

      <nav
        v-if="showDesktopNav && !isSearchVariant"
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
        <template v-if="isSearchVariant">
          <button
            @click="toggleMobileSearch"
            class="md:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition duration-150"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>

          <button
            @click="toggleMobileNav"
            class="md:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition duration-150"
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
        </template>

        <span v-if="showUserGreeting" class="text-sm text-gray-700 hidden lg:inline">
          Olá, {{ nomeUsuario }}
        </span>

        <template v-if="showUserActions">
          <router-link
            v-if="!usuarioLogado"
            to="/login"
            class="flex items-center p-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition duration-150"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m18-6v-1a3 3 0 00-3-3h-4"></path></svg>
            <span class="ml-2 hidden sm:inline">Login</span>
          </router-link>

          <button
            v-else
            @click="abrirModalEdicao"
            class="p-2 rounded-full text-yellow-600 hover:bg-gray-100 transition duration-150"
            title="Editar perfil"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
        </template>

        <router-link
          v-else-if="isDashboardVariant"
          to="/login"
          class="p-2 rounded-full text-amber-600 hover:bg-gray-100 transition duration-150"
          title="Meu Perfil"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </router-link>

        <button
          @click="simulateToggle"
          :class="[
            'relative inline-flex flex-shrink-0 h-7 w-14 border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none',
            isDarkModeSimulated ? 'bg-gray-700 border-gray-700' : 'bg-gray-200 border-gray-200'
          ]"
          :aria-checked="isDarkModeSimulated.toString()"
        >
          <span class="sr-only">Toggle dark mode</span>
          <span
            :class="[
              'pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
              isDarkModeSimulated ? 'translate-x-7' : 'translate-x-0'
            ]"
          >
            <span
              :class="[
                'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ease-in-out duration-200',
                isDarkModeSimulated ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
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
                isDarkModeSimulated ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
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
      v-if="isSearchVariant"
      :class="{
        'max-h-0 opacity-0': !isMobileSearchOpen && !isNavOpen && isScreenSmall,
        'max-h-screen opacity-100': isMobileSearchOpen || isNavOpen || !isScreenSmall
      }"
      class="bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden md:flex md:justify-center md:items-center py-2"
    >
      <div v-if="isMobileSearchOpen" class="px-4 w-full md:hidden">
        <div class="relative w-full">
          <input
            type="text"
            v-model="searchTerm"
            @keyup.enter="performSearch"
            placeholder="Pesquisar..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
          />
          <button
            @click="performSearch"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-600"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>
      </div>

      <nav
        :class="{
          'block px-4 pt-2 pb-4': isNavOpen,
          'hidden md:flex md:space-x-6': !isNavOpen && !isMobileSearchOpen && isScreenSmall,
          'flex': !isScreenSmall
        }"
        class="flex-wrap justify-center space-x-0 md:space-x-6 w-full max-w-5xl"
      >
        <router-link
          v-for="item in navItems"
          :key="`mobile-${item.label}`"
          :to="item.to"
          class="nav-link text-gray-700 hover:text-yellow-600 transition duration-150 block md:inline-block py-2 md:py-0"
          @click="handleMobileNavClick(item, $event)"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </div>

    <UserModal
      v-if="showUserActions"
      :isOpen="mostrarModal"
      :userData="dadosUsuario"
      @close="fecharModal"
      @save="salvarDadosUsuario"
    />
  </header>
</template>


<script>
import axios from 'axios';
import UserModal from '../userModal/UserModal.vue';

export default {
  name: 'MainHeader',
  components: {
    UserModal
  },
  props: {
    variant: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      usuarioLogado: true,
      nomeUsuario: 'Visitante',
      isDarkModeSimulated: false,
      mostrarModal: false,
      dadosUsuario: {
        nome: 'Visitante',
        email: 'visitante@exemplo.com',
        telefone: '(11) 98765-4321',
        endereco: 'Rua Exemplo, 123',
        fotoPerfil: ''
      },
      searchTerm: '',
      isMobileSearchOpen: false,
      isNavOpen: false,
      isScreenSmall: false,
      hasResizeListener: false,
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
    isSearchVariant() {
      return this.variant === 'search';
    },
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
      return this.usuarioLogado && this.showUserActions;
    },
    showUserActions() {
      return !this.isMinimalVariant && !this.isDashboardVariant;
    }
  },
  watch: {
    variant: {
      immediate: true,
      handler(newVariant) {
        if (newVariant === 'search') {
          this.enableSearchMode();
        } else {
          this.disableSearchMode();
        }
      }
    }
  },
  mounted() {
    if (this.isSearchVariant) {
      this.enableSearchMode();
    }
  },
  beforeUnmount() {
    this.disableSearchMode();
  },
  methods: {
    enableSearchMode() {
      if (this.hasResizeListener) {
        return;
      }
      this.updateScreenSize();
      window.addEventListener('resize', this.updateScreenSize);
      this.hasResizeListener = true;
    },
    disableSearchMode() {
      if (this.hasResizeListener) {
        window.removeEventListener('resize', this.updateScreenSize);
        this.hasResizeListener = false;
      }
      this.isMobileSearchOpen = false;
      this.isNavOpen = false;
    },
    updateScreenSize() {
      this.isScreenSmall = window.innerWidth < 768;
    },
    simulateToggle() {
      this.isDarkModeSimulated = !this.isDarkModeSimulated;
      console.log('Animação de Dark Mode ativada:', this.isDarkModeSimulated);
    },
    abrirModalEdicao() {
      this.mostrarModal = true;
    },
    fecharModal() {
      this.mostrarModal = false;
    },
    salvarDadosUsuario(novosDados) {
      this.dadosUsuario = { ...this.dadosUsuario, ...novosDados };
      console.log('Dados atualizados:', this.dadosUsuario);
      alert('Dados salvos com sucesso!');
    },
    toggleMobileSearch() {
      this.isMobileSearchOpen = !this.isMobileSearchOpen;
      if (this.isMobileSearchOpen) {
        this.isNavOpen = false;
      }
    },
    toggleMobileNav() {
      this.isNavOpen = !this.isNavOpen;
      if (this.isNavOpen) {
        this.isMobileSearchOpen = false;
      }
    },
    performSearch() {
      if (!this.searchTerm.trim()) {
        console.log('O campo de pesquisa está vazio.');
        return;
      }

      console.log('Termo de pesquisa:', this.searchTerm);

      axios
        .get('/api/search', {
          params: {
            q: this.searchTerm
          }
        })
        .then((response) => {
          console.log('Resultados da pesquisa:', response.data);
        })
        .catch((error) => {
          console.error('Erro na pesquisa:', error);
        })
        .finally(() => {
          if (this.isScreenSmall) {
            this.isMobileSearchOpen = false;
            this.isNavOpen = false;
          }
        });
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
      this.isMobileSearchOpen = false;
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
.router-link-active, .nav-link:focus, .nav-link:active {
  font-weight: bold;
  color: #CA8A04;
}
.nav-link {
  cursor: pointer;
  text-decoration: none;
}
</style>
