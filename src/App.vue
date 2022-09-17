<script setup>
import { onMounted, inject } from 'vue'

const {
	VITE_BACK_END_URL_PRODUDTION,
	VITE_BACK_END_URL_DEVELOPMENT,
	VITE_ENVIRONMENT,
} = import.meta.env

const baseFetchUrl =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? VITE_BACK_END_URL_DEVELOPMENT
		: VITE_BACK_END_URL_PRODUDTION

const axios = inject('axios')

// Uncomment this, if you want a 100% server uptime

// onMounted(() => {
// 	setInterval(async () => {
// 		const res = await axios.get(baseFetchUrl + '/health-check')
// 		console.log(`[${res.status}] - ${res.data.statusMessage}`)
// 	}, 1000 * 60 * 15 - 1) // Trigger a status call to prevent the server to sleep
// })
</script>

<template>
	<div>
		<header class="bg-white shadow" v-if="$route.meta.title">
			<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<h1
					@click="counter = 0"
					class="text-3xl font-bold leading-tight text-gray-900"
				>
					{{ $route.meta.title }}
				</h1>
			</div>
		</header>
		<main>
			<router-view />
		</main>
	</div>
</template>
