import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home_logoff/HomeView.vue";
import SobreView from "../views/home_logoff/SobreView.vue";
import RestaurantesListaView from "../views/listar_restaurantes/RestaurantesListaView.vue";
import DestaqueView from "../views/home_logoff/DestaqueView.vue";
import PlanosView from "../views/home_logoff/PlanosView.vue";
import ContatoView from "../views/home_logoff/ContatoView.vue";
import LoginView from "../views/login/cadastro/LoginView.vue";
import CadastroView from "../views/login/cadastro/CadastroView.vue";
import PainelControleView from "../views/control_panel/PainelControleView.vue";
import RestaurantePageView from "../views/restaurant/RestaurantePageView.vue";
import RestaurantAdminView from "../views/restaurant/RestaurantAdminView.vue";
import RestaurantCreateView from "../views/restaurant/RestaurantCreateView.vue";
import UserProfilePage from "../components/UserProfile/UserProfilePage.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/sobre",
      name: "sobre",
      component: SobreView,
    },

    {
      path: "/restaurantes",
      name: "restaurantes-lista",
      component: RestaurantesListaView,
    },

    {
      path: "/restaurantes/:id",
      name: "restaurante-detalhe",
      component: RestaurantePageView,
    },

    {
      path: "/restaurantes/:id/admin",
      name: "restaurante-admin",
      component: RestaurantAdminView,
    },

    {
      path: "/restaurantes/cadastrar",
      name: "restaurante-cadastrar",
      component: RestaurantCreateView,
    },

    {
      path: "/usuario",
      name: "usuario",
      component: UserProfilePage,
      meta: { requiresAuth: true },
    },

    {
      path: "/destaque",
      name: "destaque",
      component: DestaqueView,
    },

    {
      path: "/planos",
      name: "planos",
      component: PlanosView,
    },

    {
      path: "/contato",
      name: "contato",
      component: ContatoView,
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    {
      path: "/cadastro",
      name: "cadastro",
      component: CadastroView,
    },

    {
      path: "/painel",
      name: "painel",
      component: PainelControleView,
      meta: {},
    },
  ],
});

export default router;