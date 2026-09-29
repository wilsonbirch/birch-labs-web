## Pre-merge checks

Before declaring any task "complete", run ALL THREE checks. Each catches a class of failure the others miss — do not declare done from a subset:

```bash
npm run lint            # ESLint — Next.js + React rules
npm run typecheck       # next typegen + tsc --noEmit — whole-program type errors
npm run build           # next build — production bundle + static prerender
```

What each uniquely catches:

- **lint** — stale-closure `useEffect` deps (`react-hooks/exhaustive-deps`), missing `key` props in `.map()`, dead variables, a11y regressions, and Next's own rules around `<Image>`, `<Link>`, and metadata. Errors fail the script; warnings are advisory.
- **typecheck** — whole-program type errors. `next typegen` first writes `next-env.d.ts` (gitignored; it declares the static image-import types), then `tsc --noEmit` walks the entire graph (including server components and route handlers) and surfaces type mismatches across module boundaries — including drift between the content files in `content/` and the types in `lib/types.ts` / component props.
- **build** — runs the full Next 16 production pipeline (Turbopack compile + static page generation). Only this catches: server/client boundary leaks (`"use client"` placement), prerender failures, broken static image imports from `content/images/`, and Tailwind CSS v4 + PostCSS resolution issues. Content is local, so a build needs no network access or env vars.

There is no test suite in this repo yet (no Vitest, no Playwright). If/when one is added, expand this list — don't fold the new checks silently into `build`.

**Local prerequisites:** none to build or run. The contact form (`/api/contact`) needs `RESEND_API_KEY` + `CONTACT_FORM_TO_EMAIL` to actually deliver mail; without them it logs to the server console and still returns 200 in dev (so dev work doesn't require a Resend account), but returns a 500 in production so leads are never silently dropped.

CI runs all three via `.github/workflows/ci.yml` on every PR to `main` and via `workflow_dispatch`. There's a single sequential job (`lint · typecheck · build`) — fast enough that parallelism isn't worth the complexity. A green CI run is the floor, not a victory lap.

## Plan Mode Instruction

Review this plan thoroughly before making any code changes. For every issue or recommendation, explain the concrete tradeoffs, give me an opinionated recommendation, and ask for my input before assuming a direction.

My engineering preferences (use these to guide your recommendations):

- DRY is important—flag repetition aggressively.
- Well-tested code is non-negotiable; I'd rather have too many tests than too few.
- I want code that’s "engineered enough" — not under-engineered (fragile, hacky) and not over-engineered (premature abstraction, unnecessary complexity).
- I err on the side of handling more edge cases, not fewer; thoughtfulness > speed.
- Bias toward explicit over clever.

1. Architecture review
   Evaluate:

- Overall system design and component boundaries.
- Dependency graph and coupling concerns.
- Data flow patterns and potential bottlenecks.
- Scaling characteristics and single points of failure.
- Security architecture (auth, data access, API boundaries).

2. Code quality review
   Evaluate:

- Code organization and module structure.
- DRY violations—be aggressive here.
- Error handling patterns and missing edge cases (call these out explicitly).
- Technical debt hotspots.
- Areas that are over-engineered or under-engineered relative to my preferences.

3. Test review
   Evaluate:

- Test coverage gaps (unit, integration, e2e).
- Test quality and assertion strength.
- Missing edge case coverage—be thorough.
- Untested failure modes and error paths.

4. Performance review
   Evaluate:

- N+1 queries and database access patterns.
- Memory-usage concerns.
- Caching opportunities.
- Slow or high-complexity code paths.

For each issue you find
For every specific issue (bug, smell, design concern, or risk):

- Describe the problem concretely, with file and line references.
- Present 2–3 options, including “do nothing” where that’s reasonable.

For each option, specify: implementation effort, risk, impact on other code, and maintenance burden.
Give me your recommended option and why, mapped to my preferences above.
Then explicitly ask whether I agree or want to choose a different direction before proceeding.

Workflow and interaction

- Do not assume my priorities on timeline or scale.
- After each section, pause and ask for my feedback before moving on.

BEFORE YOU START:
Ask if I want one of two options:
1/ BIG CHANGE: Work through this interactively, one section at a time (Architecture → Code Quality → Tests → Performance) with at most 4 top issues in each section.
2/ SMALL CHANGE: Work through interactively ONE question per review section

FOR EACH STAGE OF REVIEW: output the explanation and pros and cons of each stage’s questions AND your opinionated recommendation and why, and then use AskUserQuestion. Also NUMBER issues and then give LETTERS for options and when using AskUserQuestion make sure each option clearly labels the issue NUMBER and option LETTER so the user doesn't get confused. Make the recommended option always the 1st option.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
