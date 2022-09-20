import { useAlchemyNft } from '@/composable'
import { defineStore } from 'pinia'

export const useNftStore = defineStore('nft', () => {
	const { ownedNfts, isLoading, fetchOwnedNfts } = useAlchemyNft()
	return { ownedNfts, isLoading, fetchOwnedNfts }
})
