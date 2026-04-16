# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `frontend/` directory:

```bash
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
npm run format    # Format with Prettier
```

No test or lint scripts are configured.

## Architecture

Single-page landing for Finnova (fintech app). Vue 3 + Vite + Tailwind CSS 4. No router — navigation uses hash anchors (`#home`, `#features`, etc.).

**Stack:** Vue 3 `<script setup>` Composition API, TypeScript in the API layer, Tailwind CSS for styling, Prettier for formatting.

### Structure

```
frontend/src/
├── api/          # HTTP client + typed API functions (waitlist, mail)
├── components/   # Section-based components (Hero, Features, HowItWorks, etc.)
├── assets/       # Images organized by section
├── App.vue       # Root — layout + gradient overlays
├── main.js       # Vue init + FontAwesome registration
└── styles.css    # Global Tailwind imports + custom utilities
```

### Key Patterns

- **No global state** — each component manages its own state with `ref()`/`reactive()`
- **Modal via Teleport** — `Forms.vue` (waitlist signup) uses `<Teleport to="body">` triggered from Header and Hero
- **API layer** — `src/api/http.ts` is a generic fetch wrapper; `waitlist.ts` and `mail.ts` are thin wrappers over it. Dev proxies to `localhost:3000`; prod points to AWS Lambda
- **Email** — Resend SDK called after successful waitlist submission (requires `RESEND_API_KEY` in `.env`)
- **Styling** — Dark theme (black bg, white text, `#0FD985` green accent). Custom utilities in `styles.css` (`.bg-hero-gradient`, `.btn-waitlist`, etc.). Scoped CSS for component-specific overrides
- **Icons** — FontAwesome for brand icons (Apple, Google Play); Iconify for UI icons

### Environment Variables

```
VITE_API_BASE_URL=   # AWS Lambda base URL
RESEND_API_KEY=      # Resend email service
PUBLIC_APP_URL=      # https://finnova.com.mx
```