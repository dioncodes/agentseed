# AgentSeed

AgentSeed is a Nuxt + Tailwind SPA for generating a complete `AGENTS.md` file for software projects that use Codex or other AI coding agents.

The app runs fully client-side for the MVP. Users configure their project type, stack, architecture, coding standards, testing expectations, and agent behavior rules, then copy or download a generated `AGENTS.md`.

## Stack

- Nuxt
- Vue 3
- TypeScript
- Tailwind CSS via `@nuxtjs/tailwindcss`

## Setup

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production Build

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Project Structure

- `app/components` contains the landing page, generator form, preview, FAQ, header, and footer components.
- `app/data/options.ts` contains typed selectable options and sample defaults.
- `app/types/agents.ts` defines the generator configuration types.
- `app/composables/useAgentsGenerator.ts` converts selected options into deterministic markdown.
- `app/composables/useMarkdownActions.ts` handles clipboard and download actions.
