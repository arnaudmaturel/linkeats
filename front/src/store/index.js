import { createStore } from 'vuex'

import storeCart from './modules/cart'
import storeRestaurants from './modules/restaurants_v2'
import order from './modules/order'
import user from './modules/user'
import dishes from './modules/dishes'
import basket from './modules/basket'
import client from './modules/client'
import delivery from './modules/delivery'
import deliveryman from './modules/deliveryman'

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
    storeRestaurants,
    order,
    user,
    dishes,
    basket,
    client,
    delivery,
    deliveryman
  }
});
