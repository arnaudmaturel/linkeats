import { createStore } from 'vuex'
import menus from '../api/menus'
import restaurants from '../api/restaurants'

export default createStore({
  state: {
    cartItems: [],
    cartCount: 0,
    allMenus: [],
    allRestaurants: []
  },
  getters: {
    getAllMenus: state => {
      return state.allMenus;
    },
    getAllRestaurants: state => {
      return state.allRestaurants;
    },
    itemCount: state => {
      return state.cartCount;
    },
    cart: state => {
      return state.cartItems;
    }
  },
  mutations: {
    setMenus(state, menus) {
      state.allMenus = menus;
    },
    setRestaurants(state, restaurants) {
      state.allRestaurants = restaurants;
    },
    addItem(state, newItem) {
      let found = state.cartItems.findIndex(i => i.pid === newItem.pid)
      // IF EXIST ADD QTY ELSE ADD NEW ITEM
      if (found > -1) {
        state.cartItems[found].quantity += newItem.quantity || 1;
        state.cartCount++;
      } else {
        if (newItem['quantity'] == undefined) {
            newItem.quantity = 1;
        }
        state.cartCount++;
        state.cartItems.push(newItem);
      }
    },
    delItem(state, params) {
      let found = state.cartItems.findIndex(i => i.pid === params.pid)
      if (found > -1) {
        state.cartItems[found].quantity -= params.quantity || 1;
        if (state.cartItems[found].quantity < 1) {
          state.cartItems.splice(found,1)
        }
        state.cartCount--;
      } 
    }
  },
  actions: {
    getAllMenus({ commit }) {
      menus.getMenus(menus => {
        commit("setMenus", menus);
      });
    },
    getAllRestaurants({ commit }) {
      restaurants.getRestaurants(restaurants => {
        commit("setRestaurants", restaurants);
      });
    },
    addItem(context, item) {
      context.commit(item);
    },
    delItem(context, params) {
        context.commit(params);
    }
  },
  modules: {

  },
});
