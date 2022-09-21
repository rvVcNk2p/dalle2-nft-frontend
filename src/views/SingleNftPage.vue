<script lang="ts" setup>
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNftStore } from '@store'
import { useSigner } from 'vagmi'
import { v4 as uuidv4 } from 'uuid'

import NftCard from '@/components/nft/NftCard.vue'
import { storeToRefs } from 'pinia'

const { tokenId } = useRoute().params

const { data: signer } = useSigner()

const nftStore = useNftStore()

const { singleNft, isOwnership, isNftSetted, isLoading } = storeToRefs(nftStore)
const { refresh } = nftStore

watch(
	() => [tokenId, signer.value],
	async (_, oldVal) => {
		if (signer.value && tokenId && typeof tokenId === 'string') {
			const oldAddress = oldVal?._address ?? null
			if (oldAddress === null) {
				refresh(tokenId)
			}
		}
	},
)
</script>

<template>
	<div class="bg-white">
		<div
			class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
		>
			<div
				v-if="!isLoading && singleNft"
				class="felx w-full flex-col items-center justify-center text-center"
			>
				<div class="felx mb-10 flex-col items-start justify-center">
					<div
						class="flex flex-col items-center justify-center gap-2"
					>
						<span
							:class="[
								'badge w-fit',
								isOwnership ? 'badge--green' : 'badge--red',
							]"
							>{{
								isOwnership
									? 'belongs to you'
									: 'belongs to someone else'
							}}</span
						>
						<span
							:class="[
								'badge w-fit',
								isNftSetted ? 'badge--green' : 'badge--yellow',
							]"
							>{{
								isNftSetted
									? 'reached its final form'
									: 'not yet reached its final form'
							}}</span
						>
					</div>
				</div>
				<div class="single-nft__container">
					<NftCard
						v-if="singleNft"
						:key="uuidv4()"
						:ownedNft="singleNft"
					/>
				</div>
			</div>
			<div v-else>Loading in progress..</div>
		</div>
	</div>
</template>

<style lang="scss">
.single-nft__container {
	@apply flex flex-wrap items-center justify-center gap-4;
}

.badge {
	@apply inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800;

	&.badge--green {
		@apply bg-green-100 text-green-800;
	}
	&.badge--red {
		@apply bg-red-100 text-red-800;
	}
	&.badge--yellow {
		@apply bg-yellow-100 text-yellow-800;
	}
}
</style>
