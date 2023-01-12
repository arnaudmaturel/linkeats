const state = {
    cartItems: [],
    cartCount: 0
}

const getters = {
    itemCount: state => {
        let objSum = []
        let sum = 0

        if(localStorage.getItem('cart')) {
            objSum = JSON.parse(localStorage.getItem('cart'))

            objSum.forEach(element => {
                sum += element.quantity
            });
        }
        state.cartCount = sum

        return state.cartCount;
    },
    getCart: state => {
        if(localStorage.getItem('cart')) {
            state.cartItems = JSON.parse(localStorage.getItem('cart'))
        }
        return state.cartItems;
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
    delItem(state, params) {
        let cart = []
        let isItemFound = state.cartItems.findIndex(i => i.pid === params.pid)

        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
            
            let index = cart.findIndex(i => i.pid === params.pid)
            if (index > -1) {
                cart[index].quantity--
                
                if (state.cartItems[isItemFound].quantity < 1 || state.cartItems[isItemFound].quantity === undefined) {
                    cart.splice(index, 1)
                }
            }
        }

        if (isItemFound > -1) {
            state.cartItems[isItemFound].quantity--;

            if (state.cartItems[isItemFound].quantity < 1) {
                state.cartItems.splice(isItemFound, 1)
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        state.cartItems = cart
    }
}

const actions = {
    addItem(context, item) {
        context.commit(item);
    },
    delItem(context, params) {
        context.commit(params);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}