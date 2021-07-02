import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')
const HomeNews = () => import('../components/HomeNews.vue')
const HomeMessages = () => import('../components/HomeMessages.vue')
const About = () => import('../views/About.vue')
const User = () => import('../views/User.vue')
const Profile = () => import('../views/Profile.vue')


Vue.use(VueRouter)

const routes = [
  {//默认主页
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    //children home主页的子路由
    children: [
      {
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'messages',
        component: HomeMessages
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/user/:userid',
    name: 'User',
    component: User
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
