// import Vuex from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loadingTime: 0,
    loading: false,
    textCont: 'store 存储的 text',
    breadcrumbBtn: {},
    menu_name: '概览'
  },
  getters: {
    menuName: state => state.menu_name,
    textCont: state => state.textCont,
    breadcrumbBtn: state => state.breadcrumbBtn
  },
  mutations: {
    showLoading (state) {
      state.loading = true
    },
    hideLoading (state) {
      let endTime = new Date().getTime()
      let interval = 500 - (endTime - state.loadingTime)
      if (interval < 0) {
        state.loading = false
      } else {
        setTimeout(() => {
          state.loading = false
        }, interval)
      }
    },
    updateText (state, params) {
      state.textCont = params
    },
    updateBreadcrumbBtn (state, newBreadcrumbBtn) {
      state.breadcrumbBtn = newBreadcrumbBtn
    },
    updateMenuname (state, name) {
      state.menu_name = name
    }
  },
  actions: {
    upMenuname ({commit},name) {
      commit('updateMenuname', name)
    }
  }
})

// 方便 axios 调用
Vue.prototype.$store = store

export default store
