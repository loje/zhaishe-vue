import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: '宅设首页',
    meta: { menu: false },
    component: () => import('@/views/Index'),
  },
  {
    path: '/tools',
    name: '好物',
    meta: { menu: true, keepAlive: true },
    component: () => import('@/views/Tools/index'),
  },
  {
    path: '/activity',
    name: '活动',
    component: () => import('@/views/Activity/index'),
    meta: { menu: true, keepAlive: true },
    // children: [
    //   {
    //     path: '/activity',
    //     name: '全部活动',
    //     component: () => import('@/views/Activity/index'),
    //     meta: { menu: true, keepAlive: true },
    //   },
    //   {
    //     path: '/activity/zhaishe',
    //     name: '宅设主办',
    //     component: () => import('@/views/Activity/index'),
    //     meta: { menu: true, keepAlive: true },
    //   },
    //   {
    //     path: '/activity/recommend',
    //     name: '推荐活动',
    //     component: () => import('@/views/Activity/index'),
    //     meta: { menu: true, keepAlive: true },
    //   },
    //   {
    //     path: '/activity/cooperation',
    //     name: '合作活动',
    //     component: () => import('@/views/Activity/index'),
    //     meta: { menu: true, keepAlive: true },
    //   },
    //   {
    //     path: '/activity/symposium',
    //     name: '探讨会',
    //     component: () => import('@/views/Activity/index'),
    //     meta: { menu: true, keepAlive: true },
    //   },
    //   {
    //     path: '/activity/item',
    //     name: '活动详情',
    //     component: () => import('@/views/Activity/Item'),
    //   },
    //   {
    //     path: '/activity/record',
    //     name: '活动笔记',
    //     component: () => import('@/views/Activity/Record'),
    //   },
    // ],
  },
  {
    path: '/activity/item',
    name: '活动详情',
    component: () => import('@/views/Activity/Item'),
    meta: { menu: false },
  },
  {
    path: '/activity/record',
    name: '活动笔记',
    component: () => import('@/views/Activity/Record'),
    meta: { menu: false },
  },
  {
    path: '/download',
    name: '资源',
    component: () => import('@/views/Download/index'),
    meta: { menu: true, keepAlive: true },
  },
  {
    path: '/designer',
    name: '严选人',
    meta: { menu: true, keepAlive: true },
    component: () => import('@/views/Designer/index'),
  },
  {
    path: '/about',
    name: '关于我们',
    component: () => import('@/views/About/index'),
    meta: { menu: true, keepAlive: true },
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
