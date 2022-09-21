import { inject, ref } from 'vue'
import type { Ref } from 'vue'

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

	const posibleImages: Ref = ref([])
	const isLoading = ref(false)
	const fetchError = ref(false)

	const fetchImages = async () => {
		try {
			isLoading.value = true
			fetchError.value = false

			const res = await axios.get(baseFetchUrl + '/fetch-images')
			posibleImages.value = res.data

			isLoading.value = false
		} catch (error) {
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
