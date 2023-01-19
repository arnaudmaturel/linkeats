import { createStore } from 'vuex'

import storeCart from './modules/cart'
import storeMenus from './modules/menus'
import storeRestaurants from './modules/restaurants_v2'
import order from './modules/order'
import user from './modules/user'
import dishes from './modules/dishes'
import basket from './modules/basket'
import client from './modules/client'
import delivery from './modules/delivery'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    storeCart,
    storeMenus,
    storeRestaurants,
    order,
    user,
    dishes,
    basket,
    client,
    delivery
  }
});
