import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { useAccount } from 'vagmi'

const {
	VITE_BACK_END_URL_PRODUDTION,
	VITE_BACK_END_URL_DEVELOPMENT,
	VITE_ENVIRONMENT,
} = import.meta.env

const baseFetchUrl =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? VITE_BACK_END_URL_DEVELOPMENT
		: VITE_BACK_END_URL_PRODUDTION

export const useGetImages = () => {
	const axios = inject('axios')
	const { address } = useAccount()

	const posibleImages: Ref = ref([])
	const isLoading = ref(false)
	const fetchError = ref(false)

	const fetchImages = async (tokenId: string) => {
		try {
			isLoading.value = true
			fetchError.value = false

			const res = await axios.get(
				baseFetchUrl +
					`/fetch-images?tokenId=${tokenId}&address=${address.value}`,
			)
			posibleImages.value = res.data?.generationImages
			isLoading.value = false
		} catch (error) {
			// TODO: Toaster error
			console.log('== Error: ', error)
			isLoading.value = false
			fetchError.value = error
		}
	}

	return {
		posibleImages,
		isLoading,
		fetchError,

		fetchImages,
	}
}
