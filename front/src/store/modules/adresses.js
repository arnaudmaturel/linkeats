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

    async getClientAddresses({ state, commit }, args) {

    },
    async getRestaurantAddressInfo({ state, commit }, args) {

    },
    async getAllRestaurantsAddress({ state, commit }, args) {

    },

    async CreateAddress({ state, commit }, args) {

    },
    async UpdateAddress({ state, commit }, args) {

    },
    async DeletedAddress({ state, commit }, args) {

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