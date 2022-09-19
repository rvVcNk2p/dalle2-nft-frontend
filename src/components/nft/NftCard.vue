<script lang="ts" setup>
import { computed } from 'vue'
import type { OwnedNft } from 'alchemy-sdk'

type ownedNftType = {
	ownedNft: OwnedNft
}
const props = defineProps<ownedNftType>()

const { title, media } = props.ownedNft
const mediaUrl = computed(() => media[0].raw)
</script>
<template>
	<div class="nft-card">
		<img :src="mediaUrl" :alt="title" class="nft-card__img" />
		<p class="nft-card__title">{{ title }}</p>
	</div>
</template>

<style lang="scss">
.nft-card {
	@apply flex flex-col justify-center drop-shadow-2xl transition duration-500 ease-in-out;

	&:hover {
		@apply scale-[1.05] cursor-pointer;
	}

	.nft-card__img {
		@apply h-52 w-52 rounded-t-lg;
	}

	.nft-card__title {
		@apply w-52 rounded-b-lg bg-white py-2 px-2 text-sm font-medium;
	}
}
</style>
