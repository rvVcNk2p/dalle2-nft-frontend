<script lang="ts" setup>
import { onMounted } from 'vue'
import { useOwnedNftsStore } from '@store'
import { v4 as uuidv4 } from 'uuid'

import NftCard from '@/components/nft/NftCard.vue'
import { storeToRefs } from 'pinia'

const nftStore = useOwnedNftsStore()
const { ownedNfts, isLoading } = storeToRefs(nftStore)
const { fetchOwnedNfts } = nftStore

onMounted(async () => await fetchOwnedNfts())
</script>

<template>
	<div class="mb-10 flex w-full flex-col">
		<h2
			class="mb-10 text-center font-mono text-3xl font-semibold text-white underline underline-offset-4"
		>
			Your NFTs
		</h2>
		<div class="owned-nfts-section">
			<NftCard
				v-for="(nft, idx) in ownedNfts"
				:key="uuidv4()"
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
