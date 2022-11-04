<template>
	<div class="flex h-[80vh] w-full items-center justify-center px-10">
		<p class="text-center text-5xl font-normal text-white">
			{{
				!activeConnector
					? 'Please connect your account first!'
					: !isChainAvailable
					? `Please switch to an available chain! [${availableChainNames}]`
					: null
			}}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { useConnect } from 'vagmi'
import { useActiveNetwork } from '@/composable'

const { activeConnector } = useConnect()
const { isChainAvailable, availableChainNames } = useActiveNetwork()
</script>
