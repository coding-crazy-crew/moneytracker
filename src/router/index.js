import { createRouter, createWebHistory } from "vue-router";
import Calendar from "@/pages/Calendar.vue";
import List from '@/pages/List.vue'

import Register from "@/pages/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home" },
    {path: "/about",name: "about"},
    {path: "/calendar", name: "calendar", component: Calendar},
    {path: '/list',component: List},
    {path: '/register', name: 'register', component: Register}
  ]
})

export default router;
