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
        const res = await reqHand.get('/restaurants');
        const data = await res.json();
        commit('RECEIVE_RESTAURANTS', data)
    },
    async getRestaurant({ state, commit }, args) {
        // const res = await reqHand.get(`/restaurants/${args}/`, { id: args });
        const res = await reqHand.get(`/restaurants/${args}/`);
        const data = await res.json();
        commit('RECEIVE_RESTAURANT', data);
    },

    async postRestoImg({ state, commit }, img) {
        const res = await reqHand.postImg('/restaurants/upload', img);
    },


    async createRestaurant({ state, commit }, newRestaurant) {
        const res = await reqHand.post('/restaurants/register', newRestaurant);
        const data = await res.text();
        return data;
        // commit('RECEIVE_RESTAURANT', data);
    },
    async saveRestaurant({ state, commit }, args) {
        const res = await reqHand.put(`/restaurants/${state.restaurant.UserID}`, { id: state.restaurant.UserID }, state.restaurant);
        const data = await res.text();
        return data;
    },
    async deleteRestaurant({ state, commit }, args) {
        const res = await reqHand.delete(`/restaurants/${args}/`, { id: args })
        const data = await res.json();
        commit('RECEIVE_RESTAURANT', data);
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
    ['UPDATE_RESTAURANT'](state, value) {
        Object.assign(state.restaurant, value);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
