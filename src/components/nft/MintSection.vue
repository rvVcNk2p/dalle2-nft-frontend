<script lang="ts" setup>
import { useVagmiMint } from '@/composable'

const { isLoading, mintNft } = useVagmiMint()
</script>

<template>
	<p>Mint your epic NFT!</p>
	<button @click="mintNft" :disabled="isLoading">Mint</button>
	<div v-if="isLoading">Nft minting is in progress...</div>
</template>

<script lang="scss"></script>
