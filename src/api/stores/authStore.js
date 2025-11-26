import { defineStore } from 'pinia';
import { fetchUserProfile, updateProfile as apiUpdateProfile} from '@/api/services/profileService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null, 
    }),
    
    getters: {
        isLoggedIn: (state) => !!state.token && !!state.user?.id, 
        
        userId: (state) => state.user?.id, 
        
        userName: (state) => state.user?.name || 'Visitante',
         
        firstName: (state) => {
            const name = state.user?.name;
            if (!name) return 'Visitante';
            const parts = name.trim().split(' ');
            return parts[0]; 
        }
    },
    
    actions: {
        loginSuccess(data) {
            this.token = data.token;
            this.user = data.user; 
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); 
        },

        setUser(updatedUser) {
            this.user = updatedUser;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        },

        logout() {
            this.token = null;
            this.user = null;
            
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        async fetchProfile() {
            const id = this.userId;
            if (!id) return;

            try {
                const profileData = await fetchUserProfile(id);
                this.user = profileData;
                localStorage.setItem('user', JSON.stringify(profileData));
            } catch (error) {
                console.error("Falha ao buscar perfil:", error);
            }
        },

        async updateProfile(updatedData) {
            const id = this.userId;
            if (!id) {
                throw new Error("Usuário não identificado. Não é possível salvar o perfil.");
            }
            
            try {
                const updatedUser = await apiUpdateProfile(id, updatedData);
                
                this.user = updatedUser;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                return updatedUser;
            } catch (error) {
                throw error;
            }
        }
    },
});