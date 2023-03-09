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
        const res = await reqHand.get('/dishes/by-restaurant/' + args);
        const data = await res.json();
        await commit('RECEIVE_DISHES', data)
    },

    async getDish({ state, commit }, args) {
        const res = await reqHand.get('/dishes/' + args, { id: args.id });
        const data = await res.json();
        await commit('RECEIVE_DISH', data)
    },

    async getOnlyDish({ state, commit }, args) {
        const res = await reqHand.get('/dishes/' + args, { id: args.id });
        const data = await res.json();
        return data;
    },

    async createDish({ state, commit }, newDish) {
        const res = await reqHand.post('/dishes/', newDish);
        const data = await res.json();
        commit('RECEIVE_DISH', data);
    },
    async saveDish({ state, commit }, args) {
        const res = await reqHand.put(`/dishes/${args.id}/`, { id: args.id }, args.dish);
        const data = await res.json();
        commit('RECEIVE_DISH', data)
    },

    async postDishImg({ state, commit }, img) {
        const res = await reqHand.postImg('/dishes/upload', img)
    },

    async deleteDish({ state, commit }, args) {
        const res = await reqHand.delete(`/dishes/${args._id}/`, { id: args._id });
        const data = await res.json();
        commit('RECEIVE_DISH', data);
    },
}

// mutations
const mutations = {
    async ['RECEIVE_DISHES'](state, data) {
        state.dishes = data;
        console.log(state.dishes.length + " dishes recieved");
    },
    async ['RECEIVE_DISH'](state, data) {
        state.dish = data;
    },
    async ['UPDATE_DISH'](state, value) {
        state.dish = await Object.assign(state.dish, value);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
