<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wonderland-frontend (Wanderlust travel site, Module 46)

Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/ui (style `base-nova`) + next-themes.
No tests, no backend yet (no API calls in the codebase).

## Structure

- `app/` — `layout.tsx` (Geist/Geist_Mono via `next/font/google`, wraps children in
  `ThemeProvider`, `cn` on `<html>`), `page.tsx` (still the shadcn starter scaffold),
  `globals.css` (all Tailwind v4 / theme config lives here — no `tailwind.config`).
- `components/ui/` — shadcn components only; add with `npx shadcn@latest add <name>`.
- `components/theme-provider.tsx` — next-themes wrapper (press `d` to toggle dark mode).
- `lib/utils.ts` — the `cn` helper; `hooks/` — empty placeholder (just `.gitkeep`).
- `assets/` — design originals (`.penpot`, `.fig`, `Design-pdf.pdf`, source images).
  Reference images from here for building pages; ship runtime images via `public/`.

## Verify before done

From this directory: `npm run lint && npm run typecheck`, then `npm run format`
(prettier enforces no semicolons, double quotes, LF, and Tailwind class sorting).
