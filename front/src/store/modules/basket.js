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
            commit('RECEIVE_BASKET', data[0]);
        }
        catch (e) {
            console.log("getBasketError", e);
        }
    },

    async getClientBasket({ state, commit }, args) {
        const res = await reqHand.get(`/baskets/by-client/${args}`);
        try {
            const data = await res.json();
            // console.log("store.basket.getClientBasket() 1:", data);
            commit('RECEIVE_BASKET', data[0]);
            // console.log("store.basket.getClientBasket() 2:", state.basket);
        }
        catch (e) {
            console.log("getBasketError", e);
        }
    },


    async createBasket({ state, commit }, newItem) {
        try {
            console.log("localstorage", localStorage)
            const res = await reqHand.post('/baskets/', newItem);
            const data = await res.json();
            commit('RECEIVE_BASKET', data)
        }
        catch (e) {
            console.log("CreateBasketError :", e)
        }

    },

    // async saveDish({ state, commit }, args) {
    //     const res = await reqHand.put(`/dishes/${args.id}/`, { id: args.id }, args.dish);
    //     const data = await res.json();
    //     commit('RECEIVE_DISH', data)
    // },


    async saveBasket({ state, commit }, args) {
        try {
            const res = await reqHand.put(`/baskets/${state.basket._id}`, { id: state.basket._id }, state.basket);
            const data = await res.json();
            console.log("Basket.saved");
            //commit('RECEIVE_BASKET', data)
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
        console.log("basket synchronized");
    },
    // UDATE BASKET
    ['UPDATE_BASKET'](state, value) {
        state.basket = Object.assign(state.basket, value)
        console.log("basket updated");
    },
    // RECIEVE BASKET STATUSE
    ['RECEIVE_BASKETS_STATUSES'](state, value) {
        state.orders_statuses = Object.assign(state.orders_statuses, value)
    },
    // ADD ITEM
    ['ADD_ITEM'](state, value) {

        state.basket.IDClient = localStorage.getItem("userId");

        // check if the basket is created
        if (!state.basket) {
            console.log("No basket")
            this.commit('CREATE_BASKET');
        }

        // check presence of item
        let idx = -1;
        for (let i = 0; i < state.basket.dishes.length; i++) {
            if (state.basket.dishes[i].idDish == value.idDish)
                idx = i;
        }

        // add quantity or add item
        if (idx != -1) {
            state.basket.dishes[idx].quantity += 1;
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
