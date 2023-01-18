// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
  order: {},
  orders: [],
  orders_statuses: {},
  orders_pagination: {}
}

// getters
const getters = {
  order: state => state.order,
  orders: state => state.orders,
  orders_statuses: state => state.orders_statuses,
  orders_pagination: state => state.orders_pagination
}

// actions
const actions = {
  async getAllOrders({ state, commit }, args) {
    return reqHand.get('/orders/', args.filters)
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_ORDERS', { data })
          })
      })
  },
  async getOrder({ state, commit }, args) {
    return reqHand.get(`/orders/${args.id}/`, { id: args.id })
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_ORDER', { data })
          })
      })
  },
  async createOrder({ state, commit }, newOrder) {
    return reqHand.post('/orders/', newOrder)
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_ORDER', { data })
          })
      })
  },
  async saveOrder({ state, commit }, args) {
    return reqHand.put(`/orders/${state.order.id}/`, { id: state.order.id }, state.order)
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_ORDER', { data })
          })
      })
  },
  async deleteOrder({ state, commit }, args) {
    return reqHand.delete(`/orders/${args.id}/`, { id: args.id })
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_ORDER', { data })
          })
      })
  },
  async getAllOrderStatuses({ state, commit }, args) {
    return reqHand.get('/orders/statuses/', args.filters)
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_ORDERS_STATUSES', { data })
          })
      })
  },
}

// mutations
const mutations = {
  ['RECEIVE_ORDERS'](state, data) {
    state.orders = data
    // state.orders_pagination = helpers.pagination(response.headers)
  },
  ['RECEIVE_ORDER'](state, data) {
    state.order = data
  },
  ['UPDATE_ORDER'](state, value) {
    state.order = Object.assign(state.order, value)
  },
  ['RECEIVE_ORDERS_STATUSES'](state, value) {
    state.orders_statuses = Object.assign(state.orders_statuses, value)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
