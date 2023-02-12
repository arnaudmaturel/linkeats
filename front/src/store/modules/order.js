// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
  order: {},
  orders: [],
  allOrder: [],
  // orders_statuses: {},
  // orders_pagination: {}
}

// getters
const getters = {
  orders: state => state.orders,
  order: state => state.order,
}

// actions
const actions = {
  async getAllClientOrders({ state, commit }, idClient) {
    const res = await reqHand.get('/orders/by-client', idClient);
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_CLIENT_ORDERS', data);
  },


  async getAllRestoOrders({ state, commit }, idResto) {
    const res = await reqHand.get(`/orders/by-restaurant/${idResto}`);
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_RESTO_ORDERS', data);
  },


  async getAllDeliverOrders({ state, commit }, idDeliver) {
    const res = await reqHand.get('/orders/by-deliveryman', idDeliver);
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_DELIVER_ORDERS', data);
  },

  async getOrdersByStatus({ state, commit }, status) {
    const res = await reqHand.get('/orders/by-status/' + status);
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('ADD_STATUS', { status: status, data: data });
  },


  async getOrder({ state, commit }, args) {
    const res = await reqHand.get(`/orders/${args}/`, { id: args });
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_ORDER', data);
  },


  async createOrder({ state, commit }, newOrder) {
    const res = await reqHand.post('/orders/', newOrder)
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_ORDER', data)
  },


  async saveOrder({ state, commit }, args) {
    const res = await reqHand.put(`/orders/${args.id}/`, { id: args.id }, args.data);
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_ORDER', data);
  },

  async deliveryManAcceptCourse({ state, commit }, args) {
    const res = await reqHand.put(`/orders/set-deliveryman/${args.id}/`, { id: args.id }, args.data);
    if (res.status === 401) { }
    else if (res.status === 401) { }
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_ORDER', data);
  },


  async deleteOrder({ state, commit }, args) {
    const res = await reqHand.delete(`/ orders / ${args}/`, { id: args });
    if (res.status != 200) { console.error(res); return; }
    const data = await res.json();
    commit('RECEIVE_ORDER', data);
  },
}

// mutations
const mutations = {
  ['RECEIVE_CLIENT_ORDERS'](state, data) {
    state.orders = data
  },
  ['RECEIVE_RESTO_ORDERS'](state, data) {
    state.orders = data
  },
  ['RECEIVE_DELIVER_ORDERS'](state, data) {
    state.orders = data
  },
  ['RECEIVE_ORDER'](state, data) {
    state.order = data
  },
  ['UPDATE_ORDER'](state, value) {
    state.order = Object.assign(state.order, value)
  },
  ['ADD_STATUS'](state, value) {
    try {

      var idx = -1;
      if (state.allOrder && state.allOrder.length > 0) {
        for (let i = 0; i < state.allOrder.length; i++) {
          if (state.allOrder[idx].status == value.status) {
            idx = i;
            break;
          }
        }
      }
      if (idx == -1)
        state.allOrder.push({ status: value.status, data: value.data });
      else
        state.allOrder[idx].data = value.data;
    }
    catch (e) { }
  },
  ['REMOVE_STATUS'](state, value) {
    var idx = -1;
    for (let i = 0; i < cars.length; i++) {
      if (state.allOrder[idx].status == value) {
        idx = i;
        break;
      }
    }
    if (idx == -1)
      return;
    state.allOrder.splice(idx, 1)
  },
  ['CLEAR_STATUS'](state, value) {
    state.allOrder = [];
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
