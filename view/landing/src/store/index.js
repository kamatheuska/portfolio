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
        toggleNavigation(state) {
            state.navigation.show = !state.navigation.show;
        },
    },
});
