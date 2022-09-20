import { ref, watch, toRaw } from 'vue'
import type { Ref } from 'vue'
import { Network, Alchemy } from 'alchemy-sdk'
import type { OwnedNftsResponse, OwnedNft } from 'alchemy-sdk'
import { useAccount, useSigner } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { getParsedBase64 } from '@/shared/utils/getUriFromBase64'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'

const apiKey = import.meta.env.VITE_ALCHEMY_ID
const settings = {
	apiKey,
	network: Network.MATIC_MAINNET, // TODO: Change to Polygon in production
}
const alchemy = new Alchemy(settings)

export const useAlchemyNft = () => {
	const { address } = useAccount()
	const { data: signer } = useSigner()

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
					omitMetadata: false,
				})
			// Get tokenIds owned by address
			const ownedTokenIds = getNftsForOwnerResonse.ownedNfts.map(
				(nft) => nft.tokenId,
			)
			// Get and decode the tokenURI by TokenId
			const populatedNfts = await Promise.all(
				ownedTokenIds.map(async (tokenId) => {
					return await fetchTokenURIByTokenId(tokenId)
				}),
			)
			ownedNfts.value = populatedNfts
		} catch (error) {
			console.error('Something went wrong...', error)
			fetchError.value = error
		}

		isLoading.value = false
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
			return getParsedBase64(tokenURI)
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
