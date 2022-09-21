import { inject, ref } from 'vue'
import { useAccount } from 'vagmi'
import { useGasPrice } from '@/composable'

import { useNftStore } from '@store'

const {
	VITE_BACK_END_URL_PRODUDTION,
	VITE_BACK_END_URL_DEVELOPMENT,
	VITE_ENVIRONMENT,
} = import.meta.env

const baseUrl =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? VITE_BACK_END_URL_DEVELOPMENT
		: VITE_BACK_END_URL_PRODUDTION

export type SelectedImageType = {
	id: string
	object: string
	created: Date
	generation_type: string
	generation: {
		image_path: string
	}
	task_id: string
	prompt_id: string
	is_public: boolean
}

export const useSetNftImage = () => {
	const axios = inject('axios')
	const { refresh } = useNftStore()
	const { maxFeePerGas, maxPriorityFeePerGas, fetchGasPrice } = useGasPrice()

	const { address } = useAccount()
	const isLoading = ref(false)
	const fetchError = ref(false)

	const setNftImage = async (
		tokenId: string,
		selectedImage: SelectedImageType,
	) => {
		try {
			isLoading.value = true
			fetchError.value = false

			const {
				id,
				generation: { image_path },
				task_id,
			} = selectedImage

			await fetchGasPrice()

			console.log('maxFeePerGas: ', maxFeePerGas.value)
			console.log('maxPriorityFeePerGas: ', maxPriorityFeePerGas.value)

			await axios.post(baseUrl + '/set-nft', {
				tokenId,
				imgId: id,
				imagePath: image_path,
				taskId: task_id,
				address: address.value,
				maxFeePerGas: maxFeePerGas.value,
				maxPriorityFeePerGas: maxPriorityFeePerGas.value,
			})

			await refresh(tokenId)

			isLoading.value = false
		} catch (error) {
			console.log('== Error: ', error)
			isLoading.value = false
			fetchError.value = error
		}
	}

	return {
		isLoading,
		fetchError,

		setNftImage,
	}
}
