import axios from 'axios'
import VueAxios from 'vue-axios'

import { VagmiPlugin } from 'vagmi'
import { vagmiClient } from './plugins/vagmi/initializeVagmi'

import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)

const router = createRouter({
	history: createWebHistory(),
	routes,
})

app.use(VagmiPlugin(vagmiClient))
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.use(router)
app.mount('#app')
