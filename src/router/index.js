import { createRouter, createWebHistory } from 'vue-router'
import PublicLayouts from '@/layouts/PublicLayouts.vue'

import LoginView from '@/views/LoginView.vue'
import HomePage from '@/views/MainApp/HomePage.vue'
import ComingSoon from '@/components/ComingSoon.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: PublicLayouts
   
  },
  {
    path: '/register',
    name: 'ComingSoon',
    component: ComingSoon
  },
  {
    path: '/rm ',
    name: 'RegisterPage',
    component: () => import('../views/RegisterView.vue')
   
  },
    {
    path: '/login',
    name: 'LoginPage',
    component: LoginView,
   
  },
   {
    path: '/dashboard/home',
    name: 'HomePage',
    component: HomePage,
   
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
