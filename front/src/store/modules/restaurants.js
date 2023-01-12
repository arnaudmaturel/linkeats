import restaurants from '../../api/restaurants'

const state = {
    allRestaurants: []
}

const getters = {
    getAllRestaurants: state => {
        return state.allRestaurants;
    }
}

const mutations = {
    setRestaurants(state, restaurants) {
        state.allRestaurants = restaurants;
    }
}

const actions = {
    getAllRestaurants({ commit }) {
        restaurants.getRestaurants(restaurants => {
            commit("setRestaurants", restaurants);
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}