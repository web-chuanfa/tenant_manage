# biyao-cms

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
## 功能使用
``` bash
#vue官方文档地址 
https://cn.vuejs.org/v2/guide/

# router
异步按需加载组件
const privilegeConfig = () => import('../routes/privilegeConfig')
动画 transition fade-in
缓存 keep-alive 
其他：参考官方文档

# 组件通讯（单向数据传递）
数据单向传递：父=>子（子组件不能直接修改父级传递的数据，必须通过事件交互完成） 
事件交互：子->父（调用父组件的方法，或触发父组件绑定的事件）
         父->子 （通过$refs.xxx访问自己的的方法） 

# vuex （全局状态管理->数据逻辑层抽离）
1、共享数据管理 （降低组件通讯的复杂性，提高效率)
2、数据逻辑层抽离 （通过modules去分割不同的model）

# services
接口服务成抽离，mock数据

# layout 
布局组件实现cms公共布局ui
    index.vue索引文件：负责布局组装，面包屑导航
    menu.vue 菜单组件:负责一级菜单样式及二级菜单调用、状态管理  (根据$route path 计算对应的菜单状态)
    menuTree.vue 树形菜单：负责递归显示二级菜单
    subMenu.vue 树形菜单的降级方案
    top.vue 头部组件
```



## imgView 

``` bash
# import and register
import imgView from '@/components/imgView'
Vue.component(imgView.name, imgView)

# use
<img-view :src="xxx" width="50px" height="50px" eleClass="small-img" />

# props
:src  small img src  type:String  --- requred
width|height|alt: small img width|height|alt  type:String
eleClass： small img className type:String  --- recommend
eleStyle: small img style type:Object --- not recommend
viewStyle: enlarge img style type:Object  
---src: enlarge img src  type:String default is img src
---width|height: enlarge img width|height  type:String(need postfix 'px')  default: '500px'
---class：enlarge img className type:String
 
``` 
## 编码规范
``` bash
# eslint for vue-cli 基本规则
1、使用单引号 ''
2、每行结束统一不适用分号 ;
3、js关键字、运算符、变量之间需要空格
4、所有代码请不要设置多余的空位字符（空格和换行）
5、使用两个空格控制代码缩进
6、使用全等判断 ===
7、let和const的使用
8、不允许变量声明，但未使用
# 风格指南
1、html（template）与style样式表内请使用 “-”链接单词,如组件传参：“<child-componennt :list-data="listData">”；js内请接收使用驼峰 如：props:{listData:Array}
https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90
```
