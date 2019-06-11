import Vue from 'vue'
import Vuex from 'vuex'
import cinema from './cinema'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cinema
  }
})
