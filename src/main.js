import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'

import { VagmiPlugin } from 'vagmi'
import { vagmiClient } from './plugins/vagmi/initializeVagmi'

import { createApp } from 'vue'
import './tailwind.css'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

const pinia = createPinia()
const app = createApp(App)

const router = createRouter({
	history: createWebHistory(),
	routes,
})

app.use(pinia)
app.use(VagmiPlugin(vagmiClient))
app.use(Toast, { position: POSITION.TOP_RIGHT })
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.use(router)
app.mount('#app')
