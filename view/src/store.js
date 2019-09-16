import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        animation: {
            done: false
        },
        skipIntro: false
    },
    getters: {
        showIntroStatus: (state) => state.animation.done
    },
    mutations: {
        setAnimationStatus(state, status) {
            state.animation.done = status
        }
    },
    actions: {
        changeAnimationStatus({ commit }, status) {
            commit('setAnimationStatus', status)
        }
    }
});
