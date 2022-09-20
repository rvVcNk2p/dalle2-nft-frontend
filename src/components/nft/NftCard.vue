<script lang="ts" setup>
type ownedNftType = {
	ownedNft: {
		image: string
		description: string
		name: string
	}
}
const props = defineProps<ownedNftType>()

const { name, image, description } = props.ownedNft
</script>
<template>
	<div class="nft-card">
		<img :src="image" :alt="name" class="nft-card__img" />
		<p class="nft-card__name">{{ name }}</p>
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

	.nft-card__name {
		@apply w-52 rounded-b-lg bg-white py-2 px-2 text-sm font-medium;
	}
}
</style>
