import { createRouter, createWebHistory } from "vue-router";
import Calendar from "@/pages/Calendar.vue";
import List from '@/pages/List.vue';
import Register from "@/pages/Register.vue";
import Home from '@/pages/Home.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/about",name: "about"},
    {path: "/calendar", name: "calendar", component: Calendar},
    {path: '/list',component: List},
    {path: '/register', name: 'register', component: Register},
    { path: '/', name: 'home', component: Home},
    { path: '/list',component: List},
  ]
})

export default router;
