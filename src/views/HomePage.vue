<script lang="ts" setup>
import PrimaryButton from '@/components/button/PrimaryButton.vue'
import OwnedNftsSection from '@/components/nft/OwnedNftsSection.vue'
import MintSection from '@/components/nft/MintSection.vue'
</script>

<template>
	<div class="mb-10">
		<div
			class="mx-auto max-w-screen-xl px-4 pt-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
		>
			<MintSection />
			<OwnedNftsSection />
		</div>
	</div>
</template>
