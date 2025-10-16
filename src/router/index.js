import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SobreView from '../views/SobreView.vue'
import RestaurantesListaView from '../views/RestaurantesListaView.vue' 
import RestauranteView from '../views/RestauranteView.vue'
import DestaqueView from '../views/DestaqueView.vue'
import PlanosView from '../views/PlanosView.vue'
import ContatoView from '../views/ContatoView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import PainelControleView from '../views/PainelControleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

      meta: {
        searchHeader: false
      }
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: SobreView,
    },
    
    // ROTA 1: PÁGINA DE LISTAGEM
    {
      path: '/restaurantes',
      name: 'restaurantes-lista',
      component: RestaurantesListaView,
      
      meta: {
        searchHeader: true
      }
    },
    
    // ROTA 2: PÁGINA DE DETALHE
    {
      path: '/restaurantes/:id',
      name: 'restaurante-detalhe', 
      component: RestauranteView,
    
      meta: {
        searchHeader: true
      }
    },
    
    // ... Rotas existentes
    {
      path: '/destaque',
      name: 'destaque',
      component: DestaqueView,
    },
    {
      path: '/planos',
      name: 'planos',
      component: PlanosView,
    },
    {
      path: '/contato',
      name: 'contato',
      component: ContatoView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView, 
      meta: {
        requiresMinimalHeader: true 
      }
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView, 
      meta: {
        requiresMinimalHeader: true 
      }
    },
    
    // =========================================================
    // NOVAS ROTAS PARA O PAINEL DE CONTROLE
    // =========================================================
    {
      path: '/painel',
      name: 'painel',
      component: PainelControleView, 
      meta: {
        // CHAVE PARA O HeaderPainelControle
        requiresDashboardHeader: true 
      }
    },

    
    // Adicione aqui qualquer outra rota que necessite do HeaderPainelControle
  ],
})

export default router