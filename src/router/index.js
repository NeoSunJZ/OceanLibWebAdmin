import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome/Index.vue'

import ForgetPassword from '../views/UserCenter/ForgetPassword.vue'

import Index from '../views/Index.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/experiment/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/user/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },

    {
      path: '/',
      alias: ["/home", "/index"],
      name: 'Index',
      component: Index
    },
  ]
})

export default router
