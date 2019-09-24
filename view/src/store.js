import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        intro: {
            animation: {
                done: false
            },
            skipIntro: false
        }
    },
    getters: {
        isIntroDone: (state) => state.intro.animation.done
    },
    mutations: {
        setAnimationStatus(state, isDone) {
            state.intro.animation.done = isDone
        }
    },
    actions: {
        changeAnimationStatus({ commit }, isDone) {
            commit('setAnimationStatus', isDone)
        }
    }
});
