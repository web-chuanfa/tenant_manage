import Vue from 'vue'
import Router from 'vue-router'
import services from '@/services'
// 概览
import overview from './overview'
// 用户管理
import user from './user'
// 实例管理
import insManage from './insManage'
// 审计日志
import auditLog from './auditLog'

import cookie from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    overview,
    user,
    insManage,
    auditLog
  ]
})

// router.beforeResolve((to, from, next) => {
// //document.title = to.meta.title || to.meta.pathName
//  //next()
// })

cookie.set('tenantId', '6e15f686-231a-4144-8c3d-22dc5fba90ef', 24 * 3600 * 1000)
cookie.set('userid', '20180808112510707-9031-F790CF0ED', 24 * 3600 * 1000)
cookie.set('username', 'p-zhaonina', 24 * 3600 * 1000)

router.beforeEach((to, from, next) => {
  // 拿cookie
  let tenantId = cookie.get('tenantId'),
    username = cookie.get("username"),
    userid = cookie.get("userid");
  if(!tenantId && !username && !userid) {
    // next('/login');
    // 跳转登录页面（非vue路由页面, 开发环境的webpack server不支持与非server环境的页面交互）
    window.location.href = 'https://uuidp.c.citic/idp/sso.do?client_id=20171206123642565-5F74-4D1CDBEE5&response_type=code&redirect_uri=https%3A//www.c.citic/citic-web-ui/&state=1231&auth_type=null';
  } else {
    next();
  }
  // 如果想去的页面，设置了meta.notAuth  就不会鉴权
  // if (to.matched.some(record => record.meta.notAuth)) {
  //   next()
  // } else {
  //   // 鉴权
  //   services.auth().then(res => {
  //     next()
  //   }, err => {
  //     next()
  //     // 跳转登录 路由
  //     // next({
  //     //   path: '/login',
  //     //   query: { redirect: to.fullPath }
  //     // })
  //     // 跳转登录页面（非vue路由页面, 开发环境的webpack server不支持与非server环境的页面交互）
  //     window.location.href = 'http://test.datacloud.c.citic/index.html?' + to.fullPath
  //   })
  // }
})

export default router
