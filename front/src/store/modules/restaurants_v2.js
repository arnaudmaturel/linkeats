// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    restaurant: {},
    restaurants: []
}

// getters
const getters = {
    restaurant: state => state.restaurant,
    restaurants: state => state.restaurants
}

// actions
const actions = {
    async getAllRestaurants({ state, commit }, args) {
        return reqHand.get('/restaurants/')
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_RESTAURANTS', { data })
                    })
            })
    },
    async getRestaurant({ state, commit }, args) {
        return reqHand.get(`/restaurants/${args.id}/`, { id: args.id })
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_RESTAURANT', { data })
                    })
            })
    },
    async createRestaurant({ state, commit }, newRestaurant) {
        return reqHand.post('/restaurants/register', {}, newRestaurant)
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_RESTAURANT', { data })
                    })
            })
    },
    async saveRestaurant ({ state, commit }, args) {
        return reqHand.put(`/restaurants/${state.restaurant.id}/`, {id: state.restaurant.id}, body = state.restaurant)
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_RESTAURANT', { data })
                    })
            })
    },
    async deleteRestaurant ({ state, commit }, args) {
        return reqHand.delete(`/restaurants/${args.id}/`, {id: args.id})
            .then((response) => {
                response.json()
                    .then((data) => {
                        commit('RECEIVE_RESTAURANT', { data })
                    })
            })
    }
}

// mutations
const mutations = {
    ['RECEIVE_RESTAURANTS'](state, data) {
        state.restaurants = data
    },
    ['RECEIVE_RESTAURANT'](state, data) {
        state.restaurant = data
    },
    ['UPDATE_RESTAURANT'] (state, value) {
        state.restaurant = Object.assign(state.restaurant, value)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
