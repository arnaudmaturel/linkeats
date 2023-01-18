// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    delivery: {},
    deliveries: []
}

// getters
const getters = {
    delivery: state => state.delivery,
    deliveries: state => state.deliveries
}

// actions
const actions = {
    async getAllDeliveries({ state, commit }, args) {
        return reqHand.get('/deliverymen/')
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DELIVERIES', { data })
                    })
            })
    },
    async getDelivery({ state, commit }, args) {
        return reqHand.get(`/deliverymen/${args.id}/`, { id: args.id })
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DELIVERY', { data })
                    })
            })
    },
    async createDelivery({ state, commit }, newDeliver) {
        return reqHand.post('/deliverymen/register', {}, newDeliver)
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DELIVERY', { data })
                    })
            })
    },
    async saveDelivery ({ state, commit }, args) {
        return reqHand.put(`/deliverymen/${state.delivery.id}/`, {id: state.delivery.id}, body = state.delivery)
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DELIVERY', { data })
                    })
            })
    },
    async deleteRestaurant ({ state, commit }, args) {
        return reqHand.delete(`/deliverymen/${args.id}/`, {id: args.id})
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DELIVERY', { data })
                    })
            })
    }
}

// mutations
const mutations = {
    ['RECEIVE_DELIVERIES'](state, data) {
        state.deliveries = data
    },
    ['RECEIVE_DELIVERY'](state, data) {
        state.delivery = data
    },
    ['UPDATE_RESTAURANT'] (state, value) {
        state.delivery = Object.assign(state.delivery, value)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
