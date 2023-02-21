import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/anChorUser',
  //   component: () => import('@/views/anChorUser/detail'
  //     ),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/anChorUser/index'),
      // meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      meta: { title: 'dashboard', icon: '', affix: true }
    }]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dynamicMgr',
  //   hidden: localStorage.getItem('roleval').toString().indexOf('2') < 0,
  //   children: [{
  //     path: 'dynamicMgr',
  //     name: 'dynamicMgr',
  //     component: () => import('@/views/anChorUser/index'),
  //     // meta: { title: 'dashboard', icon: 'dashboard', affix: true }
  //     meta: { title: 'dynamicMgr', icon: '', affix: true }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/groupMgr',
    // hidden: localStorage.getItem('roleval').toString().indexOf('3') < 0,
    children: [{
      path: 'groupMgr',
      name: 'groupMgr',
      component: () => import('@/views/robotUser/index'),
      meta: { title: 'groupMgr', icon: '', affix: true }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/userMgr',
    // hidden: localStorage.getItem('roleval').toString().indexOf('7') < 0,
    children: [{
      path: 'userMgr',
      name: 'userMgr',
      component: () => import('@/views/maleUser/index'),
      meta: { title: 'userMgr', icon: '', affix: true }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/feedMgr',
    // hidden: localStorage.getItem('roleval').toString().indexOf('6') < 0,
    children: [{
      path: 'feedMgr',
      name: 'feedMgr',
      component: () => import('@/views/feedback/index'),
      meta: { title: 'feedMgr', icon: '', affix: true }
    }]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/bannerMgr',
  //   hidden: localStorage.getItem('roleval').toString().indexOf('5') < 0,
  //   children: [{
  //     path: 'bannerMgr',
  //     name: 'bannerMgr',
  //     component: () => import('@/views/resmanage/mainrecom/mainrecom'),
  //     meta: { title: 'bannerMgr', icon: '', affix: true }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/messsageMgr',
    // hidden: localStorage.getItem('roleval').toString().indexOf('4') < 0,
    children: [{
      path: 'messsageMgr',
      name: 'messsageMgr',
      component: () => import('@/views/chatcomm/index'),
      meta: { title: 'messsageMgr', icon: '', affix: true }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/maleUser',
    hidden: true,
    children: [{
      path: 'maleUser',
      name: 'maleUser',
      component: () => import('@/views/maleUser/detail'),
      meta: { title: '用户管理  /  详情', icon: '', affix: true }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/anChorUser',
    hidden: true,
    children: [{
      path: 'anChorUser',
      name: 'anChorUser',
      component: () => import('@/views/anChorUser/detail'),
      meta: { title: '详情', icon: '', affix: true }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/robotUser',
    hidden: true,
    children: [{
      path: 'robotUser',
      name: 'robotUser',
      component: () => import('@/views/robotUser/detail'),
      meta: { title: '机器人管理  /  详情', icon: '', affix: true }
    }]
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/backgroudMgr',
  //   hidden: localStorage.getItem('roleval').toString().indexOf('1') < 0,
  //   children: [{
  //     path: 'backgroudMgr',
  //     name: 'backgroudMgr',
  //     component: () => import('@/views/investwithdraw/invest/index'),
  //     meta: { title: 'backgroudMgr', icon: '', affix: true }
  //   }]
  // }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
