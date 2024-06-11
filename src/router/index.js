import { createRouter, createWebHistory } from 'vue-router'
import List from '@/pages/List.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list',component: List},
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
})

export default router
