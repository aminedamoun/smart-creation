# Smart Business Creation — Website

Production-grade, editorially-designed marketing site for Smart Business Creation (smartbusinesscreation.com), a Dubai business-setup consultancy founded in 2013.

Built with **Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide**.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page is at `/`.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server after a build |
| `npm run typecheck` | TypeScript check without emitting |
| `npm run lint` | Next.js lint |

---

## Design system

- **Typography** — Fraunces (display serif, optical sizing) paired with Geist sans + Geist mono for editorial markers.
- **Palette** — warm paper `#f6f3ec` base, deep ink `#0d1013` text, brand blue `#48a8db`, stone `#737574`, and a warm sand accent. Brand tokens live in [`app/globals.css`](./app/globals.css) under the Tailwind v4 `@theme` block.
- **Voice** — professional, confident, editorial. Copy reads like an FT feature, not a sales landing page. No stock-photo hero, no purple gradient AI slop.

### Aesthetic pillars

1. **Editorial Precision** — masthead line in the header, `§`-marked section numbers, hairline rules, mono captions.
2. **Asymmetric 12-column grid** on most sections for dynamic composition.
3. **Restrained motion** — staggered `fade-up` on scroll (framer-motion), CSS marquee ticker for free zones, ease-out counter animations for stats.
4. **Signature mark** — isometric "SC" cube recreated as pure SVG with gradients in [`components/logo.tsx`](./components/logo.tsx). Ships in three sizes: mark-only, full lockup, and a large hero variant.

---

## Page structure (`/`)

| Section | Component | Purpose |
|---|---|---|
| Sticky header | `components/site-header.tsx` | Mega-menu nav, masthead line, phone CTA, book-consultation button, mobile drawer |
| Hero | `components/hero.tsx` | Editorial headline, trust strip (4 metrics), hero cube, decorative grid + radial wash |
| Free-zone ticker | `components/zones-ticker.tsx` | Infinite marquee of all 12 zones |
| Services (§01) | `components/services.tsx` | 8-card grid with icons, indexed as 01–08 |
| Free zones (§02) | `components/free-zones.tsx` | Data-table treatment with emirate, focus, timeline |
| Why SBC (§03) | `components/why-us.tsx` | 4-column differentiator block with oversized numerals |
| Process (§04) | `components/process.tsx` | Dark section, 5-step vertical timeline |
| Business center (§05) | `components/business-center.tsx` | Skyline illustration + floor-plan inset, 6 workspace types |
| Stats (§06) | `components/stats.tsx` | 4 animated counters on scroll |
| Testimonials (§07) | `components/testimonials.tsx` | 3 serif pull-quotes + trusted-by row |
| FAQ (§08) | `components/faq.tsx` | 8-item accordion with first item open |
| Final CTA (§09) | `components/final-cta.tsx` | Dark conversion section with glass contact card |
| Footer | `components/site-footer.tsx` | Brand column + 4 link columns + legal strip |
| WhatsApp FAB | `components/whatsapp-fab.tsx` | Floating chat button |

All content lives in [`lib/data.ts`](./lib/data.ts) so copy changes don't require touching components.

---

## Google & SEO

- **Metadata** — canonical URLs, Open Graph, Twitter cards, `hreflang` (en-AE / ar-AE) in [`app/layout.tsx`](./app/layout.tsx).
- **Structured data** — JSON-LD `Organization`, `LocalBusiness`/`ProfessionalService`, `WebSite` nodes in a single `@graph` injected into `<head>`.
- **Sitemap & robots** — auto-generated at `/sitemap.xml` and `/robots.txt` from [`app/sitemap.ts`](./app/sitemap.ts) and [`app/robots.ts`](./app/robots.ts). Includes all 12 free-zone routes and 8 service routes as placeholders for future subpage builds.
- **Icons** — favicon and Apple-touch icon generated from the SC cube in [`app/icon.tsx`](./app/icon.tsx) and [`app/apple-icon.tsx`](./app/apple-icon.tsx).
- **Core Web Vitals** — fonts loaded with `display: swap`; hero cube is inline SVG (no network request); CSS-only marquee; reduced-motion respected.
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, strict `Referrer-Policy`, locked-down `Permissions-Policy` in [`next.config.ts`](./next.config.ts).
- **Accessibility** — skip-link, `focus-visible` rings, semantic `<main>`, `<header>`, `<footer>`, `<address>`, proper `aria-*` attributes on accordion and menus, keyboard-operable mega-menu.

Replace the placeholder `/og-image.png` file with a branded 1200×630 OG image before launch.

---

## Project layout

```
smart creation website/
├── app/
│   ├── apple-icon.tsx
│   ├── globals.css          ← Tailwind v4 @theme, brand tokens, grain, marquee, cube float
│   ├── icon.tsx
│   ├── layout.tsx           ← fonts, metadata, JSON-LD, header/footer
│   ├── page.tsx             ← landing (composition only)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── business-center.tsx
│   ├── faq.tsx
│   ├── final-cta.tsx
│   ├── free-zones.tsx
│   ├── hero.tsx
│   ├── logo.tsx             ← Logo, LogoMark, HeroCube SVGs
│   ├── process.tsx
│   ├── services.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── stats.tsx
│   ├── testimonials.tsx
│   ├── ui/
│   │   ├── counter.tsx
│   │   └── section-header.tsx
│   ├── whatsapp-fab.tsx
│   ├── why-us.tsx
│   └── zones-ticker.tsx
├── lib/
│   ├── data.ts              ← navigation, services, zones, testimonials, FAQ, contact
│   └── utils.ts             ← cn() class-name helper
├── public/                  ← add og-image.png, company-profile.pdf, etc.
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## What to build next

The landing page is live, but the rest of the site needs to follow:

1. **Service subpages** (`/services/mainland`, `/services/free-zone`, …) — use the services grid data and give each a hero + pricing matrix + FAQ.
2. **Free-zone detail pages** (`/free-zones/ifza`, `/free-zones/dmcc`, …) — scaffold from the same template: zone overview, activity list, indicative pricing, 3-step process, office options.
3. **Business-centres page** (`/business-centers`) with a bookable office tour form.
4. **Cost calculator** (`/calculator`) — client-side interactive pricing quote.
5. **Arabic locale** (`/ar`) — `next-intl` or built-in i18n routing; flip RTL by adding `dir="rtl"` when `lang === "ar"`.
6. **Contact form** — `/contact` with a validated form that POSTs to your CRM (HubSpot, Zoho, Pipedrive) via a server action.
7. **Insights / blog** (`/insights`) — MDX-based articles for SEO content; target the long-tail keywords from the ranking sheet (mainland setup, free-zone comparison, Golden Visa, Corporate Tax guide).
8. **Analytics & consent** — GA4 + Search Console; cookie banner wiring.
9. **Arabic content + RTL audit** — review every section for mirrored layouts and type-setting (numerals stay LTR).
10. **Replace placeholders** — real office photography, an authoritative OG image, a downloadable company profile PDF.

---

## Brand assets

- **Primary blue** `#48a8db`
- **Light blue** `#8dc2dd`
- **Dark grey / stone** `#737574`
- **Light grey / mist** `#b5b6b8`

The logo is the isometric "S·C" cube, reproduced as SVG — no raster files are required for web use. For print, export the `HeroCube` SVG at any resolution.

---

© Smart Business Creation. Trusted since 2013.
