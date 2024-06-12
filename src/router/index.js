import { createRouter, createWebHistory } from "vue-router";
import Calendar from "@/pages/Calendar.vue";
import { createRouter, createWebHistory } from 'vue-router'
import List from '@/pages/List.vue'

import Register from "@/pages/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home" },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendar,
    },
    { path: "/register", name: "register", component: Register, }
  ],
});
    {
      path: '/list',component: List},
    { path: '/register', name: 'register', component: Register}
  ]
})

export default router;
