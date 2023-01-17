import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantsView from '../views/restaurants/RestaurantsView.vue'
import RestaurantMenusView from '../views/restaurants/menus/RestaurantView.vue'
import RegisterView from '../views/RegisterView.vue'
import CartToOrderView from '../views/orders/CartValidationView.vue'
import MenuView from '../views/restaurants/menus/MenuView.vue'
import ClientAccount from '../views/Clients/ClientAccount.vue'
import LoginView from "@/views/LoginView.vue"
import RestaurateurOrders from '../views/Restaurateur/Orders.vue'
import FlipLogSignClient from '@/components/FlipLogSignClient.vue'
import FlipLogSignResto from "@/components/FlipLogSignResto.vue"
import FlipLogSignDeliver from "@/components/FlipLogSignDeliver.vue"
import FlipLogSignDev from "@/components/FlipLogSignDev.vue"


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantsView
  },
  {
    path: '/restaurants/:restaurant',
    name: 'restaurant_menus',
    component: RestaurantMenusView
  },
  {
    path: '/restaurants/:restaurant/:menu',
    name: 'menu_info',
    component: MenuView
  },
  /*{
    path: '/restaurants/:restaurant/:plate',
    name: 'restaurant_menus',
    component: MenuView
  },*/
  {
    path: '/cart',
    name: 'user_cart_to_order',
    component: CartToOrderView
  },
  {
    path: '/account',
    name: 'account',
    component: ClientAccount
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/restaurateur/orders',
    name: 'restaurateur_orders',
    component: RestaurateurOrders
  },
  {
    path: '/login',
    name: 'login',
    component: FlipLogSignClient
  },
  {
    path: '/restaurateur/login',
    name: "restaurant/login",
    component: FlipLogSignResto,
  },
  {
    path: '/developper/login',
    name: "developper/login",
    component: FlipLogSignDev,
  },
  {
    path: '/deliveryman/login',
    name: "/deliveryman/login",
    component: FlipLogSignDeliver,
  },
  {
    path: '/contact-us',
    name: "/contact-us",
    component: HomeView,
  },
  {
    path: '/confidentiality',
    name: "/confidentiality",
    component: HomeView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
