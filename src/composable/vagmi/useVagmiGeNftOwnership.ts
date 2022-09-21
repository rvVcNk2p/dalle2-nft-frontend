import { ref, toRaw } from 'vue'
import type { Ref } from 'vue'
import { useSigner, useAccount } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'

export const useVagmiGeNftOwnership = () => {
	const { data: signer } = useSigner()
	const { address } = useAccount()

	const isOwnership: Ref<boolean> = ref(false)
	const isLoading = ref(false)
	const fetchError = ref(null)

	const fetchOwnershipByTokeId = async (tokenId: string) => {
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

			const ownerOfNft = await NftContract.ownerOf(tokenId)
			isOwnership.value = address.value === ownerOfNft
		} catch (error) {
			console.error('Something went wrong...', error)
			fetchError.value = error
		}

		isLoading.value = false
	}

	return {
		isOwnership,
		isLoading,
		fetchError,

		fetchOwnershipByTokeId,
	}
}
