import { createRouter, createWebHistory } from 'vue-router'
import List from '@/pages/List.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list',component: List
    }
  ]
})

export default router
