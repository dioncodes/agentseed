<script setup lang="ts">
const sampleMarkdown = `# AGENTS.md

## Project Overview
This project uses AI coding agents to make small, reviewed changes.

## Agent Workflow
- Inspect relevant files before editing.
- Preserve existing behavior unless asked otherwise.
- Mention tests run before final response.
`

const copied = ref(false)
const { copyText } = useMarkdownActions()

async function copySample() {
	const success = await copyText(sampleMarkdown)
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
	<section class="relative overflow-hidden border-b border-slate-200 bg-white">
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32rem),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]" />
		<div class="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
			<div class="flex max-w-3xl flex-col justify-center">
				<p class="mb-5 inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
					AGENTS.md generator for AI coding agents
				</p>
				<h1 class="max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
					Generate an AGENTS.md for your next project
				</h1>
				<p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
					Define your stack, architecture, coding style, and agent instructions in minutes. Build a clear Codex project setup and AI development workflow without a login or API key.
				</p>
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<a
						href="#generator"
						class="focus-ring inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
					>
						Generate AGENTS.md
					</a>
					<button
						type="button"
						class="focus-ring inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
						@click="copySample"
					>
						{{ copied ? 'Sample copied' : 'Copy sample' }}
					</button>
				</div>
			</div>

			<div class="flex items-center lg:justify-end">
				<div class="w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-900/15">
					<div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
						<div class="flex gap-2" aria-hidden="true">
							<span class="h-3 w-3 rounded-full bg-red-400" />
							<span class="h-3 w-3 rounded-full bg-amber-300" />
							<span class="h-3 w-3 rounded-full bg-emerald-400" />
						</div>
						<p class="text-xs font-medium text-slate-400">AGENTS.md</p>
					</div>
					<pre class="overflow-hidden whitespace-pre-wrap p-5 text-sm leading-6 text-slate-100"><code># AGENTS.md

## Project Overview
AgentSeed is a frontend SPA for generating project instructions.

## Agent Workflow
- Inspect relevant files before editing.
- Make minimal, targeted changes.
- Explain validation before final response.

## Do Not Do Without Approval
- Do not introduce major dependencies.
- Do not change architecture broadly.</code></pre>
				</div>
			</div>
		</div>
	</section>
</template>
