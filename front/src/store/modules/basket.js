// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    basket: {}
}

// getters
const getters = {
    basket: state => state.basket
}

// actions
const actions = {
    // async getBasket({ state, commit }, args) {
    //     return reqHand.get(`/baskets/${args.id}/`, { id: args.id })
    //         .then((response) => {
    //             response.json()
    //                 .then((data) => {
    //                     commit('RECEIVE_BASKET', { data })
    //                 })
    //         })
    // },
    // async createBasket({ state, commit }, newItem) {
    //     return reqHand.post('/baskets/', newItem)
    //         .then((response) => {
    //             response.json()
    //                 .then((data) => {
    //                     commit('RECEIVE_BASKET', { data })
    //                 })
    //         })
    // },
    // async saveBasket({ state, commit }, args) {
    //     return reqHand.put(`/baskets/${state.basket.id}/`, { id: state.basket.id }, state.basket)
    //         .then((response) => {
    //             response.json()
    //                 .then((data) => {
    //                     commit('RECEIVE_BASKET', { data })
    //                 })
    //         })
    // },
    // async deleteBasket({ state, commit }, args) {
    //     return reqHand.delete(`/baskets/${args.id}/`, { id: args.id })
    //         .then((response) => {
    //             response.json()
    //                 .then((data) => {
    //                     commit('RECEIVE_BASKET', { data })
    //                 })
    //         })
    // },
    // async getAllBasketStatuses({ state, commit }, args) {
    //     return reqHand.get('/baskets/statuses/', args.filters)
    //         .then((response) => {
    //             response.json()
    //                 .then((data) => {
    //                     commit('RECEIVE_BASKETS_STATUSES', { data })
    //                 })
    //         })
    // },





    async getBasket({ state, commit }, args) {
        const res = await reqHand.get(`/baskets/${args.id}/`, { id: args.id });
        try {
            const data = res.json();
            commit('RECEIVE_BASKET', data);
        }
        catch (e) {
            console.log("getBasketError", e);
        }
    },


    async createBasket({ state, commit }, newItem) {
        const res = await reqHand.post('/baskets/', newItem);
        try {
            const data = res.json();
            commit('RECEIVE_BASKET', data)
        }
        catch (e) { console.log("CreateBasketError :", e) }

    },


    async saveBasket({ state, commit }, args) {
        const res = await reqHand.put(`/baskets/${state.basket.id}/`, { id: state.basket.id }, state.basket);
        try {
            const data = await res.json();
            commit('RECEIVE_BASKET', data)
        }
        catch (e) { console.log("saveBasketError :", e) }
    },

    async deleteBasket({ state, commit }, args) {
        const res = await reqHand.delete(`/baskets/${args.id}/`, { id: args.id });
        //commit('RECEIVE_BASKET', data);
    },


    async getAllBasketStatuses({ state, commit }, args) {
        const res = await reqHand.get('/baskets/statuses/', args.filters);
        try {
            const data = await res.json();
            commit('RECEIVE_BASKETS_STATUSES', data)

        }
        catch (e) { console.log("getAllBasketStatusesError", e) }
    }
}

// mutations
const mutations = {
    ['RECEIVE_BASKET'](state, data) {
        state.basket = data
    },
    ['UPDATE_BASKET'](state, value) {
        state.basket = Object.assign(state.basket, value)
    },
    ['RECEIVE_BASKETS_STATUSES'](state, value) {
        state.orders_statuses = Object.assign(state.orders_statuses, value)
    },
    ['ADD_ITEM'](state, value) {

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
