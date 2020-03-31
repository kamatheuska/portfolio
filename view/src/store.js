import Vue from 'vue'
import Vuex from 'vuex'
import mobileAndTabletcheck from './detectMobile'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentProject: '',
        isMobile: false
    },
    getters: {
        currentProject: (state) => state.currentProject
    },
    mutations: {
        setCurrentProject(state, project) {
            state.currentProject = project
        },
        setMobileDevice (state) {
            state.isMobile = mobileAndTabletcheck() 
        }
    },
    actions: {
        setCurrentProject({ commit }, project) {
            commit('setCurrentProject', project)
        },
        isMobileDevice ({ commit }) {
            commit('setMobileDevice')
            
        }
    }
});
