<script setup lang="ts">
const props = defineProps<{
	markdown: string
}>()

const copied = ref(false)
const { copyText, downloadMarkdown } = useMarkdownActions()

async function copyMarkdown() {
	const success = await copyText(props.markdown)
	if (!success) {
		return
	}

	copied.value = true
	window.setTimeout(() => {
		copied.value = false
	}, 1800)
}
</script>

<template>
	<section class="rounded-2xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-900/10" aria-labelledby="preview-heading">
		<div class="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 id="preview-heading" class="text-sm font-semibold text-white">Live AGENTS.md Preview</h2>
				<p class="mt-1 text-xs text-slate-400">{{ markdown.length.toLocaleString() }} characters generated</p>
			</div>
			<div class="flex flex-wrap gap-2">
				<button
					type="button"
					class="focus-ring rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
					@click="copyMarkdown"
				>
					{{ copied ? 'Copied' : 'Copy' }}
				</button>
				<button
					type="button"
					class="focus-ring rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
					@click="downloadMarkdown(markdown)"
				>
					Download AGENTS.md
				</button>
			</div>
		</div>
		<div class="max-h-[44rem] overflow-auto">
			<pre class="whitespace-pre-wrap p-5 text-sm leading-6 text-slate-100"><code>{{ markdown }}</code></pre>
		</div>
	</section>
</template>
