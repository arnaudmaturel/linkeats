// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    dish: {},
    dishes: []
}

// getters
const getters = {
    dish: state => state.dish,
    dishes: state => state.dishes
}

// actions
const actions = {
    async getAllDishes({ state, commit }, args) {
        return reqHand.get('/dishes/by-restaurant/' + args)
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DISHES', { data })
                    })
            })
    },
    async getDish({ state, commit }, args) {
        return reqHand.get('/dishes/' + args, { id: args.id })
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DISH', { data })
                    })
            })
    },
    async createDish({ state, commit }, newOrder) {
        return reqHand.post('/dishes/', newOrder)
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DISH', { data })
                    })
            })
    },
    async saveDish({ state, commit }, args) {
        return reqHand.put(`/dishes/${state.dish.id}/`, { id: state.dish.id }, state.dish)
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DISH', { data })
                    })
            })
    },
    async deleteDish({ state, commit }, args) {
        return reqHand.delete(`/dishes/${args.id}/`, { id: args.id })
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_DISH', { data })
                    })
            })
    }
}

// mutations
const mutations = {
    ['RECEIVE_DISHES'](state, data) {
        state.dishes = data
    },
    ['RECEIVE_DISH'](state, data) {
        state.dish = data
    },
    ['UPDATE_DISH'](state, value) {
        state.dish = Object.assign(state.dish, value)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
