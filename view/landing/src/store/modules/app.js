const moduleState = () => ({
    isMobile: false,
});

const getters = {
    isMobile: (state) => state.isMobile,
};

const mutations = {
    setMobile(state, isMobile = false) {
        state.isMobile = isMobile;
    },
};

const actions = {
    initApp({ commit }, { isMobile }) {
        commit('setMobile', isMobile);
    },
};

export default {
    actions,
    getters,
    mutations,
    namespaced: false,
    state: moduleState,
};
