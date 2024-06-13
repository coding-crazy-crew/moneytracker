import { createRouter, createWebHistory } from "vue-router";
import Calendar from "@/pages/Calendar.vue";
import List from '@/pages/List.vue';import SignUp from '@/pages/SignUp.vue'
import Register from "@/pages/Register.vue";
import Home from '@/pages/Home.vue';
import SignIn from "@/pages/SignIn.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/list',component: List},
    {path: "/calendar", name: "calendar", component: Calendar},
    {path: '/register', name: 'register', component: Register},
    {path: '/signup', component: SignUp},
    {path: '/signin', component: SignIn}
  ]
})

export default router;
