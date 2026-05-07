# CLAUDE.md

Guidance for Claude Code (and other AI assistants) when working in this repository.

---

## 1. Project Overview

**ConsultingUZ** is the marketing & lead-generation website for an international personnel-placement
agency that connects German employers with qualified specialists from Uzbekistan. The product covers
the full pipeline: candidate selection → interview → documentation → visa → onboarding in Germany.

- **Type:** Bilingual (DE / UZ) marketing site with a contact / consultation funnel.
- **Primary audience:** German employers (Arbeitgeber) and Uzbek jobseekers (Arbeitssuchende).
- **Default language:** `de` (Deutsch). Switchable to `uz` via a navbar toggle (persisted to `localStorage`).
- **Hosted on:** Vercel (`https://consultinguz.vercel.app` is the fallback `metadataBase`).
- **Lead capture:** Contact form & consultation modal POST to `/api/contact`, which forwards to a
  Telegram chat via the Telegram Bot API.

---

## 2. Tech Stack

| Layer            | Choice                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router, `--turbopack` for dev & build)             |
| Runtime          | **React 19** + **TypeScript 5** (strict)                               |
| Styling          | **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme inline` tokens)  |
| UI primitives    | **shadcn/ui** (style: `new-york`, baseColor: `neutral`) on Radix UI    |
| Icons            | **lucide-react**                                                       |
| Animation        | **framer-motion** v12                                                  |
| Analytics        | **@vercel/analytics**                                                  |
| Lint / Format    | ESLint (`next/core-web-vitals` + `next/typescript` + `prettier`), Prettier |
| Path alias       | `@/*` → `./src/*`                                                      |

The project uses **Tailwind v4's CSS-first config** — there is no `tailwind.config.js`. Theme tokens
live in [src/app/globals.css](src/app/globals.css) under `@theme inline { … }`.

---

## 3. Repository Layout

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, Providers, Navbar, CTASticky, Footer, JSON-LD
│   ├── page.tsx                  # Home: Hero → Stats → FounderCard → ResultsMarquee → ProcessSection → FinalCTA
│   ├── providers.tsx             # Client-side <Providers/> wrapper (Consultation + Translation)
│   ├── globals.css               # Tailwind v4 entry + @theme tokens + CSS variables
│   ├── robots.ts                 # MetadataRoute.Robots
│   ├── sitemap.ts                # MetadataRoute.Sitemap (lists every public route)
│   ├── api/contact/route.ts      # POST handler → Telegram bot (lead capture)
│   ├── about/
│   │   ├── mission/              # /about/mission   (real content, MissionContent.tsx)
│   │   └── team/                 # /about/team      (ComingSoon placeholder)
│   ├── services/
│   │   ├── employers/            # /services/employers  (EmployersSegment)
│   │   ├── jobseekers/           # /services/jobseekers (JobseekersSegment)
│   │   ├── partners/             # /services/partners   (ComingSoon placeholder)
│   │   └── process/              # /services/process    (ProcessHero + Process)
│   ├── compliance/page.tsx       # /compliance     (static, UZ copy)
│   ├── datenschutz/              # /datenschutz    (DSGVO privacy notice, DE+UZ via i18n)
│   └── contact/                  # /contact        (full form + office info)
├── components/
│   ├── ui/                       # shadcn/ui primitives (button, card, dialog, sheet, input, …)
│   ├── providers/
│   │   ├── translation-provider.tsx   # i18n context, MESSAGES dict, useI18n()
│   │   └── consultation-provider.tsx  # Global "Bepul maslahat" modal, useConsultation()
│   ├── Navbar.tsx, Footer.tsx, CTASticky.tsx
│   ├── Hero.tsx, Stats.tsx, FounderCard.tsx, ProcessSection.tsx, Process.tsx
│   ├── ResultsMarquee.tsx, PartnersMarquee.tsx
│   ├── EmployersSegment.tsx, JobseekersSegment.tsx
│   ├── ForEmployers.tsx, ForJobseekers.tsx, AboutBrief.tsx, FinalCTA.tsx
│   └── ComingSoon.tsx
├── lib/
│   ├── utils.ts                  # cn() — twMerge(clsx(...))
│   └── reveal.tsx                # useReveal() — IntersectionObserver hook
└── data/
    └── index.ts                  # stats, partners, testimonials (typed as readonly tuples)
public/
├── partners/, sections/          # brand assets used across the site
├── consulting-logo.png, hero-bg.jpg, herr-orif.jpg, favicon.png
```

### Page inventory (matches sitemap)

| Route                  | Status        | Component                                    |
| ---------------------- | ------------- | -------------------------------------------- |
| `/`                    | Live          | Composed in `app/page.tsx`                   |
| `/about/mission`       | Live          | `app/about/mission/MissionContent.tsx`       |
| `/about/team`          | Coming soon   | `<ComingSoon pageKey="nav_team" />`          |
| `/services/employers`  | Live          | `EmployersSegment`                           |
| `/services/jobseekers` | Live          | `JobseekersSegment`                          |
| `/services/partners`   | Coming soon   | `<ComingSoon pageKey="nav_partners" />`      |
| `/services/process`    | Live          | `ProcessHero` + `Process`                    |
| `/compliance`          | Live (UZ)     | Static copy in `app/compliance/page.tsx`     |
| `/datenschutz`         | Live (DE+UZ)  | `DatenschutzClient` (DSGVO notice)           |
| `/impressum`           | Live (DE+UZ)  | `ImpressumClient` (§ 5 TMG imprint)          |
| `/contact`             | Live          | `ContactClient` — form + office info         |

When adding a new route, also add it to [src/app/sitemap.ts](src/app/sitemap.ts).

---

## 4. Development

```bash
npm run dev            # next dev --turbopack  → http://localhost:3000
npm run build          # next build --turbopack
npm run start          # production server
npm run lint           # eslint
npm run format         # prettier --write .
npm run format:check   # prettier --check .
```

### Environment variables

| Var                     | Used in                            | Purpose                                     |
| ----------------------- | ---------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | `layout.tsx`, `sitemap.ts`, `robots.ts` | Canonical base URL (falls back to Vercel domain). |
| `TELEGRAM_BOT_TOKEN`    | `api/contact/route.ts`             | Bot used to deliver contact-form leads.     |
| `TELEGRAM_CHAT_ID`      | `api/contact/route.ts`             | Destination chat for leads.                 |

If the Telegram vars are missing, the API falls back to logging the submission — leads are silently
dropped in production if the bot is misconfigured. **Do not ship without verifying both vars.**

---

## 5. Conventions & Patterns

### File / component conventions

- **Server components by default.** Add `"use client"` only when the component needs hooks,
  browser APIs, `framer-motion`, event handlers, or context (`useI18n`, `useConsultation`).
- **Page → Client component split.** The pattern across the codebase:
  `app/<route>/page.tsx` exports `metadata` (server) and renders a sibling `*Client.tsx` /
  segment component that holds the interactive UI (e.g. `ContactPage` → `ContactClient`,
  `MissionPage` → `MissionContent`). Keep this split when adding new routes — it lets us export
  per-route metadata without disabling SSR.
- **Path imports** use the `@/` alias (e.g. `@/components/ui/button`). Do not use deep relative
  paths.
- **Class merging** always goes through `cn()` from [src/lib/utils.ts](src/lib/utils.ts).
- **Section layout** is standardised via [`<Section>` and `<SectionHeader>`](src/components/ui/section.tsx)
  — variants `default | subtle | muted | brand`, with consistent vertical rhythm
  (`py-12 sm:py-16 lg:py-20`) and a 7xl container. Prefer composing pages from `<Section>` rather
  than re-implementing wrappers.

### shadcn/ui

- Configured in [components.json](components.json): style `new-york`, RSC enabled, icons `lucide`,
  baseColor `neutral`, CSS variables on. Components live under [src/components/ui/](src/components/ui/).
- Add new primitives with `npx shadcn@latest add <name>` — they will land in `src/components/ui/`.
- The skill `shadcn/ui@shadcn` is installed in `.agents/skills/shadcn/` for automated use.

### Tailwind v4

- All design tokens are CSS variables defined in [src/app/globals.css](src/app/globals.css)
  (`@theme inline`). Brand color is `--color-brand: #003399` (German federal blue) and the
  `primary` color resolves to it.
- Custom radii: `--radius` is `1rem`, `radius-2xl` is `1.25rem`.
- Animations use `tw-animate-css` (already imported in `globals.css`) plus `framer-motion`.
- The skill `tailwind-v4-shadcn` is installed for v4-specific guidance.

### Internationalisation

- **There is no `next-intl` or `i18n` route segment.** All translations are a static dictionary in
  [src/components/providers/translation-provider.tsx](src/components/providers/translation-provider.tsx)
  (`MESSAGES.uz`, `MESSAGES.de`). Components call `const { t } = useI18n();` and reference keys.
- Default language is `de`. The user's choice is persisted to `localStorage["lang"]`.
- **When you add user-visible copy, add both `de` and `uz` keys.** Missing keys silently fall back
  to the key itself, which ships untranslated text to production. Keep the two language blocks in
  sync — they share the same key names by section comment (`// Navbar`, `// Hero`, etc.).
- A few client components (e.g. `DatenschutzClient`) use inline bilingual constants instead of
  `useI18n()` — this is acceptable for long-form legal copy but new content should prefer the
  central dictionary.

### Data

- Static facts (stats, partners, testimonials) live in [src/data/index.ts](src/data/index.ts) as
  `as const` tuples with derived types. Treat them as design-time content, not as a CMS.

### Animation

- `framer-motion` is used for hero / section reveals and the marquees. The reusable
  [`useReveal`](src/lib/reveal.tsx) hook (IntersectionObserver) is for non-Motion components that
  need on-scroll reveals. The `framer-motion-animator` skill is installed for guidance.

### SEO

- Per-route `metadata` exports are required (the home / contact / datenschutz / each services route
  already do this — keep the pattern).
- The root layout injects an `EmploymentAgency` JSON-LD block — keep address, phone, and email
  there in sync with the contact page (`OFFICE_PHONE`, `OFFICE_EMAIL`, `OFFICE_ADDRESS` in
  [ContactClient.tsx](src/app/contact/ContactClient.tsx)).
- `sitemap.ts` is the source of truth for indexable routes. Add new pages here.

### Lead capture / API

- [src/app/api/contact/route.ts](src/app/api/contact/route.ts) is a single POST handler. It
  validates that `name` plus at least one of `email`/`phone` is present, escapes HTML, and forwards
  a formatted message to Telegram via `parse_mode: "HTML"`.
- Both the consultation modal ([consultation-provider.tsx](src/components/providers/consultation-provider.tsx))
  and the contact page ([ContactClient.tsx](src/app/contact/ContactClient.tsx)) post to the same
  endpoint. If you change the schema, update both call sites.

### Accessibility

- The root layout includes a "Skip to content" link and `<main role="main" id="main">`.
- Form fields use `<Label>`, `aria-invalid`, `aria-describedby` for errors, and `aria-live`
  regions for submit feedback. Maintain this when adding new form fields.

---

## 6. Skills installed

These skills (in `.agents/skills/`, managed by `npx skills`) are available to AI agents working in
this repo. Consult them when the task touches their domain:

| Skill                                  | When to use                                                |
| -------------------------------------- | ---------------------------------------------------------- |
| `shadcn`                               | Adding/configuring shadcn/ui components.                   |
| `nextjs-app-router-patterns`           | Routing, server vs client, metadata, layouts, route handlers. |
| `vercel-react-best-practices`          | React 19 idioms, RSC boundaries, performance.              |
| `tailwind-v4-shadcn`                   | Tailwind v4 (`@theme`, CSS-first) + shadcn token wiring.   |
| `typescript-advanced-types`            | Complex generics, narrowing, utility types.                |
| `framer-motion-animator`               | Variants, scroll-triggered reveals, layout animation.      |
| `seo`                                  | Metadata, JSON-LD, Core Web Vitals, sitemap/robots tuning. |

Manage them with:

```bash
npx skills find <query>          # search the catalog at https://skills.sh
npx skills add <owner/repo[@skill]>   # install
npx skills list                  # show installed
npx skills update                # upgrade
```

---

## 7. Working notes for AI agents

- **Default to editing existing components.** Most page-level work is a matter of composing
  `<Section>` blocks and the existing `Hero/Process/Final CTA/...` components — resist the urge to
  introduce new patterns.
- **Never break the i18n contract.** Every user-visible string should be a `t("…")` call (or, for
  legal pages, an entry in the page-local DE/UZ object). Hard-coded German or Uzbek strings in
  components are a bug.
- **Respect server/client boundaries.** Do not add `"use client"` to a `page.tsx` if you can keep
  it server-only and push interactivity into a child. Doing otherwise loses the metadata
  hoisting pattern used everywhere else.
- **Keep the Telegram payload backwards-compatible.** Both the modal and the full form post to
  `/api/contact`; any new field must be optional on the server side or both clients must be
  updated together.
- **When adding routes, update [`src/app/sitemap.ts`](src/app/sitemap.ts).** It's the only place
  search engines will pick them up.
- **Brand color is `#003399`** (mapped to `--primary`). Don't introduce new accent colors without
  adding a token to `@theme` in `globals.css`.
- **Founder / contact data is duplicated** between the JSON-LD block in `layout.tsx` and the
  `ContactClient` constants. Keep them in sync.
- **`.next/` and `node_modules/`** are ignored — never commit build output. `package-lock.json` is
  ignored by Prettier but committed by Git.

---

## 8. Known gaps / placeholders

- `/about/team` and `/services/partners` render `<ComingSoon>` — real content pending.
- `PartnersMarquee` is rendered in source but commented out on the home page (`src/app/page.tsx`).
- The contact API silently logs and returns 200 when Telegram env vars are missing — verify
  configuration before shipping to a new environment.
- The consultation modal uses inline UZ copy instead of `useI18n` — switch it over if the modal
  ever needs to render in DE.
