import axios from 'axios'
import {ubsConfig} from '@/services/apiConfig'

// 审计日志列表
const getLogList = (param) => {
  return axios.get(ubsConfig.home.auditLog.getLogList, {params:param})
}

export default {
  getLogList
}
