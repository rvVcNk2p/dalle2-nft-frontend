import { toRaw, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useSigner, useAccount } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'
import { Signer } from 'ethers'

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
				console.log('New mint...')
				console.log('address: ', from)
				console.log('tokenId: ', tokenId.toString())
				console.log('===========')
			}
		})
	}

	const initSetMindedNftListener = async (NftContract) => {
		NftContract.on('SetMindedNft', (from, tokenId, cid) => {
			if (address.value === from) {
				console.log('New set has been habbened:')
				console.log('address: ', from)
				console.log('tokenId: ', tokenId)
				console.log('newCid: ', cid)
				console.log('===========')
			}
		})
	}

	return {
		initMintEventListener,
		initSetMindedNftListener,
	}
}
