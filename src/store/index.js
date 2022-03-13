import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: []
  },
  getters: {
    getTable : s => s.records
  },
  mutations: {
    setNewRecord(state, record){
      state.records.push(record)
    }
  },
  actions: {
    setRecord({commit}, record){
      commit('setNewRecord', record)
    }
  },
  modules: {
  }
})
