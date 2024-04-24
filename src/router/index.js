import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import userRoutes from '@/router/modules/user'
import deptRoutes from '@/router/modules/dept'
import systemRoutes from '@/router/modules/system'
import autoCodeRoutes from '@/router/modules/autocode'

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/init',
    name: 'Init',
    component: () => import('@/views/init/index.vue'),
    hidden: true,
    meta: { title: '初始化' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'app-group-fill', affix: true }
      }
    ]
  },
  ...userRoutes,
  ...deptRoutes,
  ...autoCodeRoutes,
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: { title: '个人设置', icon: 'user-setting', affix: false }
      }
    ]
  },
  ...systemRoutes,
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  // 创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
