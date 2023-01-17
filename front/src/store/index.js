import { createStore } from 'vuex'

import storeCart from './modules/cart'
import storeMenus from './modules/menus'
import storeRestaurants from './modules/restaurants'
import order from './modules/order.js'
import dishes from './modules/dishes'

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
    dishes
  }
});
