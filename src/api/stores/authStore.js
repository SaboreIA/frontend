import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userName: 'Visitante',
    userEmail: null,
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    firstName: (state) => {
    if (!state.userName || state.userName === 'Visitante') return 'Visitante';
    
    const parts = state.userName.trim().split(' ');
    
    return parts[0]; 
  }
  },
  actions: {
    loginSuccess(userData) {
    this.isAuthenticated = true;
    
    this.userName = userData.name || 'Usuário'; 
    this.userEmail = userData.email || null;

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', this.userName); 
    },
    logout() {
      this.isAuthenticated = false;
      this.userName = 'Visitante';
      this.userEmail = null;
      
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userName');
    },
    initialize() {
      if (localStorage.getItem('isAuthenticated') === 'true') {
          this.isAuthenticated = true;
          this.userName = localStorage.getItem('userName') || 'Usuário';
      }
    }
  }
});