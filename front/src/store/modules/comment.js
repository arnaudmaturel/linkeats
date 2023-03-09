// import helpers from '@/helpers'
import reqHand from '../fetch'

// initial state
const state = {
    commentResto: {},
    commentdeliver: {},
    comments: []
}

// getters
const getters = {
    comment: state => state.comment,
    comments: state => state.comment
}

// actions
const actions = {

    async getAllComments({ state, commit }, args) {
        const res = await reqHand.get('/comments/' + args);
        const data = await res.json();
        await commit('RECEIVE_COMMENTS', data)
    },

    async getAllClientComments({ state, commit }, args) {
        const res = await reqHand.get('/comments/by-client/' + args);
        if (res.status != 200)
            return;
        const data = await res.json();
        await commit('RECEIVE_COMMENTS', data)
    },

    async getAllNotedUserComments({ state, commit }, args) {
        const res = await reqHand.get('/comments/by-userNoted/' + args, "");
        const data = await res.json();
        await commit('RECEIVE_COMMENTS', data)
    },

    async getComment({ state, commit }, args) {
        const res = await reqHand.get('/comments/' + args);
        const data = await res.json();
        await commit('RECEIVE_DISCOUNT', data)
    },


    async getOnlyComment({ state, commit }, args) {
        const res = await reqHand.get('/comments/' + args, { id: args.id });
        const data = await res.json();
        return data;
    },

    async createComment({ state, commit }, newcomment) {
        const res = await reqHand.post('/comments/', newcomment);
        const data = await res.json();
        return data;
    },

    async saveComment({ state, commit }, args) {
        const res = await reqHand.put(`/comments/${args.id}/`, { id: args.id }, args.comment);
    },

    async deleteComment({ state, commit }, args) {
        const res = await reqHand.delete(`/comments/${args._id}/`, { id: args._id });
        const data = await res.json();
    },
}

// mutations
const mutations = {
    async ['RECEIVE_COMMENTS'](state, data) {
        state.comments = data;
    },
    async ['RECEIVE_COMMENT'](state, data) {
        state.comment = data;
    },
    async ['UPDATE_COMMENT'](state, value) {
        state.comment = await Object.assign(state.discount, value);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
