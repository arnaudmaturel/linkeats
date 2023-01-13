import restaurants from '../../api/restaurants'

const state = {
    allRestaurants: [],
    restaurantInfo: []
}

const getters = {
    getAllRestaurants: state => {
        return state.allRestaurants;
    },
    getRestaurantByName: state => store => {
        let info = []
        info = state.allRestaurants.filter(restaurants => restaurants.title === store);

        state.restaurantInfo = info

        return state.restaurantInfo
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