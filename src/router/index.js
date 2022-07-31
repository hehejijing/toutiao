import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
