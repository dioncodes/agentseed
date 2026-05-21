import type { AgentsConfig } from '~/types/agents'

const sentenceMap: Record<string, string> = {
	'Prefer strict TypeScript': 'Prefer strict TypeScript and avoid weakening types for convenience.',
	'Keep components small': 'Keep components small, focused, and easy to scan.',
	'Use meaningful names': 'Use meaningful names for variables, functions, components, files, and database objects.',
	'Avoid premature abstraction': 'Avoid premature abstraction; duplicate small pieces until a pattern is clear.',
	'Prefer composition over inheritance': 'Prefer composition over inheritance when sharing behavior.',
	'Add comments only where helpful': 'Add comments only where they clarify non-obvious intent, constraints, or tradeoffs.',
	'Keep functions focused': 'Keep functions focused on one responsibility and extract helpers only when it improves clarity.',
	'Follow existing patterns before introducing new ones': 'Follow existing patterns before introducing new libraries, folders, or conventions.',
	'Add unit tests for business logic': 'Add or update unit tests for business logic and pure functions.',
	'Add integration tests for APIs': 'Add or update integration tests for API routes, request validation, and persistence boundaries.',
	'Add component tests for complex UI': 'Add component tests for complex UI states, user flows, and accessibility-sensitive behavior.',
	'Run tests before final response': 'Run the relevant test, lint, typecheck, or build commands before the final response.',
	'Explain if tests cannot be run': 'If validation cannot be run, explain why and describe the remaining risk.',
	'Read existing files before editing': 'Inspect the relevant files and surrounding patterns before making changes.',
	'Make minimal, targeted changes': 'Make minimal, targeted changes that directly address the request.',
	'Do not rewrite unrelated code': 'Do not rewrite, rename, or reformat unrelated code.',
	'Ask before major architecture changes': 'Ask for explicit approval before broad architecture or data model changes.',
	'Update AGENTS.md when project conventions change': 'Update AGENTS.md when project conventions, architecture, or agent instructions change.',
	'Update README when setup or usage changes': 'Update README.md when setup, commands, environment variables, or usage changes.',
	'Never commit secrets': 'Never commit secrets, tokens, credentials, or private environment values.',
	'Never remove tests without explaining why': 'Never remove tests unless the reason is explicit and justified.',
	'Suggest conventional commit message after making changes': 'After making changes, suggest a conventional commit message that accurately summarizes the work.',
	'List changed files in the final response': 'List the main changed files in the final response when it helps the user review the work.',
	'Call out risks and assumptions': 'Call out meaningful risks, assumptions, or areas that need user review.',
	'Suggest small follow-up tasks separately': 'Suggest small follow-up tasks separately from the completed work.',
	'Mention commands run for validation': 'Mention the commands run for validation and summarize the result.',
	'Keep final responses concise': 'Keep final responses concise and focused on what changed, validation, and next steps.'
}

const toneIntro: Record<AgentsConfig['outputTone'], string> = {
	Concise: 'Keep communication direct and focused on the change, validation, and any important tradeoffs.',
	Detailed: 'Provide enough context for future maintainers to understand the reasoning, validation, and follow-up work.',
	Strict: 'Prioritize correctness, explicit approval for risky changes, and careful validation over speed.',
	Friendly: 'Keep communication clear, collaborative, and practical while staying precise about risks and decisions.'
}

function normalizeList(values: string[], extra?: string) {
	const customItems = extra
		? extra
			.split(',')
			.map((item) => item.trim())
			.filter(Boolean)
		: []

	return [...values, ...customItems]
}

function bulletList(values: string[]) {
	if (!values.length) {
		return '- Follow the established conventions already present in the codebase.'
	}

	return values.map((value) => `- ${sentenceMap[value] ?? value}`).join('\n')
}

function section(title: string, body: string) {
	return `## ${title}\n${body.trim()}`
}

export function useAgentsGenerator() {
	const generateAgentsMarkdown = (config: AgentsConfig) => {
		const projectName = config.projectName.trim() || 'This project'
		const description = config.projectDescription.trim() || 'A software project maintained with help from AI coding agents.'
		const projectType = config.customProjectType.trim() || config.projectType
		const architecture = config.customArchitecture.trim() || config.architectureStyle
		const stack = normalizeList(config.primaryStack, config.customStack)
		const customInstructions = config.customInstructions.trim()
		const extraAgentHabits = normalizeList(config.extraAgentHabits, config.customExtraHabits)

		const sections = [
			'# AGENTS.md',
			section(
				'Project Overview',
				`${projectName} is a ${projectType}. ${description}\n\nUse this file as the operating guide for AI coding agents working in this repository.`
			),
			section(
				'Tech Stack',
				stack.length
					? stack.map((item) => `- ${item}`).join('\n')
					: '- Confirm the actual stack from package files, framework config, and existing source before editing.'
			),
			section(
				'Architecture',
				`The preferred architecture style is ${architecture}.\n\n- Respect the existing module boundaries and folder conventions before adding new structure.\n- Keep related code close to the feature or layer it belongs to.\n- Avoid introducing new architectural patterns unless the change clearly requires it and the user approves.\n- When uncertain, inspect similar existing implementations and follow the local precedent.`
			),
			section(
				'Coding Standards',
				`${toneIntro[config.outputTone]}\n\n${bulletList(config.codeStyle)}`
			),
			section(
				'Agent Workflow',
				bulletList([
					...config.agentRules,
					'Preserve existing behavior unless asked otherwise.',
					'Follow established naming, formatting, and folder conventions.',
					'Explain tradeoffs when making non-obvious decisions.'
				])
			),
			section('Testing & Validation', bulletList(config.testingExpectations)),
			section(
				'Documentation Rules',
				bulletList([
					'Update README.md when setup, commands, environment variables, or usage changes.',
					'Update AGENTS.md when project conventions, architecture, or agent instructions change.',
					'Document new public APIs, components, or non-obvious behavior.'
				])
			)
		]

		if (extraAgentHabits.length) {
			sections.push(section('Extra Agent Habits', bulletList(extraAgentHabits)))
		}

		if (config.includeSections.security) {
			sections.push(section(
				'Security Rules',
				bulletList([
					'Never commit secrets.',
					'Use environment variables for credentials.',
					'Validate input at boundaries.',
					'Avoid logging sensitive data.'
				])
			))
		}

		if (config.includeSections.ui || config.includeSections.accessibility) {
			sections.push(section(
				'UI / UX Rules',
				bulletList([
					'Keep UI accessible.',
					'Use semantic HTML.',
					'Preserve responsive behavior.',
					'Avoid unnecessary visual complexity.'
				])
			))
		}

		if (config.includeSections.seo) {
			sections.push(section(
				'SEO Rules',
				bulletList([
					'Keep page titles and meta descriptions meaningful.',
					'Use semantic headings.',
					'Add Open Graph and Twitter metadata where appropriate.',
					'Avoid client-only rendering for SEO-critical content when possible.'
				])
			))
		}

		if (config.includeSections.performance) {
			sections.push(section(
				'Performance Rules',
				bulletList([
					'Avoid unnecessary dependencies.',
					'Lazy-load heavy UI where useful.',
					'Keep bundle size in mind.',
					'Prefer simple solutions first.'
				])
			))
		}

		if (config.includeSections.deployment) {
			sections.push(section(
				'Deployment Rules',
				bulletList([
					'Do not alter deployment settings, hosting config, or CI/CD behavior without explicit approval.',
					'Document new environment variables and deployment prerequisites.',
					'Prefer reversible deployment changes and call out operational risk.'
				])
			))
		}

		if (config.includeSections.database) {
			sections.push(section(
				'Database Rules',
				bulletList([
					'Keep schema changes small and reviewable.',
					'Include migrations for database changes.',
					'Validate data at application boundaries and preserve existing data contracts.'
				])
			))
		}

		if (config.includeSections.api) {
			sections.push(section(
				'API Conventions',
				bulletList([
					'Keep request and response shapes explicit and typed where possible.',
					'Validate inputs before business logic runs.',
					'Return clear errors without exposing sensitive implementation details.'
				])
			))
		}

		sections.push(
			section(
				'Git & Pull Request Guidelines',
				bulletList([
					'Keep changes scoped.',
					'Summarize what changed.',
					'Mention tests run.',
					'Call out follow-up work separately.'
				])
			),
			section(
				'Do Not Do Without Approval',
				bulletList([
					'Do not introduce major dependencies.',
					'Do not change architecture broadly.',
					'Do not remove tests.',
					'Do not reformat unrelated files.',
					'Do not alter CI/CD or deployment settings unless asked.'
				])
			),
			section(
				'Maintenance',
				bulletList([
					'Revisit this file when conventions change.',
					'Keep instructions specific to the actual codebase.',
					'Remove outdated rules.'
				])
			)
		)

		if (customInstructions) {
			sections.push(section('Project-Specific Notes', customInstructions))
		}

		return `${sections.join('\n\n')}\n`
	}

	return { generateAgentsMarkdown }
}
