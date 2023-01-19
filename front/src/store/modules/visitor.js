// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    visitor: {},
}

// getters
const getters = {
    visitor: state => state.visitor,
}

// actions
const actions = {
    async createVisitor({ state, commit }) {
        return reqHand.get('/auth/visitor_token')
            .then((response) => {
                response.json()
                    .then((data) => {
                        localStorage.setItem("accessToken", data.accessToken)
                        console.log(data.accessToken)
                        commit('RECEIVE_VISITOR', { data: data.accessToken })
                    })
            })
    }
}

// mutations
const mutations = {
    ['RECEIVE_VISITOR'](state, data) {
        state.visitor = data
    }/*,
    ['UPDATE_CLIENT'](state, value) {
        state.visitor = Object.assign(state.visitor, value)
    }*/
}

export default {
    state,
    getters,
    actions,
    mutations
}
