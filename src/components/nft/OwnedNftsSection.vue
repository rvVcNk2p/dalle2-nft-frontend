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
			<div
				v-if="!ownedNfts.length && !isLoading"
				class="text-center text-white"
			>
				<p class="mb-6">No NFts has been minted yet!</p>
				<p>
					Go to our
					<a href="/mint" class="text-green-400">Mint</a> page, to
					start your journey.
				</p>
			</div>
			<div v-else-if="!ownedNfts.length && isLoading">
				Fething your NFTs...
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.owned-nfts-section {
	@apply mt-24 flex flex-wrap items-center justify-center gap-4;
}
</style>
