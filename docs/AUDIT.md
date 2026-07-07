# HeartSync — Project Audit

**Date:** July 3, 2026 · **Repo:** github.com/Akilucky-rogue/HeartSync (local folder in sync with `origin/main`, commit `f20f9a9`) · **Live:** v0-mobile-app-to-web-5s.vercel.app

## 1. What this project is

HeartSync is a couples' relationship app — shared timeline, private chat, photo albums, relationship goals, "love quests," mood tracking, calendar, notifications, profile, and settings. It was generated with v0.dev and deployed via Vercel. The stack is Next.js 15.2.4 (App Router), React 19, TypeScript, Tailwind CSS 3.4, and shadcn/ui (48 UI primitives on Radix), managed with pnpm. The repo has two commits and a one-line README.

## 2. The most important finding

**This is a static UI prototype, not a functioning app.** A production build confirms all 15 routes prerender as fully static content. There are no API routes, no database, no environment variables, and no external services. Every piece of content — chat messages, photos, moods, goals, events, the "2 Years, 3 Months Together" badge, the partner "Alex" — is hardcoded mock data. Not a single dashboard page has any state or event handler: the chat input can't send, photos can't upload, moods can't be logged, goals can't be created, and every "Save Changes" button in Settings does nothing. Only the login and register pages contain client logic, and that logic is simulated.

This is fine for a design prototype. It matters because the marketing copy promises "real-time messaging," privacy, and mood insights that don't exist yet, and because every future feature requires a backend that hasn't been started.

## 3. Authentication is cosmetic

Login and register accept **any** email/password, wait one second, then write `isLoggedIn: "true"` and a user object to `localStorage`. The password is collected but never used or sent anywhere. Route protection (`components/auth-check.tsx`) runs only in the browser — anyone can open any `/dashboard` URL directly (the server happily returns the full static page; I verified this against the live deployment), or bypass the check by setting one localStorage key. The registered user's name is stored but the dashboard still greets "Jamie" regardless of who registered. There is no session, no partner-linking despite the "Partner's Email" field, and no password reset (`/forgot-password` links to a 404).

Verdict: acceptable for a demo, but nothing real (especially chat messages, mood data, or photos — highly sensitive in a relationship app) can be added until this is replaced with real auth.

## 4. Functional bug: toasts never appear

`hooks/use-toast.ts` contains two implementations mashed together. The original shadcn global-store version (~150 lines: reducer, dispatch, listeners) is still in the file but dead, and the exported `useToast()` was replaced with a per-component `useState` version. Because state is per-component, the `ToastProvider` in the root layout only ever sees *its own* (always empty) state, while login, register, and logout fire toasts into *their own* instances. **Result: no toast notification ever renders anywhere in the app.** Login/register still redirect, so the breakage is silent. The file also has an `import { useState }` statement in the middle of the file.

Easiest fix: the project already ships `sonner` and `components/ui/sonner.tsx` — mount Sonner's `<Toaster />` in the root layout, replace `useToast()` calls with `toast()` from sonner, and delete the broken hook.

## 5. Layout bugs: duplicated and invalid headers

The dashboard layout (`app/dashboard/layout.tsx`) wraps every page with `SiteHeader`. But six pages — timeline, chat, calendar, mood-tracker, quests, and settings — render their **own second full header** with a reduced nav (only 4 links, missing Photos/Goals/Calendar), producing two stacked sticky headers and a nested `container` on those pages, while the other five pages correctly rely on the layout. Separately, `SiteHeader` renders a `<header>` that contains `MainNav`, which itself renders another complete `<header>` — invalid nested-header HTML, doubled borders/backdrop styling, and the mobile hamburger sits outside MainNav's bar. The fix is to strip the per-page headers from those six pages and make `MainNav` render nav content only.

## 6. Dead links and orphaned files

Links that 404 (confirmed on the live site): `/features` (landing hero), `/forgot-password` (login), `/privacy`, `/terms`, `/contact` (footer and the register form's Terms checkbox — legally awkward to require agreement to terms that don't exist). Notifications and Profile pages exist but appear in no nav menu except the bell icon and avatar dropdown.

Orphaned/dead code: `components/ui/toaster.tsx` and `components/ui/use-toast.ts` (both broken remnants of the original shadcn toast system, imported by nothing), `styles/globals.css` (duplicate of `app/globals.css`, never imported), `components/ui/use-mobile.tsx` (duplicate of `hooks/use-mobile.tsx`), and the ~150 dead lines inside `hooks/use-toast.ts`. The photos page also hand-rolls an untyped `Search` SVG component at the bottom of the file instead of importing lucide-react's `Search`.

## 7. Suppressed quality gates

`next.config.mjs` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true` (v0 defaults), plus `images.unoptimized: true`. Running `tsc --noEmit` surfaces **12 type errors** — all in the dead toast files and the untyped `Search` component — so the codebase is one small cleanup away from passing a strict type-check. Re-enabling both gates after deleting the dead files is low-effort, high-value. There are no tests, no CI, and no linting config. Two dependencies are pinned to `"latest"` (`@radix-ui/react-dialog`, `next-themes`), which risks silent breakage on fresh installs; the lockfile currently protects against this.

## 8. Build, deployment, and repo state

`pnpm install` and `next build` succeed cleanly. Bundle sizes are healthy (101 kB shared JS; heaviest route 144 kB first-load). The Vercel deployment serves this exact codebase, and the local folder is identical to GitHub `main`. Git history is just "Initial commit" + "fork Heartsync with updated dashboard components." `package.json` is still named `my-v0-project`.

## 9. Findings summary

| # | Severity | Finding | Where |
|---|----------|---------|-------|
| 1 | Critical (by design) | No backend: all features are static mockups; nothing persists | entire app |
| 2 | Critical | Auth is fake; any credentials work; dashboard publicly reachable | login/register, auth-check |
| 3 | High | Toast notifications never render (state-scoping bug) | hooks/use-toast.ts, toast-provider |
| 4 | High | Double headers on 6 dashboard pages; header-in-header invalid HTML | 6 pages, site-header/main-nav |
| 5 | Medium | 5 dead links incl. Terms/Privacy required at signup | landing, login, register, footer |
| 6 | Medium | TS + ESLint disabled in builds; 12 hidden type errors | next.config.mjs |
| 7 | Low | 4+ orphaned/dead files; duplicate hooks; dead code in use-toast | components/ui, styles, hooks |
| 8 | Low | `"latest"` deps; placeholder package name; 1-line README; no tests/CI | repo hygiene |

## 10. Suggested order of work

First, the one-day cleanup: swap the broken toast system for sonner, remove the six duplicate page headers and fix the SiteHeader/MainNav nesting, delete orphaned files, fix the 12 type errors, re-enable TS/ESLint in builds, and either create or remove the five dead routes. This makes the prototype honest and maintainable.

Second, the real build-out: add a backend — Supabase is a natural fit here (auth, Postgres, storage for photos, realtime for chat) — replace localStorage auth with real sessions plus middleware-based route protection, add a partner-invite flow (the register form already collects partner email), then wire features to data in value order: mood check-in and calendar events (simple CRUD) → timeline/photos (storage) → chat (realtime) → goals/quests. Only after data exists do the mood "insights" and countdown widgets become implementable.

Third, before any real users: privacy policy and terms pages (a couples' app stores intimate data — moods, private messages, photos), security headers, and image optimization.
