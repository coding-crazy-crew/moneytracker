import { createRouter, createWebHistory } from 'vue-router'
import List from '@/pages/List.vue'

import Register from '@/pages/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list',component: List},
    { path: '/register', name: 'register', component: Register}
  ]
})

export default router
