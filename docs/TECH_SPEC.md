# HeartSync — Technical Specification

**Version:** 0.2-draft · **Updated:** 3 July 2026
**Live web:** https://v0-mobile-app-to-web-5s.vercel.app · **Repo:** https://github.com/Akilucky-rogue/HeartSync
**Template lineage:** adapted from Wall-ette TECH_SPEC v1.5.1 (same author, same backend philosophy)

HeartSync is a private shared space for two people in a relationship: a memory timeline,
couple's chat, photo albums, shared goals, "love quests," mood tracking, and a shared
calendar. One couple = one shared data space; nothing is social, public, or multi-tenant
beyond the pair. No ads, no trackers.

> **Status:** the current deployment is a static UI prototype (all mock data, simulated
> auth — see `AUDIT.md`). This spec defines the v1 target architecture. Sections marked
> ✅ exist today; everything else is to-build.

---

## 1. Stack at a glance

| Layer | Technology | Version | Status |
|---|---|---|---|
| UI framework | Next.js (App Router) + React | 15.2 / 19 | ✅ |
| Language | TypeScript (strict; build gates ON — see §7) | 5.x | ✅ |
| Styling | Tailwind CSS + shadcn/ui (Radix) | 3.4 | ✅ |
| Toasts | sonner (replaces broken custom hook) | 1.7 | ✅ |
| Backend | Firebase — Auth + Firestore + Storage | JS SDK 11.x | to add |
| Realtime | Firestore `onSnapshot` listeners | — | to add |
| Offline | Firestore `persistentLocalCache` | — | to add |
| Hosting | Vercel (web app) · Firebase used as BaaS only | — | ✅ |
| Fonts | Inter (Google Fonts via `next/font`) | — | ✅ |

Rendering model: the app stays **client-rendered behind a static Next.js shell** (all 15
routes prerender statically today). All user data flows through the Firebase client SDK in
client components — the Wall-ette model, with Next.js providing routing, SSG, and metadata
instead of an enum screen-switcher. No Next.js API routes are required for v1; server-only
logic (invite acceptance, account deletion) can use callable Cloud Functions if rules alone
can't express it.

---

## 2. Frontend architecture

### 2.1 Shell & navigation ✅ (needs the fixes below)
- File-based routing under `app/`: public pages (`/`, `/login`, `/register`) and the
  authenticated area under `/dashboard/*` (11 pages), wrapped by `app/dashboard/layout.tsx`
  which renders the single `SiteHeader`.
- **Required fixes (from audit):** remove the duplicate per-page headers on timeline, chat,
  calendar, mood-tracker, quests, settings; fix the `<header>`-in-`<header>` nesting in
  `SiteHeader`/`MainNav`; create or remove the five dead routes (`/features`,
  `/forgot-password`, `/privacy`, `/terms`, `/contact`).

### 2.2 State management
Plain React context, mirroring Wall-ette — no Redux/Zustand.
- **`AuthContext`** — Firebase Auth session (`onAuthStateChanged`), exposes `user`,
  `loading`, and the user's `coupleId`.
- **`CoupleContext`** — the active couple document plus live subscriptions the current
  screen needs (messages, moods, events…). Subscriptions attach per-page, not globally,
  to keep listener counts low.
- Device-local prefs (theme, banner dismissals) stay in `localStorage`. **Auth state does
  not live in `localStorage`** — the current `isLoggedIn` flag and stored user object are
  removed entirely; Firebase SDK persistence is the session source of truth.
- Route protection: `AuthCheck` is rewritten to gate on the Firebase session (redirect to
  `/login` when signed out, to `/pair` when signed in but not yet paired). Client-side
  gating is acceptable because no user data is ever server-rendered.

### 2.3 Theming ✅
shadcn CSS-variable tokens with `next-themes` (light/dark/system). Wall-ette's multi-theme
channel system is a candidate for later; not v1 scope.

---

## 3. Backend (Firebase, new project `heartsync-prod`)

| Service | Use |
|---|---|
| **Authentication** | Email/password. Anti-enumeration password reset with resend cooldown; reauth-gated password change (both patterns lifted from Wall-ette). |
| **Firestore** | All couple data under `couples/{coupleId}` (§4). `persistentLocalCache` for offline-first reads and automatic sync. |
| **Storage** | Photos under `couples/{coupleId}/photos/…`; client-side resize/compress before upload (target ≤ 1600 px, ~85% JPEG). |
| **Security rules** | Membership-based isolation (§5) — the key departure from Wall-ette's per-UID model. |
| **Cloud Functions** | Only if needed: invite-acceptance transaction, cascade delete on account removal. Avoid otherwise. |

**Consent gate** — registration requires accepting Terms & Privacy (versioned, e.g.
`2026-07-xx`); acceptance recorded on the user doc with a server timestamp. Same mechanism
as Wall-ette. This also forces the `/terms` and `/privacy` pages to actually exist.

External network calls: Firebase and Google Fonts only.

---

## 4. Data model

Wall-ette's `users/{uid}` isolation cannot be reused — HeartSync's unit of ownership is the
**couple**, not the user. Two-space design:

```
users/{uid}                    # profile: displayName, avatarPath, coupleId?, consent{version, acceptedAt}
invites/{code}                 # fromUid, fromName, toEmail?, status, createdAt, expiresAt
couples/{coupleId}
  ├─ (doc)                     # members: [uidA, uidB], createdAt, relationshipStart?, anniversary?
  ├─ messages/{id}             # authorUid, text, createdAt, readAt?        → chat
  ├─ memories/{id}             # title, note, date, photoPaths[], kind      → timeline (kind: memory|milestone)
  ├─ albums/{id}               # name, coverPath, photoCount
  ├─ photos/{id}               # albumId?, storagePath, caption, takenAt, favoritedBy[]
  ├─ moods/{id}                # authorUid, mood, note?, date (1/user/day)  → mood tracker
  ├─ goals/{id}                # title, category, progress, targetDate, completedAt?
  ├─ quests/{id}               # templateId, status, progress, startedAt
  └─ events/{id}               # title, date, recurrence?, icon             → calendar + countdowns
```

**Pairing flow:** registering creates `users/{uid}` (no couple). User A generates an invite
code (or email link) → `invites/{code}`. User B signs up and redeems the code → a
transaction creates `couples/{coupleId}` with both UIDs and stamps `coupleId` on both user
docs. Until paired, the dashboard shows a "waiting for your partner" state with the invite
code. Solo mode (using the app unpaired) is explicitly supported — everything works, the
partner just isn't there yet.

Derived UI data (the "2 Years, 3 Months Together" badge, countdowns, mood insights) is
computed client-side from `relationshipStart` and the collections — on-device analytics,
Wall-ette style. No AI/API calls.

---

## 5. Security rules (the critical adaptation)

```
function isMember(coupleId) {
  return request.auth != null
    && request.auth.uid in get(/databases/$(db)/documents/couples/$(coupleId)).data.members;
}
match /couples/{coupleId}            { allow read, update: if isMember(coupleId); }
match /couples/{coupleId}/{col}/{id} { allow read, write:  if isMember(coupleId); }
match /users/{uid}                   { allow read, write:  if request.auth.uid == uid; }
match /invites/{code}                { allow create: if signed-in; read/update: constrained to redeem-once semantics; }
```

Plus field-level checks: `messages.authorUid == request.auth.uid` on create; `moods`
writable only by their author; `members` array immutable after creation (pairing goes
through the invite transaction). Storage rules mirror Firestore membership. Rules get a
small emulator test suite before first deploy — the invite/redeem path is the part most
worth testing.

Wall-ette carry-overs: no secrets in repo (Firebase web config is public by design,
security lives in rules), `.env` no-secrets policy, per-user security log on auth events,
scrub history if anything ever leaks.

---

## 6. Feature slices (build order)

| Phase | Slice | Notes |
|---|---|---|
| 0 | **Cleanup** ✅ (commit 8c2eb63) | Audit fixes: sonner toasts, header dedupe, dead routes, delete orphaned files, re-enable TS/ESLint gates, real Terms/Privacy pages |
| 1 | **Auth + pairing** | Firebase Auth, consent gate, invite flow, rewritten `AuthCheck`, profile page wired to real user |
| 2 | **Events + moods** | Simplest CRUD; powers dashboard countdowns and mood history (replaces hardcoded March-2025 calendar with a `date-fns`-driven month grid) |
| 3 | **Memories + photos** | Storage uploads with client-side compression, albums, timeline merge of memories/milestones |
| 4 | **Chat** | `onSnapshot` live messages, optimistic send, read receipts via `readAt`; presence = `lastActiveAt` heartbeat ("online" if < 2 min) |
| 5 | **Goals + quests** | CRUD + progress; quest templates as static JSON in v1 |
| 6 | **Insights** | On-device mood patterns and streaks, dashboard becomes fully data-driven |

Each phase ships independently; mock data is deleted per-page as its slice lands, never all
at once.

---

## 7. Build, deploy & repo hygiene

- **Deploy:** Vercel auto-deploy from `main` (unchanged). Firebase config via
  `NEXT_PUBLIC_FIREBASE_*` env vars in Vercel.
- **Gates:** remove `ignoreBuildErrors` / `ignoreDuringBuilds` from `next.config.mjs` after
  Phase 0 cleanup (12 known type errors all live in dead files). `tsc --noEmit` + lint must
  pass before ship — Wall-ette's "typecheck aborts the ship" rule.
- **Deps:** pin the two `"latest"` packages (`@radix-ui/react-dialog`, `next-themes`);
  rename `my-v0-project` → `heartsync`.
- **Docs:** this file lives in `docs/`, with `docs/archive/` for historical reports —
  Wall-ette convention. `AUDIT.md` (July 2026) is the current-state baseline.

### Repository layout (target)

```
/
├── app/                    # Routes: public pages, /dashboard/*, /pair, /terms, /privacy
├── components/             # SiteHeader/MainNav (fixed), feature components, ui/ (shadcn)
├── context/                # AuthContext, CoupleContext
├── services/               # firebase.ts, invites.ts, photos.ts (upload+compress), insights.ts
├── hooks/                  # useCollection/useDoc snapshot wrappers, use-mobile
├── lib/                    # utils
├── firestore.rules         # membership-based rules (§5) + emulator tests
├── storage.rules
├── docs/                   # TECH_SPEC.md, AUDIT.md, archive/
└── public/                 # static assets (placeholders replaced per-phase)
```

---

## 8. Known limitations & non-goals (v1)

Single couple per account (no re-pairing UI after a breakup — manual support path).
Web-only: no Capacitor/Android wrapper in v1 (the static-shell architecture keeps that door
open later; Wall-ette's pipeline is the reference if/when). No push notifications (the
notifications page reads from a Firestore `notifications` collection written by app events;
FCM is a later phase). No E2E encryption for chat — Firestore rules are the privacy
boundary, and Terms must say so honestly. Mood "insights" are heuristics, not psychology.
