import { toRaw, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useSigner, useAccount } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'
import { Signer } from 'ethers'
import { useToast } from '@/composable'
import { useOwnedNftsStore, useNftStore } from '@store'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const { createToast, SUCCESS, INFO } = useToast()

export const useVagmiEventListeners = (_signer?: Ref<Signer>) => {
	const { fetchOwnedNfts } = useOwnedNftsStore()
	const { refresh } = useNftStore()
	const { data } = useSigner()
	const { address } = useAccount()
	const signer = ref(_signer ?? data)
	const router = useRouter()

	watch(
		() => signer.value,
		(_, oldVal) => {
			if (signer.value) {
				const oldAddress = oldVal?._address ?? null
				if (oldAddress === null) {
					initEventListeners()
				}
			}
		},
	)

	const initEventListeners = () => {
		const signerProvider = toRaw(signer.value!)

		const NftContract = getSmartContract(
			CURRATED_LABS_CONTRACT_ADDRESS,
			CurratedLabsOriginalsABI,
			signerProvider,
		)

		initMintEventListener(NftContract)
		initSetMindedNftListener(NftContract)
	}

	const initMintEventListener = async (NftContract) => {
		NftContract.on('MintEvent', (from, tokenId) => {
			if (address.value === from) {
				fetchOwnedNfts()

				createToast(
					SUCCESS,
					`You have been minted a new NFT with tokenId: ${tokenId.toString()}`,
				)

				router.push('/my-nfts')
			}
		})
	}

	const initSetMindedNftListener = async (NftContract) => {
		NftContract.on('SetMindedNft', (_, tokenId, __) => {
			const nftStore = useOwnedNftsStore()
			const { ownedNfts } = storeToRefs(nftStore)

			const ownedTokenIds = ownedNfts.value.map((nft) =>
				parseInt(nft.tokenId),
			)
			const tokenIdNumber = parseInt(tokenId + '')

			if (ownedTokenIds.includes(tokenIdNumber)) {
				fetchOwnedNfts()
				refresh(tokenId)

				createToast(
					SUCCESS,
					`Sweet! Your NFT with tokenId: ${tokenId.toString()} reached its final form. `,
				)
				setTimeout(
					() =>
						createToast(
							INFO,
							`From now, you own a true masterpiece!`,
							3500,
						),
					3500,
				)
			}
		})
	}

	return {
		initMintEventListener,
		initSetMindedNftListener,
	}
}
