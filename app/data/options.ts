import type { AgentsConfig, IncludeSectionKey, OutputTone, SelectOption } from '~/types/agents'

export const siteUrl = 'https://agentseed.dev'

export const projectTypeOptions: SelectOption[] = [
	{ label: 'Full-stack web app', value: 'Full-stack web app' },
	{ label: 'Frontend SPA', value: 'Frontend SPA' },
	{ label: 'Backend API', value: 'Backend API' },
	{ label: 'SaaS product', value: 'SaaS product' },
	{ label: 'Mobile app', value: 'Mobile app' },
	{ label: 'CLI/tooling project', value: 'CLI/tooling project' },
	{ label: 'Library/package', value: 'Library/package' }
]

export const stackOptions: SelectOption[] = [
	{ label: 'Nuxt / Vue', value: 'Nuxt / Vue' },
	{ label: 'Next.js / React', value: 'Next.js / React' },
	{ label: 'TypeScript', value: 'TypeScript' },
	{ label: 'Node.js', value: 'Node.js' },
	{ label: 'Go', value: 'Go' },
	{ label: 'PHP / Laravel', value: 'PHP / Laravel' },
	{ label: 'Python', value: 'Python' },
	{ label: 'PostgreSQL', value: 'PostgreSQL' },
	{ label: 'MySQL', value: 'MySQL' },
	{ label: 'Tailwind CSS', value: 'Tailwind CSS' },
	{ label: 'Docker', value: 'Docker' }
]

export const architectureOptions: SelectOption[] = [
	{ label: 'Feature-based', value: 'Feature-based' },
	{ label: 'Clean Architecture', value: 'Clean Architecture' },
	{ label: 'MVC', value: 'MVC' },
	{ label: 'Modular monolith', value: 'Modular monolith' },
	{ label: 'Microservices', value: 'Microservices' },
	{ label: 'Simple MVP structure', value: 'Simple MVP structure' }
]

export const codeStyleOptions: SelectOption[] = [
	{ label: 'Prefer strict TypeScript', value: 'Prefer strict TypeScript' },
	{ label: 'Keep components small', value: 'Keep components small' },
	{ label: 'Use meaningful names', value: 'Use meaningful names' },
	{ label: 'Avoid premature abstraction', value: 'Avoid premature abstraction' },
	{ label: 'Prefer composition over inheritance', value: 'Prefer composition over inheritance' },
	{ label: 'Add comments only where helpful', value: 'Add comments only where helpful' },
	{ label: 'Keep functions focused', value: 'Keep functions focused' },
	{ label: 'Follow existing patterns before introducing new ones', value: 'Follow existing patterns before introducing new ones' }
]

export const testingOptions: SelectOption[] = [
	{ label: 'Add unit tests for business logic', value: 'Add unit tests for business logic' },
	{ label: 'Add integration tests for APIs', value: 'Add integration tests for APIs' },
	{ label: 'Add component tests for complex UI', value: 'Add component tests for complex UI' },
	{ label: 'Run tests before final response', value: 'Run tests before final response' },
	{ label: 'Explain if tests cannot be run', value: 'Explain if tests cannot be run' }
]

export const agentRuleOptions: SelectOption[] = [
	{ label: 'Read existing files before editing', value: 'Read existing files before editing' },
	{ label: 'Make minimal, targeted changes', value: 'Make minimal, targeted changes' },
	{ label: 'Do not rewrite unrelated code', value: 'Do not rewrite unrelated code' },
	{ label: 'Ask before major architecture changes', value: 'Ask before major architecture changes' },
	{ label: 'Update AGENTS.md when project conventions change', value: 'Update AGENTS.md when project conventions change' },
	{ label: 'Update README when setup or usage changes', value: 'Update README when setup or usage changes' },
	{ label: 'Never commit secrets', value: 'Never commit secrets' },
	{ label: 'Never remove tests without explaining why', value: 'Never remove tests without explaining why' }
]

export const initialSetupPromptOptions: SelectOption[] = [
	{ label: 'Polish the project description and ask clarifying questions', value: 'Polish the project description and ask clarifying questions' },
	{ label: 'Create CLAUDE.md that references AGENTS.md', value: 'Create CLAUDE.md that references AGENTS.md' },
	{ label: 'Confirm setup and build commands', value: 'Confirm setup and build commands' },
	{ label: 'Document required environment variables', value: 'Document required environment variables' },
	{ label: 'Identify missing test or lint commands', value: 'Identify missing test or lint commands' },
	{ label: 'Review README for onboarding gaps', value: 'Review README for onboarding gaps' }
]

export const extraAgentHabitOptions: SelectOption[] = [
	{ label: 'Suggest conventional commit message after making changes', value: 'Suggest conventional commit message after making changes' },
	{ label: 'List changed files in the final response', value: 'List changed files in the final response' },
	{ label: 'Call out risks and assumptions', value: 'Call out risks and assumptions' },
	{ label: 'Suggest small follow-up tasks separately', value: 'Suggest small follow-up tasks separately' },
	{ label: 'Mention commands run for validation', value: 'Mention commands run for validation' },
	{ label: 'Keep final responses concise', value: 'Keep final responses concise' }
]

export const toneOptions: SelectOption<OutputTone>[] = [
	{ label: 'Concise', value: 'Concise' },
	{ label: 'Detailed', value: 'Detailed' },
	{ label: 'Strict', value: 'Strict' },
	{ label: 'Friendly', value: 'Friendly' }
]

export const includeSectionOptions: SelectOption<IncludeSectionKey>[] = [
	{ label: 'Security', value: 'security' },
	{ label: 'Performance', value: 'performance' },
	{ label: 'Accessibility', value: 'accessibility' },
	{ label: 'SEO', value: 'seo' },
	{ label: 'Deployment', value: 'deployment' },
	{ label: 'Database', value: 'database' },
	{ label: 'API conventions', value: 'api' },
	{ label: 'UI conventions', value: 'ui' }
]

export const defaultAgentsConfig: AgentsConfig = {
	projectName: '',
	projectDescription: '',
	projectType: 'Frontend SPA',
	customProjectType: '',
	primaryStack: ['Nuxt / Vue', 'TypeScript', 'Tailwind CSS'],
	customStack: '',
	architectureStyle: 'Feature-based',
	customArchitecture: '',
	codeStyle: [
		'Prefer strict TypeScript',
		'Keep components small',
		'Use meaningful names',
		'Avoid premature abstraction',
		'Follow existing patterns before introducing new ones'
	],
	testingExpectations: [
		'Add unit tests for business logic',
		'Run tests before final response',
		'Explain if tests cannot be run'
	],
	agentRules: [
		'Read existing files before editing',
		'Make minimal, targeted changes',
		'Do not rewrite unrelated code',
		'Ask before major architecture changes',
		'Update AGENTS.md when project conventions change',
		'Never commit secrets'
	],
	initialSetupPrompts: [
		'Polish the project description and ask clarifying questions',
		'Create CLAUDE.md that references AGENTS.md',
		'Confirm setup and build commands'
	],
	extraAgentHabits: [
		'Suggest conventional commit message after making changes',
		'Mention commands run for validation',
		'Call out risks and assumptions'
	],
	outputTone: 'Concise',
	includeSections: {
		security: true,
		performance: true,
		accessibility: true,
		seo: true,
		deployment: false,
		database: false,
		api: false,
		ui: true
	},
	customInstructions: '',
	customInitialSetupPrompts: '',
	customExtraHabits: ''
}
