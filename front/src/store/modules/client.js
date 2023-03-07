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
    const res = await reqHand.get(`/clients/${args}/`, { id: args })
    const data = await res.json()
    await commit('RECEIVE_CLIENT', data)
  },


  async getClientByLogin({ state, commit }, args) {
    const res = await reqHand.post(`/clients/by-login`, args)
    if (res.status == 200) {
      return await res.json();
    }
    else {
      return null;
    }

  },


  async createClient({ state, commit }, newClient) {
    const res = await reqHand.post('/clients/register', newClient);
    const data = await res.text()
    return data;
  },



  async saveClient({ state, commit }, args) {
    const res = await reqHand.put(`/clients/${state.client.UserID}/`, { id: state.client.UserID }, state.client)
    const data = await res.text();
  },

  async deleteClient({ state, commit }, args) {
    const res = await reqHand.delete(`/clients/${args.id}/`, { id: args.id });
    const data = await res.text();
  },
}

// mutations
const mutations = {
  async ['RECEIVE_CLIENT'](state, data) {
    state.client = data
  },
  ['UPDATE_CLIENT'](state, value) {
    Object.assign(state.client, value)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
