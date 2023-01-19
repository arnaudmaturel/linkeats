// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
  client: {},
}

// getters
const getters = {
  client: state => state.client,
}

// actions
const actions = {
  async getClient({ state, commit }, args) {
    return reqHand.get(`/clients/${args.id}/`, { id: args.id })
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_CLIENT', { data })
          })
      })
  },


  createClient({ state, commit }, newClient) {
    return reqHand.post('/clients/register', newClient)
      .then((response) => {
        console.log("response :", response)
        response.text().then((data) => {
          console.log("response :", data)
          //commit('RECEIVE_CLIENT', { data: data.user })
        })
      })

  },



  async saveClient({ state, commit }, args) {
    return reqHand.put(`/clients/${state.client.id}/`, { id: state.client.id }, state.client)
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_CLIENT', { data })
          })
      })
  },
  async deleteClient({ state, commit }, args) {
    return reqHand.delete(`/clients/${args.id}/`, { id: args.id })
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_CLIENT', { data })
          })
      })
  },
}

// mutations
const mutations = {
  ['RECEIVE_CLIENT'](state, data) {
    state.client = data
  },
  ['UPDATE_CLIENT'](state, value) {
    state.client = Object.assign(state.client, value)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
