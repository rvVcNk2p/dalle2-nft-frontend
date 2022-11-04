import { ref, toRaw } from 'vue'
import type { Ref } from 'vue'
import { useSigner } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'

export const getParsedBase64 = (base64Str: string) => {
	const strInput = base64Str.split('data:application/json;base64,')[1]
	return JSON.parse(Buffer.from(strInput, 'base64').toString('utf8'))
}

export type OwnedNftType = {
	name: string
	description: string
	image: string
}

export const useVagmiGetNft = () => {
	const { data: signer } = useSigner()

	const singleNft: Ref<OwnedNftType> = ref(null)
	const isLoading = ref(false)
	const fetchError = ref(null)

	const fetchTokenURIByTokenIdWithResponse = async (tokenId: string) => {
		try {
			if (!signer.value) {
				console.log('No signer available.')
			}

			const signerProvider = toRaw(signer.value!)

			const NftContract = getSmartContract(
				CURRATED_LABS_CONTRACT_ADDRESS,
				CurratedLabsOriginalsABI,
				signerProvider,
			)

			const tokenURI = await NftContract.tokenURI(tokenId)
			return getParsedBase64(tokenURI)
		} catch (error) {
			console.error('Something went wrong...', error)
			return error
		}
	}

	const fetchTokenURIByTokenId = async (tokenId: string) => {
		isLoading.value = true
		fetchError.value = null

		try {
			if (!signer.value) {
				console.log('No signer available.')
			}

			const signerProvider = toRaw(signer.value!)

			const NftContract = getSmartContract(
				CURRATED_LABS_CONTRACT_ADDRESS,
				CurratedLabsOriginalsABI,
				signerProvider,
			)

			const tokenURI = await NftContract.tokenURI(tokenId)
			singleNft.value = getParsedBase64(tokenURI)
		} catch (error) {
			console.error('Something went wrong...', error)
			fetchError.value = error
		}

		isLoading.value = false
	}

	const resetSingleNft = () => {
		singleNft.value = null
	}

	return {
		singleNft,
		isLoading,
		fetchError,

		fetchTokenURIByTokenId,
		fetchTokenURIByTokenIdWithResponse,
		resetSingleNft,
	}
}
