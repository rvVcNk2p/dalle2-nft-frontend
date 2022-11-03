<script lang="ts" setup>
defineProps({
	label: String,
})
</script>

<template>
	<button
		class="inline-flex w-fit items-center justify-center rounded-md border border-transparent bg-[#111] px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:opacity-80 focus:outline-none"
	>
		{{ label }}
	</button>
</template>
