// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  async loginUser({ state, commit }, newClient) {
    return reqHand.post('/clients/login', newClient)
      .then((response) => {
        response.json()
          .then((data) => {
            commit('RECEIVE_USER', { data })
          })
      })
  },
}

// mutations
const mutations = {
  ['RECEIVE_USER'](state, data) {
    localStorage.setItem("accessToken", data.accessToken)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
