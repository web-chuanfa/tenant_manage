/**
 * 放置一些公共接口
 */
import axios from 'axios'
import {ubsConfig} from '@/services/apiConfig'

// 判断是否登陆 username=p-zhaonina; tenantId=6e15f686-231a-4144-8c3d-22dc5fba90ef; userid=20180808112510707-9031-F790CF0ED
const getSso = (param) => {
  return axios.get(ubsConfig.common.getSso, { params: param })
}
// 获取菜单 ==>test
const getPrivs = (param) => {
  return axios.get(ubsConfig.common.getPrivs, { params: param })
}

export default {
  getPrivs,
  getSso
}
