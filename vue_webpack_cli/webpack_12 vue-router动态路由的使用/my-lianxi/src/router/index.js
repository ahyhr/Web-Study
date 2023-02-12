import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'
// import User from '../views/User.vue'

// 懒加载
const Home = () => import('../views/Home.vue')
const User = () => import('../views/User.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // 懒加载 在使用的时候才加载改文件
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // :userid 动态路径
    path: '/user/:userid',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
