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
    getAllMenus: state => store => {
      return state.allMenus.filter(menu => menu.tags === store);
    },
    getAllRestaurants: state => {
      return state.allRestaurants;
    },
    itemCount: state => {
      return state.cartCount;
    },
    getCart: state => {
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
      let objItem = {
        pid: newItem.pid,
        title: newItem.title,
        price: newItem.price,
        tags: newItem.tags,
        quantity: 1
      }
      let strItem = JSON.stringify(objItem)
      let found = state.cartItems.findIndex(i => i.pid === newItem.pid)
      // IF EXIST ADD +1 QTY ELSE ADD NEW ITEM WITH 1 QTY
      if (found > -1) {
        state.cartItems[found].quantity += newItem.quantity || 1;
        localStorage.removeItem('cart', strItem);

        objItem = {
          pid: newItem.pid,
          title: newItem.title,
          price: newItem.price,
          tags: newItem.tags,
          quantity: state.cartItems[found].quantity
        }
        strItem = JSON.stringify(objItem)
      } else {
        if (newItem['quantity'] == undefined) {
            newItem.quantity = 1;
        }
        state.cartItems.push(newItem);
      }
      localStorage.setItem('cart', strItem);
      state.cartCount++;
    },
    delItem(state, params) {
      let objItem = {
        pid: params.pid,
        title: params.title,
        price: params.price,
        tags: params.tags,
        quantity: params.quantity
      }
      let strItem = JSON.stringify(objItem)

      let found = state.cartItems.findIndex(i => i.pid === params.pid)

      if (found > -1) {
        state.cartItems[found].quantity -= params.quantity || 1;

        if (state.cartItems[found].quantity < 1) {
          state.cartItems.splice(found, 1)
          localStorage.removeItem('cart', strItem);
        } else {
          localStorage.removeItem('cart', strItem);
          objItem = {
            pid: params.pid,
            title: params.title,
            price: params.price,
            tags: params.tags,
            quantity: state.cartItems[found].quantity
          }
          strItem = JSON.stringify(objItem)
          localStorage.setItem('cart', (strItem));
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
  }
});
