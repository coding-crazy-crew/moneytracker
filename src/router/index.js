import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Register from '@/pages/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home},
    { path: '/register', name: 'register', component: Register}
  ]
})

export default router
