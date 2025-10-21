import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home_logoff/HomeView.vue'
import SobreView from '../views/home_logoff/SobreView.vue'
import RestaurantesListaView from '../views/listar_restaurantes/RestaurantesListaView.vue' 
import RestauranteView from '../views/restaurant/RestaurantePageView.vue'
import DestaqueView from '../views/home_logoff/DestaqueView.vue'
import PlanosView from '../views/home_logoff/PlanosView.vue'
import ContatoView from '../views/home_logoff/ContatoView.vue'
import LoginView from '../views/login/cadastro/LoginView.vue'
import CadastroView from '../views/login/cadastro/CadastroView.vue'
import PainelControleView from '../views/control_panel/PainelControleView.vue'

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