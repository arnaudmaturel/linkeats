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
    try {
      const res = await reqHand.post('/auth/login', credentials);
      console.log("login res :", res);
      if (res.status != 200) {
        await commit('RECEIVE_LOGIN_TOKEN', null)
        return;
      }

      const data = await res.json();
      await commit('RECEIVE_LOGIN_TOKEN', data)
    }
    catch (err) {
      console.log("Error login :", err);
      await commit('RECEIVE_LOGIN_TOKEN', null)
    }
  },

  async getCredential({ state, commit }, credentialId) {
    const res = await reqHand.get(`/auth/user_credential/${credentialId}/`, { id: credentialId });
    const data = await res.json();
    await commit('RECEIVE_CREDENTIAL', data)
  },

  async getOnlyCredential({ state, commit }, credentialId) {
    const res = await reqHand.get(`/auth/user_credential/${credentialId}/`, { id: credentialId });
    const data = await res.json();
    return data;
  },

  async puCredential({ state, commit }, newCredential) {
    const res = await reqHand.put(`/auth/user_credential/${newCredential}/`, state.credential.CredentialID);
  },
}

// mutations
const mutations = {
  async ['RECEIVE_LOGIN_TOKEN'](state, data) {
    if (data == null) {
      state.credential = null;
      await localStorage.removeItem("credentialId");
      await localStorage.removeItem("userId");
      return;
    }

    if (!data.accessToken) {
      console.log("RECEIVE_LOGIN_TOKEN : no data");
      return;
    }
    state.credential = data;
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
