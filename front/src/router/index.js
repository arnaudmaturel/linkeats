import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantsView from '../views/restaurants/RestaurantsView.vue'
import RestaurantMenusView from '../views/restaurants/menus/RestaurantView.vue'
import RegisterView from '../views/RegisterView.vue'
import CartToOrderView from '../views/orders/CartValidationView.vue'
import ClientAccount from '../views/Clients/ClientAccount.vue'
import LoginView from "@/views/LoginView.vue"
import RestaurateurOrders from '../views/Restaurateur/Orders.vue'

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
  /*{
    path: '/restaurants/:restaurant/:plate',
    name: 'restaurant_menus',
    component: MenuView
  },*/
  {
    path: '/account/cart',
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
    component: LoginView
  },
  {
    path: '/restaurant/login',
    name: "restaurant/login",
    component: HomeView,
  },
  {
    path: '/deliveryman/login',
    name: "restaurant/login",
    component: HomeView,
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
