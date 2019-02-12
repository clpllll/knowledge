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
    setFlagToken(state,token) {
      state.flagToken = token
    },
    setTime(state, time) {
      state.time = time
    },
    remove_token(state, time) {
      // const halfHour = 10000;
      const halfHour = 60 * 1000 * 30;
      state.flagToken = time - state.time >= halfHour ? false : true;
      removeToken()
    }
  },
  actions: {
    
  }
})
if (getToken()) store.commit('setFlagToken', true);
export default store;