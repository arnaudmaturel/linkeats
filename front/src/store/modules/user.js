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
    const res = await reqHand.post('/auth/login', credentials);
    const data = await res.json();
    await commit('RECEIVE_LOGIN_TOKEN', data)
  },

  async getCredential({ state, commit }, credentialId) {
    const res = await reqHand.get(`/auth/user_credential/${credentialId}/`, { id: credentialId });
    const data = await res.json();
    await commit('RECEIVE_CREDENTIAL', data)
  },

  async puCredential({ state, commit }, newCredential) {
    const res = await reqHand.put(`/auth/user_credential/${newCredential}/`, state.credential.CredentialID);
  },
}

// mutations
const mutations = {
  async ['RECEIVE_LOGIN_TOKEN'](state, data) {
    if (!data.accessToken) {
      console.log("RECEIVE_LOGIN_TOKEN : no data");
      return;
    }
    state.credential = data;
    console.log("UserStore.loginToken : ", state.credential);

    await localStorage.setItem("accessToken", data.accessToken);
    await localStorage.setItem("credentialId", data.credential.CredentialID);
    await localStorage.setItem("userRole", data.credential.CredentialUserRole);
    await localStorage.setItem("userId", data.credential.CredentialAssociatedUserID);
  },

  async ['RECEIVE_CREDENTIAL'](state, data) {
    if (!data) {
      console.log("RECEIVE_CREDENTIAL : no data");
    }
    state.credential = data;
    console.log("UserStore.credential : ", state.credential);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
