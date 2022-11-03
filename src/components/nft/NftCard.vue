<script lang="ts" setup>
import { computed } from 'vue'

type ownedNftType = {
	ownedNft: {
		image: string
		description: string
		name: string
		tokenId: string
	}
}
const props = defineProps<ownedNftType>()

const { name, image, description, tokenId } = props.ownedNft

const redirectUrl = computed(() => {
	if (tokenId) return `/nft/${tokenId}`
	else return ''
})
</script>
<template>
	<router-link :to="redirectUrl">
		<div class="nft-card">
			<img :src="image" :alt="name" class="nft-card__img" />
			<p class="nft-card__name">{{ name }}</p>
		</div>
	</router-link>
</template>

<style lang="scss">
.nft-card {
	@apply flex flex-col justify-center transition duration-500 ease-in-out;
	@apply drop-shadow-[0_5px_35px_rgba(200,200,200,0.5)];

	&:hover {
		@apply scale-[1.05] cursor-pointer;
	}

	.nft-card__img {
		@apply h-64 w-64 rounded-t-lg;
	}

	.nft-card__name {
		@apply w-64 rounded-b-lg bg-white py-2 px-2 text-center text-sm font-medium;
	}
}
</style>
