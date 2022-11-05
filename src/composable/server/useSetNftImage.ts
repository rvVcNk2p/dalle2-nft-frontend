import { inject, ref } from 'vue'
import { useAccount } from 'vagmi'
import { useNftStore } from '@store'
import { useToast } from '@/composable'
import { STATUS_CODE } from '@/shared/data/contracts'

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
	const { createToast, SUCCESS, ERROR } = useToast()

	const { address } = useAccount()
	const isLoading = ref(false)
	const fetchError = ref(false)

	const setNftImage = async (
		tokenId: string,
		cid: string,
		description: string,
	) => {
		try {
			isLoading.value = true
			fetchError.value = false
			const { setIsSucessfullSet } = useNftStore()

			const result = await axios.post(baseUrl + '/set-nft', {
				tokenId,
				cid,
				address: address.value,
				description,
			})

			const { error, field, value } = result.data

			if (value === STATUS_CODE.ERROR) {
				createToast(
					ERROR,
					`If the error persists, send us an e-mail to: currated-labs@skiff.com. 
Error source: ${field}
Error reason: ${error.reason}.`,
					30000,
				)
				createToast(
					ERROR,
					'Something went wrong! Please, try again within a few seconds.',
				)
			} else {
				createToast(
					SUCCESS,
					'Everything is fine! Stay calm, after a few seconds we will refresh this page..',
				)
				setIsSucessfullSet(true)
			}
		} catch (error) {
			createToast(
				ERROR,
				'Something went wring during the server connection..',
			)
			console.log('== Error: ', error)
			fetchError.value = error
		} finally {
			isLoading.value = false
		}
	}

	return {
		isLoading,
		fetchError,

		setNftImage,
	}
}
