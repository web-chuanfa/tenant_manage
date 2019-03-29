
import Vue from 'vue'
let mockUrl = '/static/mock'

// 线上环境需要 /app 路径
if (!Vue.config.productionTip) {
  mockUrl = '/app' + mockUrl
}

const ubsConfig = {
  mockUrl,
  serverUrl: '',
  proxyUrl: '/ubs',
  paths: {
    menus: '/acl/getResources',
    auth: '/auth',
    login: {
      logout: '/logout'
    },
    common: {
      getSso: '/ubs/user/sso', // 判断是否登陆
      getPrivs: '/ubs/user/getprivs', // 获取菜单
    },
    home: {
      overview: {
        geTall: '/ubs/user/getall', // 查找用户
      },
      instanceManagement: {
        getServUsageInfo: '/ubs/usageInfo/getAllData', // 用量搜索联动
        getServerList: '/ubs/usage/resource', // 用量列表
      }
    }
  },
  mockPaths: {
    menus: '/menus.json',
    auth: '/auth.json',
    login: {
      logout: '/auth.json'
    },
    common: {

    },
    home: {
      overview: {
        getNews: '/modules/home/overview/news.json', // 概览新闻
        getOrgsPrivs: '/modules/home/overview/orgsPrivs.json', // 所属组织
        getInsInfo: '/modules/home/overview/insinfo.json', // 我的实例
        getServiceInfo: '/modules/home/overview/serviceinfo.json', // 我的服务
        getInfo: '/modules/home/overview/insfo.json' // 实例信息
      },
      instanceManagement: {
        getSerInfo: '/modules/home/instanceManagement/insinfo.json', // 实例信息列表
        getRenewalList: '/modules/home/instanceManagement/instance.json',// 续费列表
        getServUsageInfo: '/modules/home/instanceManagement/usageInfo.json',
      },
      user: {
        getListInfo: '/modules/home/user/listInfo.json', // 用户列表
        getUserAuthor: '/modules/home/user/userAuthor.json'
      },
      auditLog: {
        getLogList: '/modules/home/auditLog/logList.json'
      }
    },
    userManagement: {
      userAdministration: {

      }
    }
  }
}

export default ubsConfig
