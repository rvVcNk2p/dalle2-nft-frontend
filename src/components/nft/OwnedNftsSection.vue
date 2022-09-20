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
			Fething you NFTs...
		</div>
	</div>
</template>

<style lang="scss">
.owned-nfts-section {
	@apply flex items-center justify-start gap-4;
}
</style>
