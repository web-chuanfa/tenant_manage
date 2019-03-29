

const user = () => import('../routes/user');

const userInfo = () => import('../routes/user/userInfo');

export default {
  path: '/user',
  name: '',
  meta: {
    pathName: '用户管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      name: '用户管理',
      meta: {
        title: '用户管理'
      },
      component: user
    },{
      path: ':id',
      name: '用户信息',
      meta: {
        pathName: '用户信息'
      },
      component: userInfo
    }
  ]
}
