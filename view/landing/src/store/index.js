import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        navigation: {
            show: false,
        },
    },
    getters: {
        showNavigation: (state) => state.navigation.show,
    },
    mutations: {
        toggleNavigation(state, show) {
            state.navigation.show = show === null ? !state.navigation.show : show;
        },
    },
});
