<script lang="ts" setup>
import { useAlchemyNft } from '@/composable'
import { onMounted } from 'vue'

import NftCard from '@/components/nft/NftCard.vue'

const { ownedNfts, isLoading, fetchOwnedNfts } = useAlchemyNft()

onMounted(async () => {
	await fetchOwnedNfts()
})
</script>

<template>
	<div class="flex w-full flex-col">
		<h2
			class="mb-10 text-center font-mono text-3xl font-semibold text-indigo-600 underline underline-offset-4"
		>
			Your epic NFTs
		</h2>
		<div class="owned-nfts-section">
			<NftCard
				v-for="(nft, idx) in ownedNfts"
				:key="nft.name + idx"
				:ownedNft="nft"
			/>
			<div v-if="!ownedNfts.length && !isLoading">
				No NFts has been minted!
			</div>
			<div v-else-if="!ownedNfts.length && isLoading">
				Fething your NFTs...
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.owned-nfts-section {
	@apply flex flex-wrap items-center justify-center gap-4;
}
</style>
