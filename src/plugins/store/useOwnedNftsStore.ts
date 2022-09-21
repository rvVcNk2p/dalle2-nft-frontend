import { useAlchemyNft } from '@/composable'
import { defineStore } from 'pinia'

export const useOwnedNftsStore = defineStore('owned-nft', () => {
	const { ownedNfts, isLoading, fetchOwnedNfts } = useAlchemyNft()
	return { ownedNfts, isLoading, fetchOwnedNfts }
})
