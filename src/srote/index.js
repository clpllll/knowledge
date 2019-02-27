import Vue from 'vue'
import Vuex from 'vuex';
import { getToken, removeToken } from '@/util/token'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    time: 0,
    flagToken:false,
  },
  mutations: {
    setFlagToken(state, token) {
      state.flagToken = token;
      state.time = new Date().getTime();
    },
    setTime(state, time) {
      if (state.flagToken) {
        const halfHour = 60 * 1000 * 30;
        state.flagToken = !(time - state.time >= halfHour) ;
        if (time - state.time >= halfHour) removeToken()
      }
      state.time = time;
    },
  },
  actions: {
    
  }
})
if (getToken()) store.commit('setFlagToken', true);
export default store;