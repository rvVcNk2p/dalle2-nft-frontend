<template>
	<div v-if="needAuth && isAuthEnabled">
		<div
			v-if="!isLoading && singleNft"
			class="felx w-full flex-col items-center justify-center text-center"
		>
			<div class="felx mb-10 flex-col items-start justify-center">
				<div class="flex flex-col items-center justify-center gap-2">
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

			<div
				class="mt-10 text-white"
				v-if="singleNft.description.length > 30"
			>
				{{ singleNft.description }}
			</div>

			<SetNftSection
				v-if="isOwnership && !isNftSetted && !isSucessfullSet"
				:tokenId="tokenId"
			/>
		</div>
		<div v-else class="text-xl text-white">Loading in progress..</div>
	</div>
	<TheGuard v-else />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNftStore } from '@store'
import { useAuthStore } from '@store'
import { v4 as uuidv4 } from 'uuid'
import { useSigner } from 'vagmi'

import NftCard from '@/components/nft/NftCard.vue'
import SetNftSection from '@/components/SetNftSection.vue'
import TheGuard from '@/components/navigation/TheGuard.vue'

const { isAuthEnabled } = storeToRefs(useAuthStore())
const { data: signer } = useSigner()

const route = useRoute()
const { needAuth } = route.meta
const tokenId = route.params.tokenId + ''

const nftStore = useNftStore()
const { singleNft, isOwnership, isNftSetted, isLoading, isSucessfullSet } =
	storeToRefs(nftStore)
const { refresh, setIsSucessfullSet, resetSingleNft } = nftStore

const isInitialized = ref(false)
watch(
	() => signer.value,
	() => {
		if (!isInitialized.value && signer.value) {
			refresh(tokenId)
			isInitialized.value = true
		}
	},
)

onMounted(() => setIsSucessfullSet(false))
onUnmounted(() => resetSingleNft())
</script>

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
