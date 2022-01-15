const moduleState = () => ({
    show: false,
    logo: {
        show: false,
    },
});

const getters = {
    showNav: (state) => state.show,
    showLogo: (state) => state.logo.show,
};

const mutations = {
    toggleNav(state, show) {
        state.show = show === null ? !state.show : show;
    },
    toggleLogo(state, show) {
        state.logo.show = show === null ? !state.logo.show : show;
    },
};

const actions = {};

export default {
    actions,
    getters,
    mutations,
    namespaced: true,
    state: moduleState,
};
