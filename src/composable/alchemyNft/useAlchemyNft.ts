import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { Network, Alchemy } from 'alchemy-sdk'
import type { OwnedNftsResponse, OwnedNft } from 'alchemy-sdk'
import { useAccount } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'

const apiKey = import.meta.env.VITE_ALCHEMY_ID
const settings = {
	apiKey,
	network: Network.MATIC_MUMBAI, // TODO: Change to Polygon in production
}
const alchemy = new Alchemy(settings)

export const useAlchemyNft = () => {
	const { address } = useAccount()
	const ownedNfts: Ref<Array<OwnedNft>> = ref([])
	const isLoading = ref(false)
	const fetchError = ref(null)

	watch(
		() => address.value,
		() => {
			fetchOwnedNfts()
		},
	)

	const fetchOwnedNfts = async () => {
		isLoading.value = true
		fetchError.value = null

		try {
			const getNftsForOwnerResonse: OwnedNftsResponse =
				await alchemy.nft.getNftsForOwner(address.value, {
					contractAddresses: [CURRATED_LABS_CONTRACT_ADDRESS],
				})
			ownedNfts.value = getNftsForOwnerResonse.ownedNfts
		} catch (error) {
			console.error('Something went wrong...', error)
			fetchError.value = error
		}

		isLoading.value = false
	}

	return {
		ownedNfts,
		isLoading,

		fetchOwnedNfts,
	}
}
