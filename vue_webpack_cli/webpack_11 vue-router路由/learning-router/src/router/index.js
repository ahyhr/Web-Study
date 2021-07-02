//配置路由相关的信息
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

//1.通过Vue.use(插件),安装插件
Vue.use(VueRouter)

//3.routes 配置路由和组件之间的应用关系
const routes = [
  {
    //默认显示的页面
    path: '/',
    //redirect 重定向
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

//2.创建VueRouter对象
const router = new VueRouter({
  mode: 'history',//配置模式
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'  //更改class='router-link-active'的默认名
})

//4.将router对象传入到vue实例中
export default router
