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

const fireSetNftImage = async (image) => {
	await setNftImage(props.tokenId, image)
}
</script>

<template>
	<div class="mt-8 flex flex-col" v-if="!isLoadingSet">
		<PrimaryButton
			@click="fetchImages"
			:disabled="isLoadingGet"
			:label="isLoadingGet ? 'Loading...' : 'Fetch Images'"
		/>

		<div
			v-if="posibleImages"
			class="flex items-center justify-between gap-x-4"
		>
			<div
				v-for="image in posibleImages.generations"
				@click="fireSetNftImage(image)"
				class="cursor-pointer"
			>
				<p class="text-center">{{ image.created }}</p>
				<img :src="image.generation.image_path" class="h-40 w-40" />
			</div>
		</div>
		<div v-else class="mt-10 w-full pb-10 text-center">NO IMAGES</div>
	</div>
	<div v-else class="mt-10">Loading in progress..</div>
</template>
