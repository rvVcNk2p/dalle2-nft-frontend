import { ref, watch, toRaw } from 'vue'
import type { Ref } from 'vue'
import { Network, Alchemy } from 'alchemy-sdk'
import type { OwnedNftsResponse, OwnedNft } from 'alchemy-sdk'
import { useAccount, useSigner } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'

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

export const getParsedBase64 = (base64Str: string) => {
	const strInput = base64Str.split('data:application/json;base64,')[1]
	return JSON.parse(Buffer.from(strInput, 'base64').toString('utf8'))
}

export const useAlchemyNft = () => {
	const { address } = useAccount()
	const { data: signer } = useSigner()

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
			console.log(CURRATED_LABS_CONTRACT_ADDRESS)
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
