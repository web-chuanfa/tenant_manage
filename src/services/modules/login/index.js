import axios from 'axios'
import {ubsConfig} from '@/services/apiConfig'
const logout = (param) => {
  return axios.get(ubsConfig.login.logout,param)
}
export default {
  logout
}
