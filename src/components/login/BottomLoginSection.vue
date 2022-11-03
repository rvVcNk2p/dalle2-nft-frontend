<script lang="ts" setup>
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import { WalletType } from '@/shared/types/chains.types'
import { useVagmiUtils } from '@/plugins/vagmi/useWagmiUtils'
import { useConnect, useDisconnect, useBalance, useAccount } from 'vagmi'
import { computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useActiveNetwork } from '@/composable'

const { connectType } = useVagmiUtils()
const { isChainAvailable } = useActiveNetwork()

const { activeConnector, isConnecting, pendingConnector } = useConnect()
const { disconnect } = useDisconnect()
const { address, isDisconnected } = useAccount()
const { data } = useBalance({ addressOrName: address, watch: true })

const formattedBalance = computed(() =>
	data.value?.formatted ? data.value.formatted.slice(0, 6) : '-',
)

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>

<template>
	<div
		class="fixed bottom-0 z-10 flex min-w-full justify-center bg-white px-6 py-2 opacity-90"
	>
		<div
			v-if="activeConnector"
			class="cursor-pointer text-center text-black"
			@click="disconnect"
		>
			<p v-if="!isDisconnected && isChainAvailable">
				Balance: <span class="font-black">{{ formattedBalance }}</span>
				{{ data?.symbol }}
			</p>
			<!-- <div>Active chain: {{ activeChain?.name }}</div> -->
			[Connected to {{ activeConnector.name }}]
		</div>
		<div class="text-black" v-else-if="isConnecting || pendingConnector">
			Connecting...
		</div>
		<div
			v-else-if="!activeConnector"
			class="flex items-center justify-between gap-x-4 text-black"
		>
			<PrimaryButton
				v-for="wallet in WalletType"
				:key="uuidv4()"
				@click="connectType(wallet)"
				:label="capitalizeFirstLetter(wallet)"
			/>
		</div>
	</div>
</template>

<style lang="scss"></style>
