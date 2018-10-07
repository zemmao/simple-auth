import auth from '@/api/auth';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('APP_TOKEN') || null)
  },
  mutations: {
    login(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, credentials) {
      return auth.login(credentials)
        .then(user => commit('login', user));
    },
    logout() {
      return auth.logout()
        .then(() => setTimeout(() => {
          window.localStorage.removeItem('APP_USER');
          window.location.reload();
        }, 0));
    },
    register(context, payload) {
      return auth.register(payload);
    },
    resetPassword(context, payload) {
      return auth.resetPassword(payload);
    },
    resetEmail(context, payload) {
      return auth.resetEmail(payload);
    }
  }
});
