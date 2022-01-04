import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        navigation: {
            show: false,
        },
        isMobile: false,
    },
    getters: {
        showNavigation: (state) => state.navigation.show,
        isMobile: (state) => state.isMobile,
    },
    mutations: {
        toggleNavigation(state, show) {
            state.navigation.show = show === null ? !state.navigation.show : show;
        },
        setMobile(state, isMobile = false) {
            state.isMobile = isMobile;
        },
    },
    actions: {
        initApp({ commit }, { isMobile }) {
            commit('setMobile', isMobile);
        },
    },
});
