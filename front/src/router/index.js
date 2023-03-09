import { createRouter, createWebHistory } from 'vue-router'
import vue from "vue";
import HomeView from '../views/HomeView.vue'
import RestaurantsView from '../views/restaurants/RestaurantsView.vue'
import RestaurantMenusView from '../views/restaurants/menus/RestaurantView.vue'
import RegisterView from '../views/RegisterView.vue'
import CartToOrderView from '../views/orders/CartValidationView.vue'
import MenuView from '../views/restaurants/menus/MenuView.vue'
import ClientAccount from '../views/Clients/ClientAccount.vue'
import RestaurateurOrders from '../views/Restaurateur/Orders.vue'
import FlipLogSignClient from '@/components/FlipLogSignClient.vue'
import FlipLogSignResto from "@/components/FlipLogSignResto.vue"
import FlipLogSignDeliver from "@/components/FlipLogSignDeliver.vue"
import FlipLogSignDev from "@/components/FlipLogSignDev.vue"
import AppSetting from "@/AppSetting";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      roles: [1, 2, 3, 4, 5]
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      roles: [1, 2, 3, 4, 5]
    }
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: RestaurantsView,
    meta: {
      roles: [1, 5]
    }
  },
  {
    path: '/restaurants/:restaurant',
    name: 'restaurant_menus',
    component: RestaurantMenusView,
    meta: {
      roles: [1, 5]
    },
    props: true
  },
  {
    path: '/restaurants/:restaurant/:menu',
    name: 'menu_info',
    component: MenuView,
    meta: {
      roles: [1, 5]
    },
    props: true
  },
  /*{
    path: '/restaurants/:restaurant/:plate',
    name: 'restaurant_menus',
    component: MenuView,
    meta: {
      roles: []
    }
  },*/
  {
    path: '/cart',
    name: 'user_cart_to_order',
    component: CartToOrderView,
    meta: {
      roles: [1, 5]
    }
  },
  {
    path: '/account',
    name: 'account',
    component: ClientAccount,
    meta: {
      roles: [1, 2, 3, 4]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      roles: [5]
    }
  },
  {
    path: '/restaurateur/orders',
    name: 'restaurateur_orders',
    component: RestaurateurOrders,
    meta: {
      roles: [2]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: FlipLogSignClient,
    meta: {
      roles: [5]
    }
  },
  {
    path: '/restaurateur/login',
    name: "restaurant/login",
    component: FlipLogSignResto,
    meta: {
      roles: [5]
    }
  },
  {
    path: '/developper/login',
    name: "developper/login",
    component: FlipLogSignDev,
    meta: {
      roles: [5]
    }
  },
  {
    path: '/deliveryman/login',
    name: "/deliveryman/login",
    component: FlipLogSignDeliver,
    meta: {
      roles: [5]
    }
  },
  {
    path: '/contact-us',
    name: "/contact-us",
    component: HomeView,
    meta: {
      roles: []
    }
  },
  {
    path: '/confidentiality',
    name: "/confidentiality",
    component: HomeView,
    meta: {
      roles: []
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// console.log("Router.localStorage(userID)1", localStorage.getItem('userId'));

router.beforeEach((to, from) => {
  if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") == undefined) {
    console.log("no token")
    fetch("http://localhost:80/auth/visitor_token", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // params: params
    }).then((response) => {
      response.json().then((data) => {
        localStorage.setItem("accessToken", data.accessToken)
      })
    });
  }

  const userId = localStorage.getItem("credentialId");
  console.log("Router.index.js.userId:", userId);

  if (!userId) {
    console.log("no user");
    localStorage.setItem("userRole", 5)
  }
  else {

    fetch(`http://localhost:80/auth/user_role/${userId}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // params: params
    }).then((response) => {
      response.json().then((data) => {
        const userRole = data.userRole;
        localStorage.setItem("userRole", userRole)
        if (!to.meta.roles.includes(userRole)) {
          return { name: 'home', replace: true }
        }
      })
    });
  }
  // explicitly return false to cancel the navigation
  // return false
})
// console.log("Router.localStorage(userID)2", localStorage.getItem('userId'));

export default router
