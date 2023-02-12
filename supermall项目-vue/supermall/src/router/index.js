import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home.vue')
const Category = () => import('@/views/category/Category.vue')
const Shopcart = () => import('@/views/shopcart/Shopcart.vue')
const Profile = () => import('@/views/profile/Profile.vue')
const Detail = () => import('@/views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {title: '首页'}
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
    meta: {title: '购物车'}
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {title: '分类'}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {title: '我的'}
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {title: '详情'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
})

export default router
