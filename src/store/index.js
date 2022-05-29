import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    token:localStorage.getItem('token')?localStorage.getItem('token'):null,
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setToken(state, token) {

      state.token = token;

    },
  },
  actions: {
    login(vuexContext, token) {
      vuexContext.commit('setToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
  },
  modules: {},
})
