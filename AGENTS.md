# AGENTS.md

## Project Overview
AgentSeed is a Nuxt + Tailwind SPA for generating complete `AGENTS.md` project instruction files for Codex and other AI coding agents.

The app is intentionally deterministic for the MVP. It does not call an external AI API. Users configure project details, stack, architecture, coding standards, testing expectations, agent behavior rules, initial setup prompts, optional sections, and extra agent habits, then copy or download a generated `AGENTS.md`.

Use this file as the operating guide for AI coding agents working in this repository.

## Tech Stack
- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS through `@nuxtjs/tailwindcss`
- Client-side deterministic markdown generation
- Browser `localStorage` for saving the latest generator settings

## Architecture
The preferred architecture style is a simple feature-based MVP structure.

- Keep the product as a single-page Nuxt app unless a real routing need appears.
- Keep reusable UI in `app/components`.
- Keep generator state types in `app/types/agents.ts`.
- Keep selectable options and defaults in `app/data/options.ts`.
- Keep markdown generation logic in `app/composables/useAgentsGenerator.ts`.
- Keep browser clipboard/download helpers in `app/composables/useMarkdownActions.ts`.
- Keep global Tailwind styles in `app/assets/css/main.css`.
- Avoid moving deterministic generation into a server route or external API unless explicitly requested.
- When adding generator options, update the type, option data, default config, form controls, and markdown output together.

## Coding Standards
Keep communication direct and focused on the change, validation, and any important tradeoffs.

- Prefer strict TypeScript and preserve typed config objects.
- Keep Vue components small, focused, and easy to scan.
- Use meaningful names for options, fields, helpers, and generated markdown sections.
- Avoid premature abstraction; add helpers only when they reduce real duplication or clarify behavior.
- Follow existing component, composable, and data-file patterns before introducing new ones.
- Add comments only where they clarify non-obvious intent, constraints, or tradeoffs.
- Keep functions focused on one responsibility.
- Preserve ASCII text unless a file already requires non-ASCII content.

## Agent Workflow
- Inspect the relevant files and surrounding patterns before making changes.
- Make minimal, targeted changes that directly address the request.
- Do not rewrite, rename, or reformat unrelated code.
- Ask for explicit approval before broad architecture, product, or dependency changes.
- Preserve existing behavior unless asked otherwise.
- Follow established naming, formatting, Tailwind, and folder conventions.
- Explain tradeoffs when making non-obvious decisions.
- Keep visible UI copy free of placeholder `TODO` text.
- Maintain the generator as a trustworthy developer tool: fast, clean, accessible, and useful without login.
- After making code or documentation changes, suggest a conventional commit message for the completed work.

## Generator Rules
- Generated markdown must be usable as a real project `AGENTS.md`, not filler content.
- Keep generated sections aligned with the UI options in `app/data/options.ts`.
- If a form option is selected by default, make sure its generated instruction is high quality and specific.
- If an option can be customized through text input, merge custom values predictably with selected options.
- Project name and description should be empty by default in the form; examples belong in placeholders.
- Initial setup prompts must be written as one-time tasks for project initialization and must tell users to remove completed items from `AGENTS.md`.
- Include setup-prompt options for polishing the project description, asking clarifying questions, creating `CLAUDE.md` with `@AGENTS.md`, confirming commands, documenting environment variables, identifying missing validation commands, and reviewing README gaps.
- Keep copy and download behavior client-side.
- Do not require external API keys or network calls for generation.
- When changing the generated structure, confirm the preview, copy, and download paths still receive the full markdown string.

## Testing & Validation
- Run `npm run build` before the final response when code changes affect the app.
- If validation cannot be run, explain why and describe the remaining risk.
- For UI changes, do a browser check when practical, especially for form behavior, live preview updates, copy/download actions, or responsive layout.
- Verify mobile and desktop layouts when changing major visual structure.
- Mention the validation commands run and summarize the result.

## Documentation Rules
- Update `README.md` when setup, commands, environment variables, usage, or project structure changes.
- Update `AGENTS.md` when project conventions, architecture, dependencies, generator behavior, or agent instructions change.
- Document new public components, composables, option groups, generated sections, or non-obvious behavior.
- Keep documentation specific to the actual codebase. Remove outdated rules instead of accumulating stale guidance.

## Security Rules
- Never commit secrets, tokens, credentials, or private environment values.
- Do not add analytics, tracking, remote logging, or external API calls without explicit approval.
- Use environment variables for credentials if credentials are ever introduced.
- Validate user-controlled text before placing it in new execution contexts. Plain markdown generation is acceptable.
- Avoid logging sensitive user-provided project details.

## UI / UX Rules
- Keep the interface accessible with semantic HTML, labels, keyboard-friendly controls, and visible focus states.
- Preserve responsive behavior across mobile, tablet, and desktop.
- Use Tailwind utility classes consistently with the existing visual system.
- Keep the product feeling like a minimal developer tool: clean, direct, and trustworthy.
- Do not add heavy decorative UI, nested cards, or unnecessary visual complexity.
- Keep preview panels readable as code/editor-like surfaces.
- Avoid text overflow inside buttons, cards, labels, and compact controls.

## SEO Rules
- Keep page titles and meta descriptions meaningful.
- Use Nuxt `useSeoMeta` for core SEO metadata.
- Preserve canonical URL support through the `siteUrl` constant.
- Keep Open Graph and Twitter metadata current when the product positioning changes.
- Keep JSON-LD structured data accurate for the app.
- Avoid client-only rendering for SEO-critical landing copy when possible.

## Performance Rules
- Avoid unnecessary dependencies.
- Prefer Nuxt, Vue, TypeScript, and browser APIs already available in the project.
- Keep bundle size in mind when considering UI or utility packages.
- Lazy-load heavy UI only if a real heavy UI is introduced.
- Prefer simple deterministic functions over runtime-heavy generation logic.

## Git & Pull Request Guidelines
- Keep changes scoped.
- Summarize what changed.
- Mention tests or builds run.
- Call out follow-up work separately.
- After making changes, suggest a conventional commit message that accurately summarizes the work.
- List the main changed files in the final response when it helps review.

## Extra Agent Habits
- Suggest a conventional commit message after every completed change set.
- Use conventional commit types such as `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, and `chore`.
- Prefer concise commit subjects in the imperative mood.
- Include a short commit body when the change spans product behavior, architecture, or setup.

## Do Not Do Without Approval
- Do not introduce major dependencies.
- Do not add an external AI API or backend generation service.
- Do not change the app from a no-login SPA into an authenticated product.
- Do not broadly change the architecture or folder structure.
- Do not remove build validation.
- Do not remove accessibility affordances.
- Do not reformat unrelated files.
- Do not alter deployment settings, CI/CD, or hosting config unless asked.

## Maintenance
- Revisit this file whenever conventions change.
- Keep instructions aligned with what AgentSeed itself would generate for a comparable Nuxt + Tailwind project.
- When adding, removing, or renaming generator fields, update this file if the agent workflow or architecture guidance changes.
- Remove outdated rules promptly.
- Treat this file as part of the product: it should demonstrate the quality of AGENTS.md that AgentSeed is meant to help users create.
