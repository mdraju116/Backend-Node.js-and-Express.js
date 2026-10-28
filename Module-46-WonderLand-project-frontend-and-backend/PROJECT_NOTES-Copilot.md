# Wanderlast Project Notes

This is a page-by-page guide to the Wonderland/Wanderlast frontend: what each
part does, where its code lives, why it is separated that way, and how the
React, Next.js, TypeScript, and CSS pieces fit together.

## 1. Project at a glance

- **Project:** `wonderland-frontend` (shown in the UI as Wanderlast).
- **Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4,
  shadcn/ui (base-nova), Better Auth, and MongoDB adapter dependencies.
- **Start locally:** run `npm run dev` from this folder. The frontend calls
  `http://localhost:5000` for travel and booking data.
- **Main idea:** Next.js route files represent pages; reusable visual sections
  and controls live under `components/`; shared helpers and auth setup live
  under `lib/`.

### Important checkout note

The current Module 46 folder contains this frontend but **does not contain a
`wonderland-backend/` folder**. The frontend code expects an API on port 5000,
and its local `AGENTS.md` describes a sibling backend, while the repository
root notes say the Module 46 backend is absent. Treat the API routes listed
below as frontend expectations, not proof that those endpoints are available
in this checkout. The API-dependent pages need a compatible backend running.

## 2. Project structure — where things go and why

```text
wonderland-frontend/
├── app/
│   ├── layout.tsx                         # Shared shell for every route
│   ├── page.tsx                            # Home page composition
│   ├── globals.css                         # Tailwind v4 and theme tokens
│   ├── (auth)/
│   │   ├── UserInfo.tsx                   # Header login state and user menu
│   │   ├── sign-in/page.tsx                # Sign-in page
│   │   └── sign-up/page.tsx                # Registration page
│   ├── (pages)/
│   │   ├── add-destination/page.tsx        # Add package form
│   │   ├── all-destinations/page.tsx       # Browse, filter, sort packages
│   │   ├── all-destinations/[destid]/
│   │   │   ├── page.tsx                    # One destination's details
│   │   │   └── destination-actions.tsx     # Client wrapper for edit/delete
│   │   └── my-bookings/page.tsx            # Signed-in user's bookings
│   └── api/auth/[...all]/route.ts          # Better Auth GET/POST handlers
├── components/
│   ├── Banner.tsx, WhyChooseUs.tsx, ...    # Site sections and feature UI
│   ├── BookingCard.tsx, MyBookingCard.tsx  # Booking display/actions
│   ├── UpdateDestination.tsx, ...          # Destination CRUD controls
│   └── ui/                                 # Reusable shadcn/ui primitives
├── lib/
│   ├── auth.ts                             # Server-side Better Auth config
│   ├── auth-client.ts                      # React auth client and hooks
│   └── utils.ts                            # Shared `cn` class helper
├── assets/                                 # Design files and imported images
└── package.json                            # Dependencies and npm commands
```

The `(auth)` and `(pages)` folders are **route groups**: their parentheses
organize files but do not appear in URLs. `[destid]` is a dynamic route segment,
so a URL such as `/all-destinations/abc123` supplies `abc123` as `destid`.

## 3. Pages, part by part

### Home — `/`

**File:** `app/page.tsx`

The page composes four independent sections in display order:

1. `Banner` — hero image, headline, search-style summary, and calls to action.
2. `WhyChooseUs` — three static travel-service feature cards.
3. `Testimonials` — testimonial carousel.
4. `CTA` — closing call to action.

**Purpose of this split:** each section can be styled and reused independently;
the route file stays a simple page-level composition. The banner search fields
and hero buttons, and the CTA button, are currently presentation-only (they do
not submit a search or navigate).

### Sign in — `/sign-in`

**File:** `app/(auth)/sign-in/page.tsx`

- `SignInForm` is a client component because it uses React state, form events,
  routing, and the `useSearchParams` hook.
- `validateEmail` checks required input and basic email syntax;
  `validatePassword` checks that a password was entered.
- `onSubmit` prevents the browser's default submission, validates fields,
  prevents duplicate submissions, calls Better Auth's `signIn.email`, then
  displays a toast and navigates to `/` on success.
- The password visibility button, remember-me checkbox, loading state, inline
  field errors, and social provider buttons are interactive client behavior.
- A `Suspense` boundary supplies a fallback while search parameters resolve.
- A `message=login-required` query parameter triggers a toast after redirect.

### Sign up — `/sign-up`

**File:** `app/(auth)/sign-up/page.tsx`

- `SignUpValues` and `SignUpErrors` describe form data and per-field errors.
- Validators check name (required, at least 3 trimmed characters), optional
  image URL (HTTP or HTTPS), email format, password rules (8+ characters,
  uppercase, number, and special character), and matching confirmation.
- `handleChange` updates the named field and clears that field's prior error.
- `onSubmit` validates all fields, calls Better Auth's `signUp.email`, reports
  errors/success with toast notifications, and sends a successful registration
  to `/sign-in`.
- Password visibility toggles and loading feedback are local React state.

### All destinations — `/all-destinations`

**File:** `app/(pages)/all-destinations/page.tsx`

- This is a client page: it fetches after mount and filters based on user input.
- `useEffect` calls `GET http://localhost:5000/packages`. Its
  `AbortController` cancels a stale request when the component unmounts or
  retries. Loading and failure states are tracked separately.
- `reloadKey` makes the effect fetch again when the user selects Retry.
- `categories` uses `useMemo` and `Set` to derive unique, sorted categories
  from the fetched packages.
- `visibleDestinations` copies the data, filters by category and price, then
  optionally sorts by price, departure date, or name. `toPrice` converts the
  price string to a number for comparisons.
- `clearFilters` resets category, range, and sorting.
- `DestinationCard` renders an image, summary, price, and link to that
  destination's detail route. It shows a fallback when its image fails.
- `DestinationCardSkeleton` reserves card space while data is loading.
- The page distinguishes loading, network/API error, no data, no filter
  matches, and successful results.
- `priceRanges`, `sortOptions`, and `filterSelectClass` define the filter
  choices and shared filter-control styling.

### Add destination — `/add-destination`

**File:** `app/(pages)/add-destination/page.tsx`

- `PackageForm` is the TypeScript shape for the controlled form.
- `form` state holds all inputs; `handleChange` updates an input by its `name`.
- The category select updates category directly; `categories` provides its
  options.
- `handleSubmit` sends JSON with `POST http://localhost:5000/add-package`,
  checks the HTTP response, and displays success/error toasts.
- `handleCancel` resets the form to `initialForm`.
- The form uses shadcn/ui `Input`, `Select`, `Textarea`, `Card`, and `Button`
  components for consistent controls.

### Destination details — `/all-destinations/[destid]`

**Files:** `app/(pages)/all-destinations/[destid]/page.tsx` and
`app/(pages)/all-destinations/[destid]/destination-actions.tsx`

- The page is an async **server component**. In Next.js 16, it awaits the
  `params` promise to read `destid`.
- `fetchDestination` sends `GET http://localhost:5000/packages/:destid`,
  checks the response, and returns destination data or `null`. Errors are
  logged and lead to the page's not-found-style message.
- `DestinationType` defines the package data shared with related UI.
- The page presents image, country, name, price-related details, description,
  and highlights. Highlights are derived by splitting description sentences;
  rating/review values are fixed design placeholders because the API model
  does not provide those fields.
- `BookingCard` is the client-side booking form; `DestinationActions` is a
  client wrapper around the edit and delete controls.
- `UpdateDestination` sends `PATCH /packages/:id`; `DeleteDestination` sends
  `DELETE /packages/:id`. Both refresh or redirect after successful changes.

### My bookings — `/my-bookings`

**File:** `app/(pages)/my-bookings/page.tsx`

- This is an async server component. It reads request headers and asks
  `auth.api.getSession` for the current user.
- Without a user email it shows a sign-in prompt instead of requesting data.
- With a session it sends `GET http://localhost:5000/bookings/:email`.
- `BookingType` documents booking fields, including optional fields needed to
  display older records.
- `fetchFailed` differentiates an API failure from a successful empty result.
- Results are rendered as `MyBookingCard` components; empty and failure states
  have different explanations and actions.

## 4. Important reusable component logic

| Component | Purpose and key logic |
|---|---|
| `Navbar.tsx` | Maps a `leftLinks` array into Next `Link`s, centers the brand, and delegates account state to `UserInfo`. |
| `(auth)/UserInfo.tsx` | Uses `useSession` to render loading, signed-in, or signed-out UI. Opens/closes a user menu, closes on outside click, and signs out through Better Auth. |
| `BookingCard.tsx` | Uses the session to require a signed-in email; validates date; prevents duplicate submit; posts a booking; formats the success date. Sends the package id as `packageId` so each booking receives its own database id. |
| `MyBookingCard.tsx` | Formats legacy/new date shapes, displays status, and asks for confirmation before deleting via `DELETE /my-bookings/:id`; calls `router.refresh()` after success. |
| `UpdateDestination.tsx` | Initializes and resets form state from the selected destination; preserves an existing category not in the standard options; saves with PATCH and refreshes the server-rendered detail. |
| `DeleteDestination.tsx` | Uses an alert dialog to confirm destructive action; deletes by package id, then routes back to the list and refreshes it. |
| `RemoteImage.tsx` | Uses `next/image` for remote URLs and local fallback UI after a missing or failed image URL. Parent container must be positioned for the `fill` image. |
| `SocialSignInButtons.tsx` | Maps Google/GitHub provider definitions to buttons, prevents overlapping requests, and calls Better Auth social sign-in. |
| `theme-provider.tsx` | Wraps `next-themes`; `ThemeHotkey` toggles light/dark on `d`, except while typing or when modifier keys are held. |
| `Banner.tsx` | Renders static hero/search content from `searchFields`; current search controls have no filtering behavior. |
| `WhyChooseUs.tsx` | Maps a static feature array into three image/text cards. |
| `Testimonials.tsx` | Maps testimonials into a looping Embla/shadcn carousel. |
| `CTA.tsx` | Static visual call-to-action section; its button is not wired to a route or booking action. |
| `Footer.tsx` | Maps quick, support, and social-link arrays into footer columns. Newsletter input/button are currently visual only. |

`components/ui/` contains the low-level reusable shadcn/ui controls used by
these pages (buttons, cards, dialogs, forms, inputs, selects, alerts, carousel,
and status/loading pieces). Use these primitives before creating a duplicate
control.

## 5. Data and API flow

Travel and booking requests in the frontend use the fixed base URL
`http://localhost:5000`; there is currently no shared API-base helper.

| Operation | Request used by frontend | Called from |
|---|---|---|
| List packages | `GET /packages` | All destinations |
| Read one package | `GET /packages/:id` | Destination details |
| Add package | `POST /add-package` | Add destination |
| Edit package | `PATCH /packages/:id` | Update destination |
| Delete package | `DELETE /packages/:id` | Delete destination |
| Create booking | `POST /bookings` | Booking card |
| List a user's bookings | `GET /bookings/:email` | My bookings |
| Cancel booking | `DELETE /my-bookings/:id` | My booking card |

The frontend sends and receives JSON for these calls. HTTP failures are checked
with `response.ok`; interactive forms show toast feedback, while pages show
loading/error/empty states where implemented. A compatible backend must provide
these routes and expected data fields.

Authentication is separate from the travel API:

- `lib/auth.ts` configures Better Auth, a MongoDB adapter, email/password, and
  Google/GitHub providers.
- `app/api/auth/[...all]/route.ts` exposes Better Auth's GET and POST handlers.
- `lib/auth-client.ts` exports browser helpers (`signIn`, `signUp`, `signOut`,
  `useSession`).
- Configuration relies on environment variables such as
  `MONGODB_URI`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, and provider client
  credentials. Keep actual secret values in local environment configuration;
  never put them in source control.

## 6. Key CSS and visual rules

### Global styles — `app/globals.css`

- Imports Tailwind v4, shadcn's Tailwind integration, and `tw-animate-css`.
- Uses `@theme inline` to expose semantic colors and radius sizes as Tailwind
  utilities.
- `:root` defines light theme tokens; `.dark` redefines the same semantic
  tokens for dark mode.
- `@layer base` applies border/ring defaults and semantic foreground/background
  colors to the page.
- There is no `tailwind.config` file: project-wide theme configuration is CSS
  first.

### Common utility patterns

- Layout: `mx-auto`, `max-w-*`, `px-*`, `py-*`, `gap-*`.
- Responsive design: mobile-first utilities with `sm:`, `md:`, and `lg:`
  variants; for example, destination grids become two columns at `sm` and
  three at `lg`.
- Theme-aware surfaces: `bg-background`, `bg-card`, `text-foreground`,
  `text-muted-foreground`, `border-border`.
- Interactive states: `hover:*`, `focus-visible:*`, `disabled:*`,
  `transition-colors`.
- Custom brand colors are currently written inline in Tailwind arbitrary
  values such as `bg-[#0e9aa7]` and `text-[#068a3f]`.
- Use `cn` from `lib/utils.ts` to combine conditional class strings where
  needed. Prettier's Tailwind plugin sorts utility classes.

## 7. React and Next.js ideas used here

- **React component:** a function that returns JSX. Small components keep each
  page section or control understandable and reusable.
- **Props:** values passed into components, e.g. `destination` passed to
  `BookingCard`.
- **State (`useState`):** stores client UI state such as field values,
  selected filters, dialog visibility, and loading flags.
- **Effects (`useEffect`):** run client-side work after render; the destinations
  page uses one to fetch data and clean up its request.
- **Memoization (`useMemo`):** derives categories and filtered/sorted results
  only when their inputs change.
- **Event handlers:** `onChange`, `onSubmit`, and button callbacks connect user
  actions to state updates and API requests.
- **Client/server components:** `"use client"` is needed for hooks, browser
  events, and interactive state. Pages without that directive can run as
  server components; the destination-detail and bookings pages fetch/read
  server-side data.
- **App Router:** `app/.../page.tsx` defines a route; `layout.tsx` wraps routes;
  route groups organize pages without changing their URL; `[destid]` matches a
  dynamic id.
- **Next navigation:** `Link` provides client-side navigation; `useRouter`
  supports programmatic `push`, `refresh`, and post-mutation updates.
- **Next Image:** `next/image` handles sizing/optimization; `fill` requires a
  positioned parent and a useful `sizes` value.
- **TypeScript:** `type` declarations document API records and form values;
  they help detect inconsistent fields during development.

## 8. Current limits and things to verify

- The travel API is not included in the current Module 46 checkout, though
  several pages call it. Start or create a compatible backend before expecting
  package and booking data to load.
- `Navbar.tsx` links to `/admin`; no matching admin page appears in this app
  tree.
- `Footer.tsx` links to `/destinations` and `/profile`, while the implemented
  destinations route is `/all-destinations` and the user menu links to
  `/profile-info`; those footer destinations/profile routes are not present in
  this app tree.
- The homepage banner search, hero buttons, CTA button, and footer newsletter
  do not currently perform their implied actions.
- Ratings and review counts on destination cards/details are mock values, not
  API-backed fields.
- No test files or test script are defined in this project. The available
  checks are `npm run lint` and `npm run typecheck`.

## 9. Useful commands

Run commands from this `wonderland-frontend` directory:

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run format` formats TypeScript and TSX files; it writes changes, so use it
when you intend to format source files.
