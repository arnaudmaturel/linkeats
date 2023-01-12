import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RestaurantsView from '../views/restaurants/RestaurantsView.vue'
import RestaurantMenusView from '../views/restaurants/menus/RestaurantView.vue'
import MenuView from '../views/restaurants/menus/MenuView.vue'
import UserView from '../views/UserAccountView.vue'
import RegisterView from '../views/RegisterView.vue'
import CartToOrderView from '../views/orders/CartValidationView.vue'

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
    component: UserView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
