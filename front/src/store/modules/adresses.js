import reqHand from '../fetch';

const state = {
    addresses: [],
    address: {}
}

const getters = {
    addresses: state => state.addresses,
    address: state => state.address,
}


const actions = {

    async getAddressInfo({ state, commit }, args) {
        const res = await reqHand.get(`/addresses/by-user/${args}/`, { id: args });
        const data = await res.json();
        commit('RECEIVE_ADDRESSES', data);
    },

    async getAllRestaurantsAddress({ state, commit }, args) {
        const res = await reqHand.get(`/addresses/by-role/${args}/`, { id: args });
        const data = await res.json();
        commit('RECEIVE_ADDRESSES', data);
    },

    async CreateAddress({ state, commit }, args) {
        const res = await reqHand.post('/addresses/', args)
        const data = await res.text()
    },

    async UpdateAddress({ state, commit }, args) {
        const res = await reqHand.put(`/addresses/${args.id}/`, { id: args.id }, args.data)
        const data = await res.text();
    },
    async DeletedAddress({ state, commit }, args) {
        const res = await reqHand.delete(`/addresses/${args}/`, { id: args });
        const data = await res.text();
    },
}



const mutations = {

    ['RECEIVE_ADDRESSES'](state, data) {
        state.addresses = data
    },
    ['RECEIVE_ADDRESS'](state, data) {
        state.address = data
    },
    ['UPDATE_ADDRESS'](state, value) {
        state.address = Object.assign(state.address, value)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}