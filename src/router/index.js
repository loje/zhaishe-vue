import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: '首页',
    meta: { menu: true },
    component: () => import('@/views/Index'),
  },
  {
    path: '/tools',
    name: '工具',
    meta: { menu: true, keepAlive: true },
    component: () => import('@/views/Tools/index'),
  },
  {
    path: '/activity',
    name: '活动',
    component: () => import('@/views/Black'),
    meta: { menu: true, keepAlive: true },
    children: [
      {
        path: '/activity',
        name: '全部活动',
        component: () => import('@/views/Activity/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/activity/zhaishe',
        name: '宅设主办',
        component: () => import('@/views/Activity/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/activity/recommend',
        name: '推荐活动',
        component: () => import('@/views/Activity/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/activity/cooperation',
        name: '合作活动',
        component: () => import('@/views/Activity/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/activity/symposium',
        name: '探讨会',
        component: () => import('@/views/Activity/index'),
        meta: { menu: true, keepAlive: true },
      },
      {
        path: '/activity/item',
        name: '活动详情',
        component: () => import('@/views/Activity/Item'),
      },
      {
        path: '/activity/record',
        name: '活动笔记',
        component: () => import('@/views/Activity/Record'),
      },
    ],
  },{
    path: '/download',
    name: '下载',
    component: () => import('@/views/Download/index'),
    meta: { menu: true, keepAlive: true },
  },
  {
    path: '/about',
    name: '关于我们',
    component: () => import('@/views/About/index'),
    meta: { menu: true, keepAlive: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
