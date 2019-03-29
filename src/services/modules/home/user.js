import axios from 'axios'
import {ubsConfig} from '@/services/apiConfig'

// 用户列表
const getListInfo = (param) => {
  return axios.get(ubsConfig.home.user.getListInfo, {params:param})
}

// 用户授权 userAuthor
const getUserAuthor = (param) => {
  return axios.get(ubsConfig.home.user.getUserAuthor, {params:param})
}

export default {
  getListInfo,
  getUserAuthor
}
