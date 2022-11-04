<script lang="ts" setup>
import MintSection from '@/components/nft/MintSection.vue'
import TheGuard from '@/components/navigation/TheGuard.vue'

import { useRoute } from 'vue-router'
import { useAuthStore } from '@store'
import { storeToRefs } from 'pinia'

const { isAuthEnabled } = storeToRefs(useAuthStore())

const route = useRoute()
const { needAuth } = route.meta
</script>

<template>
	<MintSection v-if="needAuth && isAuthEnabled" />
	<TheGuard v-else />
</template>
