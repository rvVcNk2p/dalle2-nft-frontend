<script setup>
import LoginSection from '@/components/login/LoginSection.vue'
import { useConnect } from 'vagmi'
import { inject, onMounted } from 'vue'
import { useActiveNetwork, useVagmiEventListeners } from '@/composable'

const { isChainAvailable, availableChainNames } = useActiveNetwork()

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

const { activeConnector } = useConnect()

onMounted(() => useVagmiEventListeners())
</script>

<template>
	<div>
		<header class="bg-white shadow">
			<div
				class="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8"
			>
				<h1 class="text-3xl font-bold leading-tight text-gray-900">
					Currated Labs - Originals
				</h1>
				<LoginSection />
			</div>
		</header>
		<main v-if="activeConnector && isChainAvailable">
			<router-view />
		</main>
		<div v-else class="flex h-[80vh] w-full items-center justify-center">
			<p class="text-center text-5xl font-normal text-indigo-600">
				{{
					!activeConnector
						? 'Please connect your account first!'
						: !isChainAvailable
						? `Please switch to an available chain! [${availableChainNames}]`
						: null
				}}
			</p>
		</div>
	</div>
</template>

<style lang="scss">
body {
	@apply font-mono;
}
</style>
