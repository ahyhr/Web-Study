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
    meta: { 
      title: '首页'
     },
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
        component: HomeMessages,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    meta: { 
      title: '关于'
     }
  },
  {
    path: '/user/:userid',
    name: 'User',
    component: User,
    meta: { 
      title: '用户'
     }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { 
      title: '档案'
     },//路由内守卫 跳转当前页面时执行      组件也可使用
     beforeEnter: (to, from, next) => {
       console.log('档案页面');
       next();
     }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//router.beforeEach 更改title 需要向路由添加meat属性
//前置钩子  路由跳转前执行
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  console.log(to);
  next();
})
//后置钩子  路由跳转后执行
router.afterEach((to, from) => {
  // to and from are both route objects.
})

export default router
