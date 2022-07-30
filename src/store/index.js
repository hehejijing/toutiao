import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: getToken() || {}
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      setToken(payload)
    }
  }
})
