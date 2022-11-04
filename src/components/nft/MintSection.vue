<script lang="ts" setup>
import { useVagmiMint } from '@/composable'

const { isLoading, mintNft } = useVagmiMint()
</script>

<template>
	<div class="flex min-h-[70vh] flex-col items-center justify-center">
		<p class="mb-10 text-2xl text-white">Treat yourself!</p>
		<button class="glow-on-hover" @click="mintNft" :disabled="isLoading">
			{{ !isLoading ? 'Mint' : '' }}
			<span v-if="isLoading" class="loader" />
		</button>
	</div>
</template>

<style lang="scss">
.glow-on-hover {
	width: 275px;
	height: 50px;
	border: none;
	outline: none;
	color: #fff;
	border: 1px solid white;
	background: #111;
	cursor: pointer;
	position: relative;
	z-index: 0;
	border-radius: 10px;
}

.glow-on-hover:before {
	content: '';
	background: linear-gradient(
		45deg,
		#ff0000,
		#ff7300,
		#fffb00,
		#48ff00,
		#00ffd5,
		#002bff,
		#7a00ff,
		#ff00c8,
		#ff0000
	);
	position: absolute;
	top: -2px;
	left: -2px;
	background-size: 400%;
	z-index: -1;
	filter: blur(5px);
	width: calc(100% + 4px);
	height: calc(100% + 4px);
	animation: glowing 20s linear infinite;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
	border-radius: 10px;
}

.glow-on-hover:active {
	color: #000;
}

.glow-on-hover:active:after {
	background: transparent;
}

.glow-on-hover:hover:before {
	opacity: 1;
}

.glow-on-hover:after {
	z-index: -1;
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background: #111;
	left: 0;
	top: 0;
	border-radius: 10px;
}

// LOADER
.loader {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	display: block;
	margin: 15px auto;
	position: relative;
	background: #fff;
	box-shadow: -24px 0 #fff, 24px 0 #fff;
	box-sizing: border-box;
	animation: shadowPulse 2s linear infinite;
}

@keyframes shadowPulse {
	33% {
		background: #fff;
		box-shadow: -24px 0 #ff3d00, 24px 0 #fff;
	}
	66% {
		background: #ff3d00;
		box-shadow: -24px 0 #fff, 24px 0 #fff;
	}
	100% {
		background: #fff;
		box-shadow: -24px 0 #fff, 24px 0 #ff3d00;
	}
}
</style>
