<script setup>
import TheHeader from '@/components/navigation/TheHeader.vue'
import BottomLoginSection from '@/components/login/BottomLoginSection.vue'

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

const { activeConnector, isConnecting } = useConnect()

onMounted(() => useVagmiEventListeners())
</script>

<template>
	<div id="app" class="relative bg-black">
		<TheHeader />
		<BottomLoginSection />

		<main
			v-if="activeConnector && isChainAvailable"
			class="mx-auto flex max-w-screen-xl flex-col items-center justify-between px-4 pb-10 pt-12 sm:px-6 lg:py-16 lg:px-8"
		>
			<router-view />
		</main>

		<div
			v-else
			class="flex h-[80vh] w-full items-center justify-center px-10"
		>
			<p class="text-center text-5xl font-normal text-white">
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
#app {
	@apply min-h-screen;
}
</style>
