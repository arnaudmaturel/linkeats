const state = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const getters = {
    getCart: state => {
        if(localStorage.getItem('cart')) {
            state.cartItems = JSON.parse(localStorage.getItem('cart'))
        }
        return state.cartItems;
    },
    itemCount: state => {
        return state.cartCount;
    },
    getTotal: state => {
        return state.cartTotal;
    }
}

const mutations = {
    addItem(state, newItem) {
        let isItemFound = state.cartItems.findIndex(i => i.pid === newItem.pid)
        let cart = []

        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))

            let index = cart.findIndex(i => i.pid === newItem.pid)
            if (index > -1) {
                cart[index].quantity++
            }
        }
        // IF EXIST ADD +1 QTY ELSE ADD NEW ITEM WITH 1 QTY
        if (isItemFound > -1) {
            state.cartItems[isItemFound].quantity++;
        } else {
            newItem.quantity = 1;
            state.cartItems.push(newItem);
            cart.push(newItem)
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        state.cartItems = cart
    },
    delItem(state, item) {
        let cart = []
        let isItemFound = state.cartItems.findIndex(i => i.pid === item.pid)

        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
            
            let index = cart.findIndex(i => i.pid === item.pid)
            if (index > -1) {
                cart[index].quantity--

                if (cart[index].quantity < 1) {
                    cart.splice(index, 1)
                }
            }
        }
        // IF EXIST ADD -1 QTY ELSE DEL ITEM
        if (isItemFound > -1) {
            state.cartItems[isItemFound].quantity--

            if (state.cartItems[isItemFound].quantity < 1) {
                state.cartItems.splice(isItemFound, 1)
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        state.cartItems = cart
    },
    setCount(state) {
        let objSum = []
        let sum = 0

        if(localStorage.getItem('cart')) {
            objSum = JSON.parse(localStorage.getItem('cart'))

            objSum.forEach(element => {
                sum += element.quantity
            });
        }
        state.cartCount = sum
    },
    setTotal(state) {
        let objSum = []
        let sum = 0

        if(localStorage.getItem('cart')) {
            objSum = JSON.parse(localStorage.getItem('cart'))

            objSum.forEach(element => {
                sum += element.price * element.quantity
            });
        }
        state.cartTotal = sum
    }
}

const actions = {
    async addItem({ commit, item }) {
        commit("addItem", item);
    },
    delItem({ commit, item }) {
        commit("delItem", item);
    },
    async getCount({ commit }) {
        commit("setCount")
    },
    async getTotal({ commit }) {
        commit("setTotal")
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}