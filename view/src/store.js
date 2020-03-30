import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentProject: ''
    },
    getters: {
        currentProject: (state) => state.currentProject
    },
    mutations: {
        setCurrentProject(state, project) {
            state.currentProject = project
        }
    },
    actions: {
        setCurrentProject({ commit }, project) {
            commit('setCurrentProject', project)
        }
    }
});
