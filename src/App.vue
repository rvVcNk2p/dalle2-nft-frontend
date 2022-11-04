<script setup>
import TheHeader from '@/components/navigation/TheHeader.vue'
import BottomLoginSection from '@/components/login/BottomLoginSection.vue'

import { onMounted } from 'vue'
import { useVagmiEventListeners } from '@/composable'

// const {
// 	VITE_BACK_END_URL_PRODUDTION,
// 	VITE_BACK_END_URL_DEVELOPMENT,
// 	VITE_ENVIRONMENT,
// } = import.meta.env

// const baseFetchUrl =
// 	VITE_ENVIRONMENT === 'DEVELOPMENT'
// 		? VITE_BACK_END_URL_DEVELOPMENT
// 		: VITE_BACK_END_URL_PRODUDTION

// const axios = inject('axios')

// Uncomment this, if you want a 100% server uptime

// onMounted(() => {
// 	setInterval(async () => {
// 		const res = await axios.get(baseFetchUrl + '/health-check')
// 		console.log(`[${res.status}] - ${res.data.statusMessage}`)
// 	}, 1000 * 60 * 15 - 1) // Trigger a status call to prevent the server to sleep
// })

onMounted(() => useVagmiEventListeners())
</script>

<template>
	<div id="app" class="relative bg-black">
		<TheHeader />
		<BottomLoginSection />

		<main
			class="mx-auto flex max-w-screen-xl flex-col items-center justify-between px-4 pb-10 pt-12 sm:px-6 lg:py-16 lg:px-8"
		>
			<router-view />
		</main>
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
