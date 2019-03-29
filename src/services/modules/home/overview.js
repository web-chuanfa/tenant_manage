import axios from 'axios'
import {ubsConfig} from '@/services/apiConfig'

// 概览相关
const getPrivs = (param) => {
  return axios.get(ubsConfig.common.getPrivs, {params:param})
}

// 登陆时需要验证
const getSso = (param) => {
  return axios.get(ubsConfig.common.getSso, { params: param })
}

// 用户
const geTall = (param) => {
  return axios.get(ubsConfig.home.overview.geTall, { params: param })
}

// 概览新闻
const getNews = (param) => {
  return axios.get(ubsConfig.home.overview.getNews, { params: param })
}

// 所属组织
const getOrgsPrivs = (param) => {
  return axios.get(ubsConfig.home.overview.getOrgsPrivs, { params: param })
}

// 我的实例
const getInsInfo = (param) => {
  return axios.get(ubsConfig.home.overview.getInsInfo, { params: param })
}

// 我的服务
const getServiceInfo = (param) => {
  return axios.get(ubsConfig.home.overview.getServiceInfo, { params: param })
}

// 实例信息列表
const getInfo = (param) => {
  return axios.get(ubsConfig.home.overview.getInfo, { params: param })
}

export default {
  getPrivs,
  getSso,
  geTall,
  getServiceInfo,
  getNews,
  getOrgsPrivs,
  getInsInfo,
  getInfo
}
