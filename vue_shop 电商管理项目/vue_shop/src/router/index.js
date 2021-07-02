import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Login = () => import('@/views/login/Login');
const Home = () => import('@/views/home/Home');
const Welcome = () => import('@/views/home/childComps/welcome/Welcome');
const Users = () => import('@/views/home/childComps/users/Users');
const Rights = () => import('@/views/home/childComps/power/rights/Rights');
const Roles = () => import('@/views/home/childComps/power/roles/Roles');
const Categories = () => import('@/views/home/childComps/goods/categories/Categories');
const Params = () => import('@/views/home/childComps/goods/params/Params');
const List = () => import('@/views/home/childComps/goods/list/List');
const AddGoods = () => import('@/views/home/childComps/goods/list/childComps/AddGoods.vue');
const Orders = () => import('@/views/home/childComps/orders/Orders.vue');
const Reports = () => import('../views/home/childComps/reports/Reports.vue');


const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: List },
      { path: '/goods/addGoods', component: AddGoods },
      { path: '/orders', component: Orders },
      { path: '/reports', component: Reports }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//设置路由权限  没有登录不能访问home页面
router.beforeEach((to, from, next) => {
  // 如果是登录页面放行
  if (to.path === '/login') return next();

  //判断是否有 token
  const token = window.sessionStorage.getItem('token');
  // 没有跳转登录页面
  if (!token) return next('/login');
  //有 放行
  next();
})

export default router
