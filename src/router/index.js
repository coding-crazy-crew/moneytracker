import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import Calendar from '@/pages/Calendar.vue'
=======

>>>>>>> 0b20f1a6810811f5c76ca58221ebc305381e8fcb
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
<<<<<<< HEAD
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
=======
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
>>>>>>> 0b20f1a6810811f5c76ca58221ebc305381e8fcb
  ]
})

export default router
