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
        let isItemFound = state.cartItems.findIndex(i => i.dishName.id === newItem.dishName.id)
        let cart = []
        console.log(newItem)

        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))

            let index = cart.findIndex(i => i.dishName.id === newItem.dishName.id)
            if (index > -1) {
                if (isItemFound > -1)
                    cart[index].dishName.quantity++
            }
        }
        // IF EXIST ADD +1 QTY ELSE ADD NEW ITEM WITH 1 QTY
        if (isItemFound > -1) {
            state.cartItems[isItemFound].dishName.quantity++;
        } else {
            newItem.dishName.quantity = 1;
            state.cartItems.push(newItem);
            cart.push(newItem)
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        state.cartItems = cart
    },
    delItem(state, item) {
        let cart = []
        let isItemFound = state.cartItems.findIndex(i => i.dishName.id === item.dishName.id)

        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))

            let index = cart.findIndex(i => i.dishName.id === item.dishName.id)
            if (index > -1) {
                cart[index].dishName.quantity--

                if (cart[index].dishName.quantity < 1) {
                    cart.splice(index, 1)
                }
            }
        }
        // IF EXIST ADD -1 QTY ELSE DEL ITEM
        if (isItemFound > -1) {
            state.cartItems[isItemFound].dishName.quantity--

            if (state.cartItems[isItemFound].dishName.quantity < 1) {
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
                sum += element.dishName.quantity
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
                sum += element.dishName.price * element.dishName.quantity
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