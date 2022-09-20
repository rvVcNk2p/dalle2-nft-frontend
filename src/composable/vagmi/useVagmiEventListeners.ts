import { toRaw, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useSigner, useAccount } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'
import { Signer } from 'ethers'
import { useToast } from '@/composable'

const { createToast, SUCCESS, INFO } = useToast()

export const useVagmiEventListeners = (_signer?: Ref<Signer>) => {
	const { data } = useSigner()
	const { address } = useAccount()
	const signer = ref(_signer ?? data)

	watch(
		() => signer.value,
		(_, oldVal) => {
			if (signer.value) {
				const oldAddress = oldVal?._address ?? null
				if (oldAddress === null) initEventListeners()
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
				createToast(
					SUCCESS,
					`Congratulation! You have been minted a new NFT with tokenId: ${tokenId.toString()}`,
				)
			}
		})
	}

	const initSetMindedNftListener = async (NftContract) => {
		NftContract.on('SetMindedNft', (from, tokenId, cid) => {
			if (address.value === from) {
				createToast(
					SUCCESS,
					`Sweet! Your NFT with tokenId: ${tokenId.toString()} reached its final form. `,
				)
				setTimeout(
					() =>
						createToast(
							INFO,
							`From now, you own a true masterpiece!`,
						),
					2500,
				)
			}
		})
	}

	return {
		initMintEventListener,
		initSetMindedNftListener,
	}
}
