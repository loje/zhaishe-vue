import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = (r) => require.ensure([], () => r(require('@/views/Index')), 'init');
const Tools = (r) => require.ensure([], () => r(require('@/views/Tools/index')), 'init');
const Activity = (r) => require.ensure([], () => r(require('@/views/Activity/index')), 'init');
const Download = (r) => require.ensure([], () => r(require('@/views/Download/index')), 'init');
const About = (r) => require.ensure([], () => r(require('@/views/About/index')), 'init');

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'index',
    meta: { menuName: '首页' },
    component: Index
  },
  {
    path: '/tools',
    name: 'tools',
    meta: { menuName: '工具' },
    component: Tools
  },
  {
    path: '/activity',
    name: 'activity',
    meta: { menuName: '活动' },
    component: Activity,
    children: [
      {
        path: '/activity',
        name: 'activity',
        meta: { menuName: '全部活动' },
        component: Activity,
      },
      {
        path: '/activity/zhaishe',
        name: 'zhaishe',
        meta: { menuName: '宅设主办' },
        component: Activity,
      },
      {
        path: '/activity/recommend',
        name: 'recommend',
        meta: { menuName: '推荐活动' },
        component: Activity,
      },
      {
        path: '/activity/cooperation',
        name: 'cooperation',
        meta: { menuName: '合作活动' },
        component: Activity,
      },
      {
        path: '/activity/symposium',
        name: 'symposium',
        meta: { menuName: '探讨会' },
        component: Activity,
      },
      {
        path: '/activity/item',
        name: 'activityItem',
        meta: { menuName: '活动详情' },
        component: (r) => require.ensure([], () => r(require('@/views/Activity/Item')), 'init'),
      },
    ],
  },{
    path: '/download',
    name: 'download',
    meta: { menuName: '下载' },
    component: Download
  },
  {
    path: '/about',
    name: 'about',
    meta: { menuName: '关于我们' },
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
