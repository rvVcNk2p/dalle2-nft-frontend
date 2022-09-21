import {
	useVagmiGeNftOwnership,
	useVagmiGeNftStatus,
	useVagmiGetNft,
} from '@/composable'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useNftStore = defineStore('nft', () => {
	const {
		singleNft,
		isLoading: isLoadingNft,
		fetchTokenURIByTokenId,
	} = useVagmiGetNft()
	const {
		isOwnership,
		isLoading: isLoadingOwnership,
		fetchOwnershipByTokeId,
	} = useVagmiGeNftOwnership()
	const {
		isNftSetted,
		isLoading: isLoadingStatus,
		fetchStatusByTokeId,
	} = useVagmiGeNftStatus()

	const isLoading = computed(
		() =>
			isLoadingNft.value ||
			isLoadingOwnership.value ||
			isLoadingStatus.value,
	)

	const refresh = async (tokenId: string) => {
		await fetchOwnershipByTokeId(tokenId)
		await fetchStatusByTokeId(tokenId)
		await fetchTokenURIByTokenId(tokenId)
	}

	return {
		singleNft,
		isOwnership,
		isNftSetted,
		isLoading,

		refresh,
		fetchTokenURIByTokenId,
		fetchOwnershipByTokeId,
		fetchStatusByTokeId,
	}
})
