const state = {
    cartItems: [],
    cartCount: 0
}

const getters = {
    itemCount: state => {
        const sum = 0
        state.cartItems.length

        return sum;
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
            state.cartCount++
        } else {
            newItem.quantity = 1;
            state.cartItems.push(newItem);
            cart.push(newItem)
            state.cartCount++
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        state.cartItems = cart
    },
    delItem(state, params) {
        let objItem = {
            pid: params.pid,
            title: params.title,
            price: params.price,
            tags: params.tags,
            quantity: params.quantity
        }
        let strItem = JSON.stringify(objItem)

        let isItemFound = state.cartItems.findIndex(i => i.pid === params.pid)

        if (isItemFound > -1) {
            state.cartItems[isItemFound].quantity--;

            if (state.cartItems[isItemFound].quantity < 1) {
                state.cartItems.splice(isItemFound, 1)
                localStorage.removeItem('cart', strItem);
            } else {
                localStorage.removeItem('cart', strItem);
                objItem = {
                    pid: params.pid,
                    title: params.title,
                    price: params.price,
                    tags: params.tags,
                    quantity: state.cartItems[isItemFound].quantity
                }
                strItem = JSON.stringify(objItem)
                localStorage.setItem('cart', (strItem));
            }
            state.cartCount--
        } 
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