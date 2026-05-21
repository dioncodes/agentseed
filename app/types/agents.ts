export type IncludeSectionKey =
	| 'security'
	| 'performance'
	| 'accessibility'
	| 'seo'
	| 'deployment'
	| 'database'
	| 'api'
	| 'ui'

export type OutputTone = 'Concise' | 'Detailed' | 'Strict' | 'Friendly'

export interface SelectOption<TValue extends string = string> {
	label: string
	value: TValue
	description?: string
}

export interface AgentsConfig {
	projectName: string
	projectDescription: string
	projectType: string
	customProjectType: string
	primaryStack: string[]
	customStack: string
	architectureStyle: string
	customArchitecture: string
	codeStyle: string[]
	testingExpectations: string[]
	agentRules: string[]
	extraAgentHabits: string[]
	outputTone: OutputTone
	includeSections: Record<IncludeSectionKey, boolean>
	customInstructions: string
	customExtraHabits: string
}
