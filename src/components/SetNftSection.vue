<script lang="ts" setup>
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import { useGetImages, useSetNftImage } from '@/composable'

const props = defineProps({
	tokenId: String,
})

const {
	posibleImages,
	isLoading: isLoadingGet,
	fetchError,
	fetchImages,
} = useGetImages()

const { setNftImage, isLoading: isLoadingSet } = useSetNftImage()

const fireSetNftImage = async (cid) => {
	await setNftImage(props.tokenId, cid)
}

const { VITE_INFURA_IPFS_URL } = import.meta.env
</script>

<template>
	<div
		class="mt-8 flex flex-col items-center justify-center"
		v-if="!isLoadingSet"
	>
		<PrimaryButton
			@click="fetchImages(tokenId)"
			:disabled="isLoadingGet"
			:label="isLoadingGet ? 'Loading...' : 'Fetch Images'"
		/>

		<div
			v-if="posibleImages"
			class="mt-10 mb-20 grid grid-cols-1 gap-1 rounded-lg border-2 bg-white sm:grid-cols-2"
		>
			<div
				v-for="image in posibleImages"
				@click="fireSetNftImage(image.cid)"
				class="cursor-pointer rounded-lg border-0"
			>
				<img
					:src="VITE_INFURA_IPFS_URL + image.cid"
					class="h-48 w-48"
				/>
			</div>
		</div>
		<div v-else class="mt-10 w-full pb-10 text-center">NO IMAGES</div>
	</div>
	<div v-else class="mt-10">Loading in progress..</div>
</template>
