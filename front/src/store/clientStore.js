import { CreateStore } from "vuex";

import {
    GET_FISRTNAME,
    GET_LASTNAME,
    GET_ISLINKER,
    GET_CURRENTXP,
    GET_NEXTLVLXP,
    GET_LVL,
    GET_WALLET,
    SET_FISRTNAME,
    SET_LASTNAME,
    SET_ISLINKER,
    SET_CURRENTXP,
    SET_NEXTLVLXP,
    SET_LVL,
    SET_WALLET
} from "./mutation-types";


const clientStore = new CreateStore({
    // states == data
    state:
    {
        firstname: "",
        lastname: "",
        isLinkerEnable: false,
        currentXP: 0,
        nextLvlXP: 0,
        level: 0,
        wallet: 0,
    },

    // getters == readonly accessors
    getters:
    {
        [GET_FISRTNAME](state) { return state.firstname; },
        [GET_LASTNAME](state) { return state.lastname; },
        [GET_ISLINKER](state) { return state.isLinkerEnable; },
        [GET_CURRENTXP](state) { return state.currentXP; },
        [GET_NEXTLVLXP](state) { return state.nextLvlXP; },
        [GET_LVL](state) { return state.level; },
        [GET_WALLET](state) { return state.wallet; }
    },

    // mutuation == instant setter
    mutations:
    {
        [SET_FISRTNAME](state, value) { state.firstname = value; },
        [SET_LASTNAME](state, value) { state.lastname = value; },
        [SET_ISLINKER](state, value) { state.isLinkerEnable = value; },
        [SET_CURRENTXP](state, value) { state.currentXP = value; },
        [SET_NEXTLVLXP](state, value) { state.nextLvlXP = value; },
        [SET_LVL](state, value) { state.level = value; },
        [SET_WALLET](state, value) { state.wallet = value; }
    },

    // actions = async methods
    actions:
    {
        [SET_FISRTNAME]({ commit, state }, value) { commit('', value); },
        [SET_LASTNAME]({ commit, state }, value) { commit('', value); },
        [SET_ISLINKER]({ commit, state }, value) { commit("", value); },
        [SET_CURRENTXP]({ commit, state }, value) { commit("", value); },
        [SET_NEXTLVLXP]({ commit, state }, value) { commit("", value); },
        [SET_LVL]({ commit, state }, value) { commit("", value); },
        [SET_WALLET]({ commit, state }, value) { commit("", value) }
    }
});

export default clientStore;