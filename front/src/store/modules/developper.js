// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    developper: {},
}

// getters
const getters = {
    developper: state => state.developper,
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
    async createClient({ state, commit }, newClient) {
        return reqHand.post('/clients/register', newClient)
            .then((response) => {
                response.json()
                    .then((data) => {
                        localStorage.setItem("accessToken", data.accessToken)
                        commit('RECEIVE_CLIENT', { data: data.user })
                    })
            })
    },
    async saveClient({ state, commit }, args) {
        return reqHand.put(`/clients/${state.order.id}/`, { id: state.order.id }, state.order)
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
        state.order = data
    },
    ['UPDATE_CLIENT'](state, value) {
        state.order = Object.assign(state.order, value)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
