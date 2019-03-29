import axios from 'axios'
import {ubsConfig} from './apiConfig'
import login from './modules/login'

// 公共接口
import common from './modules/common'
// 首页管理菜单
import home from './modules/home'

import './httpConfig' // 定制请求和相应拦截器
// globel request
const getMenus = () => {
  return axios.get(ubsConfig.menus)
}
const auth = () => {
  return axios.get(ubsConfig.auth)
}

export default {
  getMenus,
  auth,
  login,
  common,
  home
}
