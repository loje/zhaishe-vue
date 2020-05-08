import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const routes = [
  {
    path: '',
    component: () => import('@/views/Black'),
    children: [
      {
        path: '/',
        name: '首页',
        meta: { menu: true },
        component: () => import('@/views/Index'),
      },
      {
        path: '/tools',
        name: '设计师工具',
        meta: { menu: true, keepAlive: true },
        component: () => import('@/views/Tools/index'),
      },
      {
        path: '/tools/item/:id',
        name: '设计师工具详情',
        component: () => import('@/views/Tools/Item'),
        meta: { menu: false },
      },
      {
        path: '/tools/payment',
        name: '支付详情',
        component: () => import('@/views/Tools/Payment'),
        meta: { menu: false },
      },
      {
        path: '/activity',
        name: '宅社活动',
        component: () => import('@/views/Activity/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/activity/item/:id',
        name: '活动详情',
        component: () => import('@/views/Activity/Item'),
        meta: { menu: false },
      },
      {
        path: '/activity/record/:id',
        name: '活动笔记',
        component: () => import('@/views/Activity/Record'),
        meta: { menu: false },
      },
      {
        path: '/download',
        name: '灵感库',
        component: () => import('@/views/Download/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/download',
        name: '私单墙',
        component: () => import('@/views/Download/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/designer',
        name: '宅设分享人',
        meta: { menu: true, keepAlive: true },
        component: () => import('@/views/Designer/index'),
      },
      {
        path: '/about',
        name: '关于我们',
        component: () => import('@/views/About/index'),
        meta: { menu: false, keepAlive: true },
      },
      // {
      //   path: '/user/:objectId',
      //   name: '个人中心',
      //   component: () => import('@/views/User/index'),
      //   meta: { menu: false, keepAlive: true },
      // },
      {
        path: '/user/:tag',
        name: '个人中心',
        component: () => import('@/views/User/index'),
        meta: { menu: false, keepAlive: true },
      },
      {
        path: '/auth',
        name: '身份验证',
        meta: { menu: false },
        component: () => import('@/views/Auth/index'),
      },
    ],
  },
]

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
