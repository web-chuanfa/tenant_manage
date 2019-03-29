import axios from 'axios'
import {ubsConfig} from '@/services/apiConfig'

// 用量报告
const getServUsageInfo = (param) => {
  return axios.get(ubsConfig.home.instanceManagement.getServUsageInfo, { params: param })
}

// 用量报告列表
const getServerList = (param) => {
  return axios.get(ubsConfig.home.instanceManagement.getServerList, { params: param })
}

// 实例信息列表
const getSerInfo = (param) => {
  return axios.get(ubsConfig.home.instanceManagement.getSerInfo, { params: param })
}
// 续费列表
const getRenewalList = (param) => {
  return axios.get(ubsConfig.home.instanceManagement.getRenewalList, { params: param })
}
export default {
  getServUsageInfo,
  getServerList,
  getSerInfo,
  getRenewalList
}
