<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
import { inject } from 'vue'
import { ref } from 'vue'

const axios = inject('axios')

const {
	VITE_BACK_END_URL_PRODUDTION,
	VITE_BACK_END_URL_DEVELOPMENT,
	VITE_ENVIRONMENT,
	VITE_INFURA_IPFS_URL,
} = import.meta.env

const fetchImagesUrl =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? VITE_BACK_END_URL_DEVELOPMENT
		: VITE_BACK_END_URL_PRODUDTION

const result = ref(null)
const isLoading = ref(false)

const fetchImages = async () => {
	try {
		isLoading.value = true

		const res = await axios.get(fetchImagesUrl)
		result.value = res.data

		isLoading.value = false
	} catch (error) {
		console.log('== Error: ', error)
		isLoading.value = false
	}
}

const tryIpfs = async () => {
	console.log()
	try {
		isLoading.value = true

		const res = await axios.get('http://localhost:3000/test-ipfs')
		console.log(VITE_INFURA_IPFS_URL + res.data.cid)

		isLoading.value = false
	} catch (error) {
		console.log('== Error: ', error)
		isLoading.value = false
	}
}
</script>

<template>
	<div class="bg-gray-50">
		<div
			class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
		>
			<h2
				class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
			>
				Ready to dive in?
				<br />
				<span class="text-indigo-600">Vite + Vue 3 + Tailwind CSS</span>
			</h2>
			<div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
				<div class="inline-flex rounded-md shadow">
					<router-link
						to="/about"
						class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
						>Next Page</router-link
					>
				</div>
				<ButtonRepo />
				<button @click="tryIpfs">Test ipfs</button>
				<div class="ml-2 inline-flex rounded-md shadow">
					<button
						:disabled="isLoading"
						class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
						@click="fetchImages"
					>
						{{ isLoading ? 'Loading...' : 'Fetch Images' }}
					</button>
				</div>
			</div>
		</div>
		<div v-if="result" class="flex items-center justify-between gap-x-4">
			<div v-for="image in result.generations">
				<p class="text-center">{{ image.created }}</p>
				<img :src="image.generation.image_path" class="h-40 w-40" />
			</div>
		</div>
		<div v-else class="mt-10 w-full pb-10 text-center">NO IMAGES</div>
	</div>
</template>
