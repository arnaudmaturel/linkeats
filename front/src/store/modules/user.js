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
    // return await reqHand.post('/auth/login', credentials)
    //   .then((response) => {
    //     console.log("End request");
    //     response.json()
    //       .then((data) => {
    //         console.log("Before commit", new Date().toLocaleTimeString())
    //         commit('RECEIVE_USER', { data })
    //         console.log("After commit", new Date().toLocaleTimeString())
    //       })
    //   })
    const res = await reqHand.post('/auth/login', credentials);
    console.log("End request at " + new Date().toLocaleTimeString());
    const data = await res.json();
    console.log("Before commit", new Date().toLocaleTimeString())
    await commit('RECEIVE_USER', data)
    console.log("After commit", new Date().toLocaleTimeString())
  },

}

// mutations
const mutations = {
  async ['RECEIVE_USER'](state, data) {
    if (!data) {
      console.log("RECEIVE_USER : no data");
    }
    state.credential = data;
    console.log("UserStore.credential : ", state.credential);

    await localStorage.setItem("accessToken", data.accessToken);
    await localStorage.setItem("credentialId", data.credential.CredentialID);
    await localStorage.setItem("userRole", data.credential.CredentialUserRole);
    await localStorage.setItem("userId", data.credential.CredentialAssociatedUserID);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
