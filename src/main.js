import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

const pinia = createPinia()
pinia.user(piniaPluginPersistedstate)
const app = createApp(App)

app.use(VueApexCharts)
app.use(pinia)
app.use(router)

app.mount('#app')
