import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useConnect } from 'vagmi'
import { useActiveNetwork } from '@/composable'

export const useAuthStore = defineStore('auth', () => {
	const { isChainAvailable } = useActiveNetwork()
	const { activeConnector } = useConnect()

	const isAuthEnabled = computed(
		() => activeConnector.value && isChainAvailable.value,
	)

	return {
		isAuthEnabled,
	}
})
