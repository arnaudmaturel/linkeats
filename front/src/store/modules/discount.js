// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    discount: {},
    discounts: []
}

// getters
const getters = {
    discount: state => state.discount,
    discount: state => state.discounts
}

// actions
const actions = {

    async getAllDiscount({ state, commit }, args) {
        const res = await reqHand.get('/discount/' + args);
        const data = await res.json();
        await commit('RECEIVE_DICOUNTS', data)
    },

    async getDiscount({ state, commit }, args) {
        const res = await reqHand.get('/discount/' + args, { id: args.id });
        const data = await res.json();
        await commit('RECEIVE_DISCOUNT', data)
    },

    async getDiscountByClient({ state, commit }, args) {
        const res = await reqHand.get('/discount/by-client/' + args, { id: args.id });
        const data = await res.json();
        await commit('RECEIVE_DICOUNTS', data)
    },

    async getOnlyDisount({ state, commit }, args) {
        const res = await reqHand.get('/discount/' + args, { id: args.id });
        const data = await res.json();
        return data;
    },

    async createDiscount({ state, commit }, newDiscount) {
        const res = await reqHand.post('/discount/', newDiscount);
        const data = await res.text();
        return data;
    },
    async saveDisount({ state, commit }, args) {
        const res = await reqHand.put(`/discount/${args.id}/`, { id: args.id }, args.discount);
    },
    async deleteDiscount({ state, commit }, args) {
        const res = await reqHand.delete(`/discount/${args._id}/`, { id: args._id });
        const data = await res.json();
    },
}

// mutations
const mutations = {
    async ['RECEIVE_DICOUNTS'](state, data) {
        state.discounts = data;
    },
    async ['RECEIVE_DISCOUNT'](state, data) {
        state.discount = data;
    },
    async ['UPDATE_DISCOUNT'](state, value) {
        state.discount = await Object.assign(state.discount, value);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
