import menus from '../../api/menus'

const state = {
    allMenus: [],
    menuInfo: []
}

const getters = {
    getAllMenus: state => store => {
        return state.allMenus.filter(menu => menu.tags === store);
    },
    getMenu: state => store => {
        let info = []
        info = state.allMenus.filter(menu => menu.title === store);
        
        state.menuInfo = info

        return state.menuInfo
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