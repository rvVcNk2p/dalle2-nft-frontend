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
</script>

<template>
	<div v-if="activeConnector" @click="disconnect" class="cursor-pointer">
		<p v-if="!isDisconnected && isChainAvailable">
			Balance: {{ formattedBalance }} {{ data?.symbol }}
		</p>
		<!-- <div>Active chain: {{ activeChain?.name }}</div> -->
		Connected to {{ activeConnector.name }}
	</div>
	<div v-else-if="isConnecting || pendingConnector">Connecting...</div>
	<div v-else-if="!activeConnector" class="flex items-center justify-between">
		<PrimaryButton
			v-for="wallet in WalletType"
			:key="uuidv4()"
			@click="connectType(wallet)"
			:label="wallet"
		/>
	</div>
</template>

<style lang="scss"></style>
