<script lang="ts" setup>
const { VITE_MINT_PRICE } = import.meta.env
</script>

<template>
	<div class="mb-10">
		<div class="flex flex-col gap-y-10 text-center text-white">
			<h1 class="mb-10 text-2xl font-black">
				Welcome here at Famous artists' cats!
			</h1>
			<p class="mx-auto w-2/3">
				Have you ever wondered how
				<span class="font-black text-green-400">Pablo Picasso</span>,
				<span class="font-black text-green-400">Vincent van Gogh</span>
				or even
				<span class="font-black text-green-400">Salvador Dali</span>
				would have painted a
				<span class="font-black text-green-400">Siamese</span>,
				<span class="font-black text-green-400">Sphynx</span> or even
				<span class="font-black text-green-400">Bengal cat</span>?
			</p>
			<p>The time has finally come!</p>
			<p>
				We choose 23 famous artists and 12 unique cat type. Everything
				is 100% randomized because our designer is... an AI! We
				integrated with the DALL-E-2 AI, so every generated artwork is
				generated in real-time, unique and a true masterpiece.
			</p>
		</div>
		<div class="mt-36 flex flex-col gap-y-10 text-center text-white">
			<h1 class="text-3xl font-black text-green-400">
				Step-by-step for Minting
			</h1>
			<ol class="flex flex-col gap-y-4">
				<li>1. Be sure that you have been connected to our website.</li>
				<li>
					2. Navigate to the our
					<a href="/mint" class="text-green-400">'Mint'</a>
					page.
				</li>
				<li>
					3. Be sure, the your account has min.
					{{ VITE_MINT_PRICE }} MATIC in your wallet.
				</li>
				<li>
					4. After a successfull MINT we will redirect you to the
					<a href="/my-nfts" class="text-green-400">'My NFTs'</a> page
				</li>
				<li>
					5. Click on your newly created fresh and warm NFT, and the
					fun starts from now. Find the
					<span class="text-green-400">
						'Generate my paintings'
					</span>
					button, and hit it as hard as you can!
				</li>
				<li>
					6. After a lil loading time, 4 unique are picture will be
					soulbound to your NFT. Now the hardest part comes. You need
					to choose only ONE from those arts and the rest will be
					DESTROYED from eternity.
				</li>
			</ol>
			<p>Let the game begin! ❤️</p>
		</div>
	</div>
</template>

<style lang="scss">
ol {
	li {
		&::marker {
			color: white;
		}
	}
}
</style>
