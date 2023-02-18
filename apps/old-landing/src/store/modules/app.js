import { isMobile, isMobileXs } from '@/utils';

const moduleState = () => ({
  isMobile: false,
  isMobileXs: false,
});

const getters = {
  isMobile: (state) => state.isMobile,
  isMobileXs: (state) => state.isMobileXs,
};

const mutations = {
  setMobile(state, value = false) {
    state.isMobile = value;
  },
  setMobileXs(state, value = false) {
    state.isMobileXs = value;
  },
};

const actions = {
  initApp({ commit }) {
    commit('setMobile', isMobile());
    commit('setMobileXs', isMobileXs());
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: false,
  state: moduleState,
};
