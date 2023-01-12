import { createStore } from 'vuex'

import storeCart from './modules/cart'
import storeMenus from './modules/menus'
import storeRestaurants from './modules/restaurants'

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
    storeRestaurants
  }
});
