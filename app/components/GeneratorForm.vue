<script setup lang="ts">
import {
	agentRuleOptions,
	architectureOptions,
	codeStyleOptions,
	extraAgentHabitOptions,
	includeSectionOptions,
	initialSetupPromptOptions,
	projectTypeOptions,
	stackOptions,
	testingOptions,
	toneOptions
} from '~/data/options'
import type { AgentsConfig, IncludeSectionKey } from '~/types/agents'

const props = defineProps<{
	modelValue: AgentsConfig
}>()

const emit = defineEmits<{
	'update:modelValue': [value: AgentsConfig]
	reset: []
}>()

type TextKey =
	| 'projectName'
	| 'projectDescription'
	| 'projectType'
	| 'customProjectType'
	| 'customStack'
	| 'architectureStyle'
	| 'customArchitecture'
	| 'outputTone'
	| 'customInstructions'
	| 'customInitialSetupPrompts'
	| 'customExtraHabits'

type ListKey = 'primaryStack' | 'codeStyle' | 'testingExpectations' | 'agentRules' | 'initialSetupPrompts' | 'extraAgentHabits'

function inputValue(event: Event) {
	return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value
}

function checkboxValue(event: Event) {
	return (event.target as HTMLInputElement).checked
}

function updateField(key: TextKey, value: string) {
	emit('update:modelValue', {
		...props.modelValue,
		[key]: value
	})
}

function updateList(key: ListKey, value: string, enabled: boolean) {
	const current = props.modelValue[key]
	const next = enabled ? [...current, value] : current.filter((item) => item !== value)

	emit('update:modelValue', {
		...props.modelValue,
		[key]: next
	})
}

function updateSection(key: IncludeSectionKey, enabled: boolean) {
	emit('update:modelValue', {
		...props.modelValue,
		includeSections: {
			...props.modelValue.includeSections,
			[key]: enabled
		}
	})
}
</script>

<template>
	<form class="space-y-8" aria-labelledby="generator-form-heading" @submit.prevent>
		<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<h2 id="generator-form-heading" class="text-2xl font-semibold tracking-normal text-slate-950">Configure your project</h2>
				<p class="mt-2 text-sm leading-6 text-slate-600">
					Start with the defaults, then tune the project instructions to match your repository.
				</p>
			</div>
			<button
				type="button"
				class="focus-ring inline-flex w-fit items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
				@click="emit('reset')"
			>
				Reset
			</button>
		</div>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="project-details-heading">
			<h3 id="project-details-heading" class="text-base font-semibold text-slate-950">Project details</h3>

			<div>
				<label for="project-name" class="block text-sm font-medium text-slate-800">Project name</label>
				<input
					id="project-name"
					:value="modelValue.projectName"
					type="text"
					class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
					placeholder="AgentSeed"
					@input="updateField('projectName', inputValue($event))"
				>
			</div>

			<div>
				<label for="project-description" class="block text-sm font-medium text-slate-800">Project description</label>
				<textarea
					id="project-description"
					:value="modelValue.projectDescription"
					rows="4"
					class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm"
					placeholder="A clean Nuxt and Tailwind SPA that generates AGENTS.md project instructions for AI coding agents."
					@input="updateField('projectDescription', inputValue($event))"
				/>
			</div>

			<div class="grid gap-5 sm:grid-cols-2">
				<div>
					<label for="project-type" class="block text-sm font-medium text-slate-800">Project type</label>
					<select
						id="project-type"
						:value="modelValue.projectType"
						class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
						@change="updateField('projectType', inputValue($event))"
					>
						<option
							v-for="option in projectTypeOptions"
							:key="option.value"
							:value="option.value"
							:selected="option.value === modelValue.projectType"
						>
							{{ option.label }}
						</option>
					</select>
				</div>

				<div>
					<label for="custom-project-type" class="block text-sm font-medium text-slate-800">Custom project type</label>
					<input
						id="custom-project-type"
						:value="modelValue.customProjectType"
						type="text"
						class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
						placeholder="Optional override"
						@input="updateField('customProjectType', inputValue($event))"
					>
				</div>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="stack-heading">
			<h3 id="stack-heading" class="text-base font-semibold text-slate-950">Primary stack</h3>
			<div class="grid gap-3 sm:grid-cols-2">
				<label
					v-for="option in stackOptions"
					:key="option.value"
					class="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
				>
					<input
						type="checkbox"
						class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
						:checked="modelValue.primaryStack.includes(option.value)"
						@change="updateList('primaryStack', option.value, checkboxValue($event))"
					>
					<span>{{ option.label }}</span>
				</label>
			</div>
			<div>
				<label for="custom-stack" class="block text-sm font-medium text-slate-800">Custom stack or tools</label>
				<input
					id="custom-stack"
					:value="modelValue.customStack"
					type="text"
					class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
					placeholder="Comma-separated, for example Redis, Playwright, Prisma"
					@input="updateField('customStack', inputValue($event))"
				>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="architecture-heading">
			<h3 id="architecture-heading" class="text-base font-semibold text-slate-950">Architecture</h3>
			<div class="grid gap-5 sm:grid-cols-2">
				<div>
					<label for="architecture-style" class="block text-sm font-medium text-slate-800">Architecture style</label>
					<select
						id="architecture-style"
						:value="modelValue.architectureStyle"
						class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
						@change="updateField('architectureStyle', inputValue($event))"
					>
						<option
							v-for="option in architectureOptions"
							:key="option.value"
							:value="option.value"
							:selected="option.value === modelValue.architectureStyle"
						>
							{{ option.label }}
						</option>
					</select>
				</div>

				<div>
					<label for="custom-architecture" class="block text-sm font-medium text-slate-800">Custom architecture note</label>
					<input
						id="custom-architecture"
						:value="modelValue.customArchitecture"
						type="text"
						class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
						placeholder="Optional override"
						@input="updateField('customArchitecture', inputValue($event))"
					>
				</div>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="standards-heading">
			<h3 id="standards-heading" class="text-base font-semibold text-slate-950">Code style preferences</h3>
			<div class="grid gap-3">
				<label
					v-for="option in codeStyleOptions"
					:key="option.value"
					class="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
				>
					<input
						type="checkbox"
						class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
						:checked="modelValue.codeStyle.includes(option.value)"
						@change="updateList('codeStyle', option.value, checkboxValue($event))"
					>
					<span>{{ option.label }}</span>
				</label>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="testing-heading">
			<h3 id="testing-heading" class="text-base font-semibold text-slate-950">Testing expectations</h3>
			<div class="grid gap-3">
				<label
					v-for="option in testingOptions"
					:key="option.value"
					class="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
				>
					<input
						type="checkbox"
						class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
						:checked="modelValue.testingExpectations.includes(option.value)"
						@change="updateList('testingExpectations', option.value, checkboxValue($event))"
					>
					<span>{{ option.label }}</span>
				</label>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="agent-rules-heading">
			<h3 id="agent-rules-heading" class="text-base font-semibold text-slate-950">Agent behavior rules</h3>
			<div class="grid gap-3">
				<label
					v-for="option in agentRuleOptions"
					:key="option.value"
					class="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
				>
					<input
						type="checkbox"
						class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
						:checked="modelValue.agentRules.includes(option.value)"
						@change="updateList('agentRules', option.value, checkboxValue($event))"
					>
					<span>{{ option.label }}</span>
				</label>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="initial-setup-heading">
			<div>
				<h3 id="initial-setup-heading" class="text-base font-semibold text-slate-950">Initial setup prompts</h3>
				<p class="mt-2 text-sm leading-6 text-slate-600">
					Add one-time setup tasks agents should complete when initializing the project, then remove after completion.
				</p>
			</div>
			<div class="grid gap-3">
				<label
					v-for="option in initialSetupPromptOptions"
					:key="option.value"
					class="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
				>
					<input
						type="checkbox"
						class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
						:checked="modelValue.initialSetupPrompts.includes(option.value)"
						@change="updateList('initialSetupPrompts', option.value, checkboxValue($event))"
					>
					<span>{{ option.label }}</span>
				</label>
			</div>
			<div>
				<label for="custom-initial-setup-prompts" class="block text-sm font-medium text-slate-800">Custom initial setup prompts</label>
				<input
					id="custom-initial-setup-prompts"
					:value="modelValue.customInitialSetupPrompts"
					type="text"
					class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
					placeholder="Comma-separated, for example Add issue templates, verify deploy target"
					@input="updateField('customInitialSetupPrompts', inputValue($event))"
				>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="extra-habits-heading">
			<div>
				<h3 id="extra-habits-heading" class="text-base font-semibold text-slate-950">Extra agent habits</h3>
				<p class="mt-2 text-sm leading-6 text-slate-600">
					Add optional final-response habits that make agent work easier to review.
				</p>
			</div>
			<div class="grid gap-3">
				<label
					v-for="option in extraAgentHabitOptions"
					:key="option.value"
					class="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
				>
					<input
						type="checkbox"
						class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
						:checked="modelValue.extraAgentHabits.includes(option.value)"
						@change="updateList('extraAgentHabits', option.value, checkboxValue($event))"
					>
					<span>{{ option.label }}</span>
				</label>
			</div>
			<div>
				<label for="custom-extra-habits" class="block text-sm font-medium text-slate-800">Custom extra habits</label>
				<input
					id="custom-extra-habits"
					:value="modelValue.customExtraHabits"
					type="text"
					class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
					placeholder="Comma-separated, for example Include ticket IDs, mention migration impact"
					@input="updateField('customExtraHabits', inputValue($event))"
				>
			</div>
		</section>

		<section class="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="output-heading">
			<h3 id="output-heading" class="text-base font-semibold text-slate-950">Output preferences</h3>
			<div class="grid gap-5 sm:grid-cols-2">
				<div>
					<label for="output-tone" class="block text-sm font-medium text-slate-800">Output tone</label>
					<select
						id="output-tone"
						:value="modelValue.outputTone"
						class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm"
						@change="updateField('outputTone', inputValue($event))"
					>
						<option
							v-for="option in toneOptions"
							:key="option.value"
							:value="option.value"
							:selected="option.value === modelValue.outputTone"
						>
							{{ option.label }}
						</option>
					</select>
				</div>

				<div>
					<label for="custom-instructions" class="block text-sm font-medium text-slate-800">Custom instructions</label>
					<textarea
						id="custom-instructions"
						:value="modelValue.customInstructions"
						rows="3"
						class="focus-ring mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm"
						placeholder="Optional project-specific notes"
						@input="updateField('customInstructions', inputValue($event))"
					/>
				</div>
			</div>

			<fieldset>
				<legend class="text-sm font-medium text-slate-800">Include sections</legend>
				<div class="mt-3 grid gap-3 sm:grid-cols-2">
					<label
						v-for="option in includeSectionOptions"
						:key="option.value"
						class="focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
					>
						<input
							type="checkbox"
							class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
							:checked="modelValue.includeSections[option.value]"
							@change="updateSection(option.value, checkboxValue($event))"
						>
						<span>{{ option.label }}</span>
					</label>
				</div>
			</fieldset>
		</section>
	</form>
</template>
