<template>
	<section id="faq" class="border-t border-slate-200 bg-white py-16 sm:py-20" aria-labelledby="faq-heading">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-2xl">
				<p class="text-sm font-semibold uppercase tracking-wider text-emerald-700">FAQ</p>
				<h2 id="faq-heading" class="mt-3 text-3xl font-semibold tracking-normal text-slate-950">Common questions</h2>
			</div>

			<div class="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50">
				<details class="group p-6" open>
					<summary class="focus-ring cursor-pointer list-none rounded-md text-base font-semibold text-slate-950">
						What is AGENTS.md?
					</summary>
					<p class="mt-3 text-sm leading-6 text-slate-600">
						AGENTS.md is a project instructions file for AI coding agents. It explains your stack, conventions, workflow rules, testing expectations, and approval boundaries.
					</p>
				</details>
				<details class="group p-6">
					<summary class="focus-ring cursor-pointer list-none rounded-md text-base font-semibold text-slate-950">
						Which agents does this work with?
					</summary>
					<p class="mt-3 text-sm leading-6 text-slate-600">
						AgentSeed is useful for AI coding agents that can read repository instructions, including Codex, Claude, Cursor, and similar tools.
					</p>
				</details>
				<details class="group p-6">
					<summary class="focus-ring cursor-pointer list-none rounded-md text-base font-semibold text-slate-950">
						Should I commit AGENTS.md to my repo?
					</summary>
					<p class="mt-3 text-sm leading-6 text-slate-600">
						Usually, yes. Committing it keeps project instructions visible, reviewable, and consistent for everyone using the codebase.
					</p>
				</details>
				<details class="group p-6">
					<summary class="focus-ring cursor-pointer list-none rounded-md text-base font-semibold text-slate-950">
						Can I edit the generated file?
					</summary>
					<p class="mt-3 text-sm leading-6 text-slate-600">
						Yes. The generated markdown is meant to be copied, downloaded, committed, and refined as your project conventions evolve.
					</p>
				</details>
				<details class="group p-6">
					<summary class="focus-ring cursor-pointer list-none rounded-md text-base font-semibold text-slate-950">
						Does it use an AI API?
					</summary>
					<p class="mt-3 text-sm leading-6 text-slate-600">
						No. The MVP uses deterministic client-side generation, so there is no external AI API key, account, or project upload required.
					</p>
				</details>
			</div>
		</div>
	</section>
</template>
