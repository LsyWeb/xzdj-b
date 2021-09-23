import Vue from 'vue'
import VueRouter from 'vue-router'
import Activity from '../views/Activity.vue'
import Login from '../views/Login.vue'
import Club from '../views/Club.vue'
import Message from '../views/Message.vue'
import ClubList from '../views/pages/ClubList.vue'
import ClubAdd from '../views/pages/ClubAdd.vue'
import ActivityList from '../views/pages/ActivityList.vue'
import ActivityAdd from '../views/pages/ActivityAdd.vue'

import MessageList from '../views/pages/MessageList.vue'

import store from '../store/index'

Vue.use(VueRouter)
const newRoutes = [
  {
    path: '/club',
    name: 'Club',
    component: Club,
    meta: {
      title: '社团',
      icon:'user-solid'
    },
    children: [
      {
        path: 'list',
        name: 'ClubList',
        component: ClubList,
        meta: {
          title: '社员列表',
          icon:'s-grid'
        },
      },
      {
        path: 'add',
        name: 'ClubAdd',
        component: ClubAdd,
        meta: {
          title: '新增社员',
          icon:'circle-plus'
        },
      }
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity,
    meta: {
      title: '活动',
      icon:'s-opportunity'
    },
    children: [
      {
        path: 'list',
        name: 'ActivityList',
        component: ActivityList,
        meta: {
          title: '活动列表',
          icon:'s-grid'
        },
      },
      {
        path: 'add',
        name: 'ActivityAdd',
        component: ActivityAdd,
        meta: {
          title: '新增活动',
          icon:'circle-plus'
        },
      }
    ]
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {
      title: '留言',
      icon:'s-comment'
    },
    children: [
      {
        path: 'list',
        name: 'MessageList',
        component: MessageList,
        meta: {
          title: '留言列表',
          icon:'s-grid'
        },
      },
    ]
  },
]

const routes = [
  ...newRoutes,
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/club/list'
  },
  {
    path: '*',
    redirect: '/club/list'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user || (from.path == '/login' && to.path == '/club')) {
      store.dispatch('menuRoutesChange', newRoutes)
      return next();
    } else {
      next('/login')
    }
  }
  return next()
})

export default router

