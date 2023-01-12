import menus from '../../api/menus'

const state = {
    allMenus: []
}

const getters = {
    getAllMenus: state => store => {
      return state.allMenus.filter(menu => menu.tags === store);
    }
}

const mutations = {
    setMenus(state, menus) {
        state.allMenus = menus;
    }
}

const actions = {
    getAllMenus({ commit }) {
        menus.getMenus(menus => {
            commit("setMenus", menus);
        });
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}