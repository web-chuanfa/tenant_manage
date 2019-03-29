// 概览-首页
const overview = () => import('../routes/overview')

export default {
  path: '/overview',
  name: '',
  meta: {
    pathName: '概览'
  },
  component: {render: h => h('router-view', '')},
  children: [
    {
      path: '',
      name: 'overview',
      meta: {
        title: '概览'
      },
      component: overview
    }
  ]
}
