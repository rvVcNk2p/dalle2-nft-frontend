<template>
	<div>
		<OwnedNftsSection v-if="needAuth && isAuthEnabled" />
		<TheGuard v-else />
	</div>
</template>

<script lang="ts" setup>
import OwnedNftsSection from '@/components/nft/OwnedNftsSection.vue'
import { useRoute } from 'vue-router'
import TheGuard from '@/components/navigation/TheGuard.vue'
import { useAuthStore } from '@store'
import { storeToRefs } from 'pinia'

const { isAuthEnabled } = storeToRefs(useAuthStore())

const route = useRoute()
const { needAuth } = route.meta
</script>
