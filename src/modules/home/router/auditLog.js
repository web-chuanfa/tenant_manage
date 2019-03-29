// 概览-首页
const auditLog = () => import('../routes/auditLog')

export default {
  path: '/auditLog',
  name: '',
  meta: {
    pathName: '审计日志'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      name: '审计日志',
      meta: {
        title: '审计日志'
      },
      component: auditLog
    }
  ]
}
