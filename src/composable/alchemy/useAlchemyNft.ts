import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { Network, Alchemy } from 'alchemy-sdk'
import type { OwnedNftsResponse, OwnedNft } from 'alchemy-sdk'
import { useAccount } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { useVagmiGetNft } from '@/composable'

const { VITE_POLYGON_ALCHEMY_API, VITE_MUMBAI_ALCHEMY_API, VITE_ENVIRONMENT } =
	import.meta.env

const apiKey =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? VITE_MUMBAI_ALCHEMY_API
		: VITE_POLYGON_ALCHEMY_API

const network =
	VITE_ENVIRONMENT === 'DEVELOPMENT'
		? Network.MATIC_MUMBAI
		: Network.MATIC_MAINNET

const settings = {
	apiKey,
	network,
}

const alchemy = new Alchemy(settings)

export const useAlchemyNft = () => {
	const { address } = useAccount()
	const { fetchTokenURIByTokenIdWithResponse } = useVagmiGetNft()

	const ownedNfts: Ref<Array<OwnedNft>> = ref([])
	const isLoading = ref(false)
	const fetchError = ref(null)

	watch(
		() => address.value,
		() => {
			if (address.value) fetchOwnedNfts()
		},
	)

	const fetchOwnedNfts = async () => {
		isLoading.value = true
		fetchError.value = null

		try {
			const getNftsForOwnerResonse: OwnedNftsResponse =
				await alchemy.nft.getNftsForOwner(address.value, {
					contractAddresses: [CURRATED_LABS_CONTRACT_ADDRESS],
					omitMetadata: false,
				})

			// Get tokenIds owned by address
			const ownedTokenIds = getNftsForOwnerResonse.ownedNfts.map(
				(nft) => nft.tokenId,
			)

			// Get and decode the tokenURI by TokenId
			const populatedNfts = await Promise.all(
				ownedTokenIds.map(async (tokenId) => {
					return {
						...(await fetchTokenURIByTokenIdWithResponse(tokenId)),
						tokenId,
					}
				}),
			)

			ownedNfts.value = populatedNfts
		} catch (error) {
			console.error('Something went wrong...', error)
			fetchError.value = error
		}

		isLoading.value = false
	}

	return {
		ownedNfts,
		isLoading,
		fetchError,

		fetchOwnedNfts,
	}
}
