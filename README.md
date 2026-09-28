<!-- LB mark, royal/monochrome headless version (from version-headless-royal-monochrome.txt) -->
```text
   :.    .-:::::::::::::::::::::::::::::::::::::::::.
  *%%-    -+++++++++++++++++++++++++++++++++++++++++++=-:
 *%%%%*    .=+++++++++++++++++++++++++++++++++++++++++++++=:
 #%%%%%#.    -++++++++++++++++++++++++++++++++++++++++++++++=.
 *%%%%%%%-    :+++++++++++++++++++++++++++++++++++++++++++++++-
 *%%%%%%%%+    .=++++++++++++++++++++++++++++++++++++++++++++++-
 *%%%%%%%%%#.    ........::::..................:-=++++++++++++++.
 *%%%%%%%%%%%-                                    .+++++++++++++-
 *%%%%%%%%%%%#                                     :++++++++++++=
 *%%%%%%%%%%%*                                     -++++++++++++-
 *%%%%%%%%%%%*                                    -+++++++++++++
 *%%%%%%%%%%%*               :------------------=++++++++++++++:
 *%%%%%%%%%%%*             .+++++++++++++++++++++++++++++++++=.
 *%%%%%%%%%%%*             -++++++++++++++++++++++++++++++++=.
 *%%%%%%%%%%%*             -++++++++++++++++++++++++++++++++++=:
 *%%%%%%%%%%%*             -++++++++++++++++++++++++++++++++++++=:
 *%%%%%%%%%%%*             -++++++++++++++++++++++++++++++++++++++-
 *%%%%%%%%%%%*                                       .-++++++++++++-
 *%%%%%%%%%%%*                                         :++++++++++++:
 *%%%%%%%%%%%*                                          ++++++++++++=
 *%%%%%%%%%%%*                                         .++++++++++++=
 *%%%%%%%%%%%*                                        .=++++++++++++-
 *%%%%%%%%%%%#++++++++++++++++++++=     .:::::::::::-=++++++++++++++.
 *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#.   .=+++++++++++++++++++++++++:
 *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-    :++++++++++++++++++++++=.
 *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+    .=+++++++++++++++++++-
 *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#     -+++++++++++++++=:
 :#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=    :++++++++++=-:.
   -=++++===============================++      :::::...
```

# birch-labs-web

The Birch Labs site. Next.js 16 (App Router) + Tailwind 4 + Resend. Fully static apart from the contact endpoint.

## Layout

- `content/` — **all site copy and images.** There is one typed file per page (`home.ts`, `work.ts`, `services.ts`, `about.ts`, `contact.ts`). `site.ts` holds the name, contact details, socials, and default SEO. `projects.ts` holds the projects. Images are in `content/images/`. Pages import them statically, so `next/image` reads their dimensions and blur placeholders.
- `app/(site)/` — marketing routes with a shared Header/Footer layout
- `app/api/contact/route.ts` — zod-validated contact endpoint with in-memory rate limiting; sends via Resend when configured
- `app/robots.ts`, `app/sitemap.ts` — SEO basics
- `app/icon.svg`, `app/apple-icon.svg` — favicon
- `app/global-error.tsx` — catastrophic root-layout error boundary
- `components/ui/` — Button, Container, Heading, Section, Chip
- `components/layout/` — Header, Footer, Logo, DesktopNav, MobileNav, ThemeToggle
- `components/sections/` — page sections (Hero, About, ProjectCard, TwoTierServices, …)
- `lib/metadata.ts` — `seoMetadata()` builds a page's title/description/Open Graph/Twitter tags from its `seo` block

## Editing content

Change the string in the related `content/*.ts` file. `npm run typecheck` finds missing or misspelled fields.

- **New image:** drop it in `content/images/`, `import` it in the content file, and pass it as `{ src, alt }`.
- **New project:** add an entry to the `projects` array in `content/projects.ts`. The array order is the display order on `/work`.
- **Share image for a page:** put a 1200×630 image in `public/` and set `seo.ogImage` to its path.

## Quickstart

```sh
npm install          # Node 22 (pinned in mise.toml)
cp .env.example .env.local
npm run dev
```

## Environment variables

See `.env.example`. None are needed to build or run locally.

| Var                       | Required  | Purpose                                           |
| ------------------------- | --------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | in prod   | Absolute URL base for OG / metadata / sitemap     |
| `RESEND_API_KEY`          | for email | Contact form falls back to console log without it |
| `CONTACT_FORM_TO_EMAIL`   | for email | Destination address                               |
| `CONTACT_FORM_FROM_EMAIL` | no        | Overrides the From address                        |

## Theming

Colors are CSS custom properties in `app/globals.css`: the `:root` block (light) and `.dark` block (dark). Components read them through arbitrary-value utilities that reference `var(--color-…)`. A color change needs no component changes.

The header's `ThemeToggle` cycles **system → light → dark** and persists to `localStorage`. An inline script in the root layout sets `html.dark` before paint to avoid a light flash.

## Deploy

The `Dockerfile` produces a production image that runs anywhere:

```sh
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://example.com -t birch-labs-web .
```

`NEXT_PUBLIC_*` values are inlined at build time. Runtime secrets (`RESEND_API_KEY`, `CONTACT_FORM_TO_EMAIL`) are supplied by the platform at container start.

`fly.toml` deploys the Fly app `birch-labs-web` (region `yyz`, scales to zero) at https://birch-labs-web.fly.dev, with `birchlabs.ca` as the canonical URL. Every merge to `main` deploys automatically through `.github/workflows/deploy.yml`. You can also trigger that workflow from the Actions tab, or run `fly deploy` locally. That workflow uses the `FLY_API_TOKEN` repo secret, which is a deploy token scoped to this app. Runtime secrets are set with `fly secrets set KEY=value`: `RESEND_API_KEY`, `CONTACT_FORM_TO_EMAIL`, and `CONTACT_FORM_FROM_EMAIL`.

## Known limits

- **Rate limiting** — `lib/rate-limit.ts` is in-memory. For multi-instance deployments, replace it with `@upstash/ratelimit`.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve the built app
- `npm run lint` / `npm run typecheck`
