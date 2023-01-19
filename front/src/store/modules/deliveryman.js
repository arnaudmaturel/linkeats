// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
  deliveryman: {},
}

// getters
const getters = {
  deliveryman: state => state.deliveryman,
}

// actions
const actions = {
  async getdeliveryman({ state, commit }, args) {
    return reqHand.get(`/deliverymen/${args.id}/`, { id: args.id })
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_DELIVERYMAN', { data })
          })
      })
  },


  createDeliveryman({ state, commit }, newdeliveryman) {
    reqHand.post('/deliverymen/register', newdeliveryman)
      .then((response) => {
        console.log("response :", response)
        response.text().then((data) => {
          console.log("response :", data)
          //commit('RECEIVE_DELIVERYMAN', { data: data.user })
        })
      })

  },



  async savedeliveryman({ state, commit }, args) {
    return reqHand.put(`/deliverymen/${state.deliveryman.id}/`, { id: state.deliveryman.id }, state.deliveryman)
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_DELIVERYMAN', { data })
          })
      })
  },
  async deletedeliveryman({ state, commit }, args) {
    return reqHand.delete(`/deliverymen/${args.id}/`, { id: args.id })
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_DELIVERYMAN', { data })
          })
      })
  },
}

// mutations
const mutations = {
  ['RECEIVE_DELIVERYMAN'](state, data) {
    state.createDeliveryman = data
  },
  ['UPDATE_DELIVERYMAN'](state, value) {
    state.createDeliveryman = Object.assign(state.deliveryman, value)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
