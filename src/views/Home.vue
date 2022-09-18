<script lang="ts" setup>
import { inject } from 'vue'
import { ref, toRaw } from 'vue'
import { useSigner } from 'vagmi'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'

const axios = inject('axios')

const {
	VITE_BACK_END_URL_PRODUDTION,
	VITE_BACK_END_URL_DEVELOPMENT,
	VITE_ENVIRONMENT,
	VITE_INFURA_IPFS_URL,
} = import.meta.env

const baseFetchUrl =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? VITE_BACK_END_URL_DEVELOPMENT
		: VITE_BACK_END_URL_PRODUDTION

const result = ref(null)
const isLoading = ref(false)

const fetchImages = async () => {
	try {
		isLoading.value = true

		const res = await axios.get(baseFetchUrl + '/fetch-images')
		result.value = res.data

		isLoading.value = false
	} catch (error) {
		console.log('== Error: ', error)
		isLoading.value = false
	}
}

const tryIpfs = async () => {
	try {
		isLoading.value = true

		const res = await axios.get(baseFetchUrl + '/test-ipfs')
		console.log(VITE_INFURA_IPFS_URL + res.data.cid)

		isLoading.value = false
	} catch (error) {
		console.log('== Error: ', error)
		isLoading.value = false
	}
}

const { data: signer } = useSigner()

const interactWithNftContract = async () => {
	if (!signer.value) {
		console.log('No signer available.')
	}

	const signerProvider = toRaw(signer.value!)

	const NftContract = getSmartContract(
		CURRATED_LABS_CONTRACT_ADDRESS,
		CurratedLabsOriginalsABI,
		signerProvider,
	)

	const res = await NftContract.tokenURI(1)
	// const res = await NftContract.withdrawAll()

	console.log('tokenURI: ', res)
}
</script>

<template>
	<div class="bg-gray-50">
		<div
			class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
		>
			<div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
				<PrimaryButton @click="tryIpfs" label="Test ipfs" />
				<PrimaryButton
					@click="interactWithNftContract()"
					label="Interact with NFT smart contract"
				/>
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
