<script setup lang="ts">
import { defaultAgentsConfig, siteUrl } from '~/data/options'
import type { AgentsConfig } from '~/types/agents'

const seoTitle = 'AgentSeed — AGENTS.md Generator for AI Coding Agents'
const seoDescription = 'Generate a clean AGENTS.md file for AI coding agents like Codex, Claude, and Cursor. Define your stack, architecture, code style, testing rules, and project workflow in minutes.'
const seoImage = `${siteUrl}/og-image.png`
const seoImageAlt = 'AgentSeed AGENTS.md generator preview'
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
const trackedFirstCustomization = ref(false)
const { generateAgentsMarkdown } = useAgentsGenerator()
const { trackEvent } = useVisitorsTracking()
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

const faqItems = [
	{
		question: 'What is AGENTS.md?',
		answer: 'AGENTS.md is a project instructions file for AI coding agents. It explains your stack, conventions, workflow rules, testing expectations, and approval boundaries.'
	},
	{
		question: 'Which agents does this work with?',
		answer: 'AgentSeed is useful for AI coding agents that can read repository instructions, including Codex, Claude, Cursor, and similar tools.'
	},
	{
		question: 'Should I commit AGENTS.md to my repo?',
		answer: 'Usually, yes. Committing it keeps project instructions visible, reviewable, and consistent for everyone using the codebase.'
	},
	{
		question: 'Can I edit the generated file?',
		answer: 'Yes. The generated markdown is meant to be copied, downloaded, committed, and refined as your project conventions evolve.'
	},
	{
		question: 'Does it use an AI API?',
		answer: 'No. The MVP uses deterministic client-side generation, so there is no external AI API key, account, or project upload required.'
	},
	{
		question: 'Can I suggest an improvement?',
		answer: 'Yes. If you have an idea to improve the generator, send it to',
		contactEmail: 'agentseed@dion.software'
	}
]

onMounted(async () => {
	const savedConfig = localStorage.getItem(storageKey)

	if (savedConfig) {
		try {
			config.value = mergeConfig(JSON.parse(savedConfig) as Partial<AgentsConfig>)
		} catch {
			localStorage.removeItem(storageKey)
		}
	}

	await nextTick()
	hydrated.value = true
})

watch(
	config,
	(value) => {
		if (!hydrated.value) {
			return
		}

		if (!trackedFirstCustomization.value) {
			trackEvent('first_customization', {
				surface: 'generator_form'
			})
			trackedFirstCustomization.value = true
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
	ogSiteName: 'AgentSeed',
	ogType: 'website',
	ogUrl: siteUrl,
	ogImage: seoImage,
	ogImageAlt: seoImageAlt,
	ogImageWidth: 1200,
	ogImageHeight: 630,
	ogImageType: 'image/png',
	twitterTitle: seoTitle,
	twitterDescription: seoDescription,
	twitterImage: seoImage,
	twitterImageAlt: seoImageAlt,
	twitterCard: 'summary_large_image'
})

useHead({
	htmlAttrs: {
		lang: 'en'
	},
	link: [
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: '/logo.svg'
		},
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
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png'
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
				'@graph': [
					{
						'@type': 'WebSite',
						'@id': `${siteUrl}/#website`,
						name: 'AgentSeed',
						url: siteUrl,
						description: seoDescription,
						inLanguage: 'en'
					},
					{
						'@type': 'SoftwareApplication',
						'@id': `${siteUrl}/#software`,
						name: 'AgentSeed',
						applicationCategory: 'DeveloperApplication',
						applicationSubCategory: 'AI coding agent project instructions generator',
						operatingSystem: 'Web',
						url: siteUrl,
						image: seoImage,
						description: seoDescription,
						featureList: features.map((feature) => `${feature.title}: ${feature.description}`),
						isAccessibleForFree: true,
						inLanguage: 'en',
						creator: {
							'@type': 'Organization',
							name: 'Dion Software, LLC',
							url: 'https://dion.software'
						},
						publisher: {
							'@type': 'Organization',
							name: 'Dion Software, LLC',
							url: 'https://dion.software'
						},
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD'
						}
					},
					{
						'@type': 'FAQPage',
						'@id': `${siteUrl}/#faq`,
						mainEntity: faqItems.map((item) => ({
							'@type': 'Question',
							name: item.question,
							acceptedAnswer: {
								'@type': 'Answer',
								text: item.contactEmail ? `${item.answer} ${item.contactEmail}.` : item.answer
							}
						}))
					}
				]
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

			<FaqSection :items="faqItems" />
		</main>
		<AppFooter />
	</div>
</template>
