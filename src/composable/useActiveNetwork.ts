import { useNetwork, useSwitchNetwork } from 'vagmi'
import { computed } from 'vue'

export const useActiveNetwork = () => {
	const { chain } = useNetwork()
	const { chains, error, isLoading, pendingChainId, switchNetwork } =
		useSwitchNetwork()

	const availableChainNames = chains.value.map((c) => c.name)

	const isChainAvailable = computed(() => {
		return availableChainNames.includes(chain.value?.name)
	})

	return {
		activeChain: chain,
		availableChainNames,
		isChainAvailable,
	}
}
