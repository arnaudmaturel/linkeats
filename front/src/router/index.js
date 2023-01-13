import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
import RestaurantView from '../views/RestaurantView.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/restaurants/:name',
    name: 'restaurant_menus',
    component: RestaurantView
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantsView
  },
  {
    path: '/clients/:id',
    name: 'clients/account',
    component: ClientAccount
  },
  {
    path: '/register',
    name: 'register',
    component: HomeView
  },
  {
    path: '/restaurateur/orders',
    name: 'restaurateur_orders',
    component: RestaurateurOrders
  }
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
