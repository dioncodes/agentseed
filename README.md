# AgentSeed

Production site: [agentseed.dev](https://agentseed.dev)

AgentSeed is a focused Nuxt + Tailwind app for generating complete `AGENTS.md` instruction files for software projects that use AI coding agents such as Codex, Claude, Cursor, and similar tools.

The generator runs fully client-side. Users configure project details, stack, architecture, coding standards, testing expectations, agent behavior rules, setup prompts, and optional sections, then copy or download a deterministic `AGENTS.md`.

## Features

- Live `AGENTS.md` preview that updates as settings change.
- Deterministic markdown generation with no external AI API.
- Client-side copy and download actions.
- Saved latest settings through browser `localStorage`.
- SEO metadata, structured data, sitemap, and social preview assets for the public site.
- Visitors analytics for pageviews and engagement events.

## Stack

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS via `@nuxtjs/tailwindcss`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

By default, Nuxt serves the app at `http://localhost:3000`.

## Commands

Build for production:

```bash
npm run build
```

Generate a static build:

```bash
npm run generate
```

Preview a production build locally:

```bash
npm run preview
```

## Project Structure

- `app/app.vue` wires together SEO metadata, persisted generator state, and the single-page layout.
- `app/components` contains the header, hero, feature cards, generator form, markdown preview, FAQ, and footer.
- `app/data/options.ts` contains selectable options, defaults, and the production `siteUrl`.
- `app/types/agents.ts` defines the generator configuration types.
- `app/composables/useAgentsGenerator.ts` converts selected options into the generated markdown.
- `app/composables/useMarkdownActions.ts` handles clipboard and download actions.
- `app/composables/useVisitorsTracking.ts` wraps Visitors custom event tracking.
- `app/assets/css/main.css` contains global Tailwind styles.
- `public/robots.txt`, `public/sitemap.xml`, and `public/og-image.png` support search and social crawlers.
