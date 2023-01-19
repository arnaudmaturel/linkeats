// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
  credential: {}
}

// getters
const getters = {
  credential: state => state.credential,
}

// actions
const actions = {
  async loginUser({ state, commit }, credentials) {
    return reqHand.post('/auth/login', credentials)
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
    state.credential = data.credential;
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("userId", data.data.credential.CredentialID);
    localStorage.setItem("userRole", data.data.credential.CredentialUserRole);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
