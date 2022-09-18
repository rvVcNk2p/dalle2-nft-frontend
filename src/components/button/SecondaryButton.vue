<script lang="ts" setup>
defineProps({
	label: String,
})
</script>

<template>
	<div class="ml-3 inline-flex rounded-md shadow">
		<button
			class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium leading-6 text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none"
		>
			{{ label }}
		</button>
	</div>
</template>
