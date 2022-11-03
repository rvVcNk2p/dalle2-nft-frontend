<template>
	<header class="relative shadow">
		<div
			class="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8"
		>
			<h1 class="text-3xl font-bold leading-tight text-white">
				<router-link to="/"> Vortex </router-link>
			</h1>
			<div class="flex gap-x-10 text-white">
				<router-link to="/"> Home </router-link>
				<router-link to="/my-nfts"> My NFTs </router-link>
			</div>
			<div class="w-20"></div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
a {
	@apply transition-colors;

	&:hover {
		@apply text-green-400;
	}
}
</style>
