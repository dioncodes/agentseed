<script setup lang="ts">
defineProps<{
	items: {
		question: string
		answer: string
		contactEmail?: string
	}[]
}>()
</script>

<template>
	<section id="faq" class="border-t border-slate-200 bg-white py-16 sm:py-20" aria-labelledby="faq-heading">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-2xl">
				<p class="text-sm font-semibold uppercase tracking-wider text-emerald-700">FAQ</p>
				<h2 id="faq-heading" class="mt-3 text-3xl font-semibold tracking-normal text-slate-950">Common questions</h2>
			</div>

			<div class="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50">
				<details v-for="(item, index) in items" :key="item.question" class="group p-6" :open="index === 0">
					<summary class="focus-ring cursor-pointer list-none rounded-md text-base font-semibold text-slate-950">
						{{ item.question }}
					</summary>
					<p class="mt-3 text-sm leading-6 text-slate-600">
						{{ item.answer }}
						<template v-if="item.contactEmail"> </template>
						<a
							v-if="item.contactEmail"
							class="focus-ring rounded-md font-medium text-emerald-700 hover:text-emerald-800"
							:href="`mailto:${item.contactEmail}`"
						>
							{{ item.contactEmail }}
						</a>
						<template v-if="item.contactEmail">.</template>
					</p>
				</details>
			</div>
		</div>
	</section>
</template>
