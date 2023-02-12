import reqHand from '../fetch'

// initial state
const state = {
    basket: {}
}

// getters
const getters = {
    basket: state => state.basket
}

// IDClient: String,
//     dishesNumber: Number,
//         totalPrice: Number,
//             dishes: [
//                 {
//                     idDish: { type: String, required: true },
//                     quantity: { type: Number, require: true, default: 1 },
//                     notes: { type: String, required: false, default: "" },
//                 }
//             ]

// actions
const actions = {


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

    async getClientBasket({ state, commit }, args) {
        const res = await reqHand.get(`//by-client/${args}/`, { id: args });
        try {
            const data = res.json();
            commit('RECEIVE_BASKET', data);
        }
        catch (e) {
            console.log("getBasketError", e);
        }
    },


    async createBasket({ state, commit }, newItem) {
        try {
            console.log("localstorage", localStorage)
            const res = await reqHand.post('/baskets/', newItem);
            const data = res.json();
            commit('RECEIVE_BASKET', data)
        }
        catch (e) {
            console.log("CreateBasketError :", e)
        }

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
    // RECIEVE BASKET
    ['RECEIVE_BASKET'](state, data) {
        state.basket = data
    },
    // UDATE BASKET
    ['UPDATE_BASKET'](state, value) {
        state.basket = Object.assign(state.basket, value)
    },
    // RECIEVE BASKET STATUSE
    ['RECEIVE_BASKETS_STATUSES'](state, value) {
        state.orders_statuses = Object.assign(state.orders_statuses, value)
    },
    // ADD ITEM
    ['ADD_ITEM'](state, value) {


        state.basket.IDClient = localStorage.getItem("userId");

        // check if the basket is created
        if (!state.basket || !state.basket.dishes) {
            this.commit('CREATE_BASKET');
        }

        // check presence of item
        const item = state.basket.dishes.find(x => x.idDish == value.idDish);

        // add quantity or add item
        if (item) {
            item.quantity += value.quantity;
        }
        else {
            state.basket.dishes.push(value);
        }

        // log
        console.log("basket updated", state.basket);

        // save the basket
        if (state.basket.IDClient)
            this.dispatch("saveBasket")
    },
    // CREATE
    ['CREATE_BASKET'](state) {
        state.basket =
        {
            IDClient: undefined,
            dishesNumber: 0,
            totalPrice: 0,
            dishes: []
        }
        this.dispatch("saveBasket")
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
