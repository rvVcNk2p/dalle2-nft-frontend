import { ref, watch, toRaw } from 'vue'
import type { Ref } from 'vue'
import { useSigner } from 'vagmi'
import { CURRATED_LABS_CONTRACT_ADDRESS } from '@/shared/data/contracts'
import { getSmartContract } from '@/shared/handlers/contractHandlers'
import { CurratedLabsOriginalsABI } from '@/abi/CurratedLabsOriginals'
import { ethers } from 'ethers'

const { VITE_MINT_PRICE } = import.meta.env

export const useVagmiMint = () => {
	const { data: signer } = useSigner()
	const isLoading = ref(false)

	const mintNft = async () => {
		isLoading.value = true

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

			const tx = await NftContract.mint({
				value: ethers.utils.parseEther(`${VITE_MINT_PRICE || '0.1'}`),
			})
			await tx.wait()
		} catch (error) {
			console.error('Something went wrong...', error)
		}

		isLoading.value = false
	}

	return {
		isLoading,

		mintNft,
	}
}
