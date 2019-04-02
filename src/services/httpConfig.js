import axios from 'axios'
import Vue from 'vue'
import cookie from 'js-cookie'
axios.defaults.withCredentials = true
// var instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
let tenantId = cookie.get('tenantId'),
  username = cookie.get("username"),
  userid = cookie.get("userid");
axios.defaults.headers = {
  'tenantId': tenantId,
  'username': username,
  'userid': userid
}
axios.defaults.timeout = 5*1000
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    Vue.prototype.$store.state.loadingTime = new Date().getTime()
    Vue.prototype.$store.commit('showLoading')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  Vue.prototype.$store.commit('hideLoading')
  // 接口参数，权限问题，统一提示，然后错误（业务模块选择性处理）
  if (response.data.errcode === 1) {
    Vue.prototype.$message.error(response.data.error.message)
    return Promise.reject(response.data.error)
  }
  return response.data.data
}, function (error) {
  Vue.prototype.$store.commit('hideLoading')
  // 网络问题，通过2种方式提示，业务不处理
  Vue.prototype.$message.error(error.toString())
})
