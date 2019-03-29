
// 实例信息
const insManage = () => import('../routes/insManage');
// 用量报告
const useReport = () => import('../routes/insManage/useReport');
// 实例权限
const insAuthor = () => import('../routes/insManage/insAuthor');

export default {
  path: '/insManage',
  name: 'insManage',
  meta: {
    pathName: '实例管理'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      name: 'insManage',
      meta: {
        pathName: '实例信息'
      },
      component: insManage
    },
    {
      path: 'useReport',
      name: 'useReport',
      meta: {
        pathName: '用量报告'
      },
      component: useReport
    },
    {
      path: 'insAuthor',
      name: 'insAuthor',
      meta: {
        pathName: '实例权限'
      },
      component: insAuthor
    }
  ]
}
