<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wonderland-frontend (Wanderlust travel site, Module 46)

Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/ui (style `base-nova`) + next-themes.
No tests.

## Backend (sibling folder)

The API lives in `../wonderland-backend` — Express 5 + MongoDB, run with `node index.js`
from that folder (port 5000, CORS locked to `http://localhost:3000`, needs its `.env`
with `MONGODB_URI`). Endpoints: `POST /add-package`, `GET /packages`,
`GET /packages/:id` (invalid ids can throw in the route handler).
This frontend hardcodes `http://localhost:5000` in its fetch calls
(no env-based API base). The backend must be running for data pages to work.

## Structure

- `app/layout.tsx` — Geist/Geist_Mono via `next/font/google`, `cn` on `<html>`, renders
  `Navbar` → `ThemeProvider` → `Toaster` (react-hot-toast) → `Footer`.
  `app/page.tsx` — home page composing `Banner`/`WhyChooseUs`/`Testimonials`/`CTA`.
- `app/(pages)/` — route group: `all-destinations` (client list page: fetches
  `GET /packages`, filters/sort, card grid) with `[destid]/page.tsx` (server component
  fetching `GET /packages/:id`; interactive bits in colocated client components
  `booking-card.tsx` / `destination-actions.tsx`), plus `add-destination` (client form).
- `app/globals.css` — all Tailwind v4 / theme config lives here (no `tailwind.config`).
- `components/` — site sections (Navbar, Footer, Banner, CTA, Testimonials, WhyChooseUs).
- `components/ui/` — shadcn components only; add with `npx shadcn@latest add <name>`.
- `components/remote-image.tsx` — use for user-entered image URLs: `next/image` with an
  error fallback (many `imageUrl` values point at image-host *pages*, not files;
  `next.config.ts` allows any remote host via `images.remotePatterns`).
- `components/theme-provider.tsx` — next-themes wrapper (press `d` to toggle dark mode;
  ignored while typing in inputs).
- `lib/utils.ts` — the `cn` helper; `hooks/` — empty placeholder (just `.gitkeep`).
- `assets/` — design originals (`.penpot`, `.fig`, `Design-pdf.pdf`) **and** runtime images:
  components static-import PNGs via `@/assets/*.png` into `next/image`. `public/` is an
  empty placeholder.

## Verify before done

From this directory: `npm run lint && npm run typecheck`, then `npm run format`
(prettier enforces no semicolons, double quotes, LF, and Tailwind class sorting).
