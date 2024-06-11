import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD

import Main from '@/pages/Main.vue'
import Register from '@/pages/Register.vue'
=======
>>>>>>> 14b8369d26aa01ead5302a1dbb4d4516b8711cf6

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
<<<<<<< HEAD
    { path: '/', name: 'main', component: Main },
    { path: '/register', name: 'register', component: Register}
=======
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
>>>>>>> 14b8369d26aa01ead5302a1dbb4d4516b8711cf6
  ]
})

export default router
