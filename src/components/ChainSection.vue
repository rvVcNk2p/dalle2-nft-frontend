<script lang="ts" setup>
import { useNetwork, useSwitchNetwork } from 'vagmi'

const { chain } = useNetwork()
const { chains, error, isLoading, pendingChainId, switchNetwork } =
	useSwitchNetwork()
</script>

<template>
	<div v-if="chain">Connected to {{ chain.name }}</div>
	<button v-for="x in chains" :key="x.id">
		{{ x.name }}
		{{ isLoading && pendingChainId === x.id ? ' (switching)' : '' }}
	</button>
	<div v-if="error">
		{{ error.message }}
	</div>
</template>
