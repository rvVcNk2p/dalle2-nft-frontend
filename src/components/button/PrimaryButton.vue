<script lang="ts" setup>
defineProps({
	label: String,
})
</script>

<template>
	<button
		class="inline-flex w-fit items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
	>
		{{ label }}
	</button>
</template>
