<script setup lang="ts">
defineProps<{
	title: string
	description: string
}>()
</script>

<template>
	<article class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
		<div class="mb-5 h-1.5 w-12 rounded-full bg-emerald-500" />
		<h3 class="text-base font-semibold text-slate-950">{{ title }}</h3>
		<p class="mt-3 text-sm leading-6 text-slate-600">{{ description }}</p>
	</article>
</template>
