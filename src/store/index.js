import Vue from 'vue'
import Vuex from 'vuex'
import { tourStore } from './tourStore.js'
import { orderStore } from './orderStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tourStore,
    orderStore
  }
})
