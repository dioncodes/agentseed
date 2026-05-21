<script setup lang="ts">
import { defaultAgentsConfig, siteUrl } from '~/data/options'
import type { AgentsConfig } from '~/types/agents'

const seoTitle = 'AgentSeed — AGENTS.md Generator for AI Coding Agents'
const seoDescription = 'Generate a clean AGENTS.md file for AI coding agents like Codex, Claude, and Cursor. Define your stack, architecture, code style, testing rules, and project workflow in minutes.'
const storageKey = 'agentseed-config'

function createDefaultConfig(): AgentsConfig {
	return JSON.parse(JSON.stringify(defaultAgentsConfig)) as AgentsConfig
}

function mergeConfig(value: Partial<AgentsConfig>): AgentsConfig {
	const fallback = createDefaultConfig()

	return {
		...fallback,
		...value,
		includeSections: {
			...fallback.includeSections,
			...(value.includeSections ?? {})
		}
	}
}

const config = ref<AgentsConfig>(createDefaultConfig())
const hydrated = ref(false)
const { generateAgentsMarkdown } = useAgentsGenerator()
const generatedMarkdown = computed(() => generateAgentsMarkdown(config.value))

const features = [
	{
		title: 'Agent-ready project context',
		description: 'Turn your stack, architecture, testing rules, and project instructions into a clear AGENTS.md baseline.'
	},
	{
		title: 'Opinionated but editable',
		description: 'Start with sensible defaults, customize every important rule, then refine the markdown in your repository.'
	},
	{
		title: 'Copy or download instantly',
		description: 'Use the generated file immediately with one-click copy or a valid AGENTS.md download.'
	},
	{
		title: 'No login, no setup',
		description: 'Everything runs locally in the browser with deterministic generation and no external AI API.'
	}
]

onMounted(() => {
	const savedConfig = localStorage.getItem(storageKey)

	if (savedConfig) {
		try {
			config.value = mergeConfig(JSON.parse(savedConfig) as Partial<AgentsConfig>)
		} catch {
			localStorage.removeItem(storageKey)
		}
	}

	hydrated.value = true
})

watch(
	config,
	(value) => {
		if (!hydrated.value) {
			return
		}

		localStorage.setItem(storageKey, JSON.stringify(value))
	},
	{ deep: true }
)

function resetConfig() {
	config.value = createDefaultConfig()
}

useSeoMeta({
	title: seoTitle,
	description: seoDescription,
	ogTitle: seoTitle,
	ogDescription: seoDescription,
	ogType: 'website',
	ogUrl: siteUrl,
	ogImage: `${siteUrl}/og-image.svg`,
	twitterTitle: seoTitle,
	twitterDescription: seoDescription,
	twitterImage: `${siteUrl}/og-image.svg`,
	twitterCard: 'summary_large_image'
})

useHead({
	htmlAttrs: {
		lang: 'en'
	},
	link: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png'
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png'
		},
		{
			rel: 'alternate icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		},
		{
			rel: 'canonical',
			href: siteUrl
		}
	],
	script: [
		{
			src: 'https://cdn.visitors.now/v.js',
			'data-token': '6fa62f4b-04b5-4c1b-9623-5be70073c2da'
		},
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: 'AgentSeed',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'Web',
				url: siteUrl,
				description: seoDescription,
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD'
				}
			})
		}
	]
})
</script>

<template>
	<div class="min-h-screen bg-slate-50">
		<NuxtRouteAnnouncer />
		<AppHeader />
		<main>
			<HeroSection />

			<section id="features" class="py-16 sm:py-20" aria-labelledby="features-heading">
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div class="max-w-2xl">
						<p class="text-sm font-semibold uppercase tracking-wider text-emerald-700">Features</p>
						<h2 id="features-heading" class="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
							A focused tool for project instructions
						</h2>
						<p class="mt-4 text-base leading-7 text-slate-600">
							AgentSeed helps developers create reliable project context for AI coding agents without adding process overhead.
						</p>
					</div>

					<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						<FeatureCard
							v-for="feature in features"
							:key="feature.title"
							:title="feature.title"
							:description="feature.description"
						/>
					</div>
				</div>
			</section>

			<section id="generator" class="border-y border-slate-200 bg-white py-16 sm:py-20" aria-labelledby="generator-heading">
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div class="max-w-3xl">
						<p class="text-sm font-semibold uppercase tracking-wider text-emerald-700">Generator</p>
						<h2 id="generator-heading" class="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
							Generate project instructions live
						</h2>
						<p class="mt-4 text-base leading-7 text-slate-600">
							Configure the project type, stack, coding standards, testing expectations, and approval rules. The AGENTS.md preview updates immediately.
						</p>
					</div>

					<div class="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
						<GeneratorForm v-model="config" @reset="resetConfig" />
						<div class="lg:sticky lg:top-24">
							<MarkdownPreview :markdown="generatedMarkdown" />
						</div>
					</div>
				</div>
			</section>

			<FaqSection />
		</main>
		<AppFooter />
	</div>
</template>
