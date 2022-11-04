import type { ethers } from 'ethers'
import { useConnect, useNetwork, useSigner } from 'vagmi'
import { computed, toRaw } from 'vue'

import { supportedChains } from '@/shared/data/supportedChains'
import type { WalletType } from '@/shared/types/chains.types'

export const isSupported = (chainId: number) =>
	supportedChains.find((chain) => Number(chain.chainId) === chainId) !==
	undefined

export const useVagmiUtils = () => {
	const { chain } = useNetwork()
	const { data: signerRef } = useSigner()

	const { connect, connectors } = useConnect()

	const chainId = computed(() => chain?.value?.id ?? -1)
	const signer = computed<ethers.Signer | undefined>(() =>
		signerRef.value ? toRaw(signerRef.value) : undefined,
	)

	const connectType = (type: WalletType) =>
		connect.value(connectors.value.find((cn) => cn.id === type))

	return {
		connectType,
		chainId,
		signer,
	}
}
