# AGENTS.md — Milestone-8 Backend (Node.js & Express)

Coursework repo (Programming Hero Milestone 8). Each `Module-*` folder is a lesson; the
`c4x-*.js` files at module roots are lesson notes/snippets — never run, lint, or "fix" them.
The runnable code lives in the subfolders below.

## Layout — 5 independent npm projects (no workspaces, no root package.json)

| Project | Stack | Entry / run |
|---|---|---|
| `Module-43.../my-first-server` | Express 5, ESM | `node index.js` (port 5000) |
| `Module-43.../user-management-client` | Next.js 16, HeroUI, Tailwind v4 | `npm run dev` |
| `Module-44.../crud-server` | Express 5 + MongoDB driver, ESM, top-level await | `node index.js` (port 5000) |
| `Module-44.../crud-frontend` | Next.js 16, shadcn/ui (base-nova), Tailwind v4 | `npm run dev` |
| `Module-46.../wonderland-frontend` | same stack as crud-frontend; current active project | `npm run dev` |

There are no shared packages. `cd` into the specific project before running anything;
each has its own `node_modules` and npm `package-lock.json` (npm, not pnpm/yarn).

Active project: `Module-46.../wonderland-frontend` — when working inside it, also follow
its own `AGENTS.md` (the auto-generated Next.js rules; see toolchain quirks below).
Note: Module-46 currently has **no `backend/` folder** — the only course backend is
`Module-44.../crud-server`; any Module-46 backend must be created from scratch.

## Commands

- Backends have no npm scripts — run them directly: `node index.js`.
- `wonderland-frontend` and `crud-frontend` define: `npm run dev`, `npm run lint`,
  `npm run typecheck` (`tsc --noEmit`), `npm run format` (prettier + Tailwind class sorting).
  Verify with `npm run lint && npm run typecheck`, then `npm run format`.
- `user-management-client` has only `dev`/`build`/`start`/`lint` — no typecheck or format script.
- There are no tests and no CI anywhere. Do not invent test commands.

## Backend gotchas (`crud-server`)

- Requires `.env` with `DB_USER` and `DB_PASS` (MongoDB Atlas), loaded via
  `import "dotenv/config"` and interpolated into the Atlas connection string in `index.js`.
  Never commit or print these values.
- CORS is locked to `http://localhost:3000`: frontends must run on port 3000.
- `crud-frontend` and `user-management-client` hardcode `http://localhost:5000` fetch
  URLs (no env-based API base). `wonderland-frontend` has no API calls yet — its
  `app/page.tsx` is still the shadcn starter scaffold.
- Port comes from `process.env.port` (lowercase) with 5000 fallback.

## Frontend toolchain quirks

- Next.js 16 — newer than most training data. Each Next project ships an auto-generated
  `AGENTS.md` block warning about breaking changes (crud-frontend and wonderland-frontend
  also have a `CLAUDE.md` containing just `@AGENTS.md`);
  read `node_modules/next/dist/docs/` before writing Next code there. Those blocks are
  rewritten by `next dev` — leave them in place and commit them as-is; do not merge your
  own content into them.
- Tailwind v4: CSS-first config in `app/globals.css`, no `tailwind.config`.
- shadcn/ui (style `base-nova`): add components with `npx shadcn@latest add <component>`;
  they land in `components/ui`, imported via `@/` aliases.
- Prettier: no semicolons, double quotes, LF endings, `prettier-plugin-tailwindcss`
  auto-sorts classes (configured for `cn`/`cva`).
