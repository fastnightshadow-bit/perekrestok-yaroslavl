# Perekrestok Header and Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality responsive Header and Hero for the “Перекрёсток” driving-school concept.

**Architecture:** Use a minimal Next.js App Router project. Keep the interactive header in a focused client component, keep the hero in a separate presentation component, and reuse a shadcn-style Button primitive. Tests exercise rendered user behavior rather than implementation details.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui conventions, Framer Motion, Vitest, Testing Library.

## Global Constraints

- Render only Header and Hero.
- Use Russian copy from the approved design spec.
- Mobile-first responsive behavior.
- Yellow is reserved for primary actions and small accents.
- Respect keyboard navigation and reduced motion.
- Do not invent later sections or pages.

---

### Task 1: Project foundation and failing component tests

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/components/site-header.test.tsx`
- Create: `src/components/hero.test.tsx`

**Interfaces:**
- Consumes: none.
- Produces: tests expecting `SiteHeader` and `Hero` named exports.

- [ ] Add the Next.js, Tailwind, Framer Motion, shadcn utility, and test dependencies.
- [ ] Configure the `@/*` TypeScript alias and jsdom test environment.
- [ ] Write tests that import the missing components and assert accessible copy and menu behavior.
- [ ] Run `pnpm test --run` and confirm failure because the components do not exist.

### Task 2: Shared UI foundation

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/button.tsx`
- Create: `src/app/globals.css`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string`.
- Produces: `Button` with shadcn-compatible `variant`, `size`, and `asChild` props.

- [ ] Implement `cn` with `clsx` and `tailwind-merge`.
- [ ] Implement the shadcn-style Button primitive using `class-variance-authority`.
- [ ] Define the warm-white, graphite, yellow, spacing, focus, and motion rules in global CSS.

### Task 3: Header behavior

**Files:**
- Create: `src/components/site-header.tsx`
- Test: `src/components/site-header.test.tsx`

**Interfaces:**
- Produces: `SiteHeader(): JSX.Element`.

- [ ] Implement transparent and scrolled visual states without layout shift.
- [ ] Implement desktop navigation, telephone link, and CTA.
- [ ] Implement an accessible mobile-menu trigger and panel.
- [ ] Run `pnpm test --run src/components/site-header.test.tsx` and confirm passing behavior.

### Task 4: Hero presentation

**Files:**
- Create: `src/components/hero.tsx`
- Create: `public/images/driving-school-hero.jpg`
- Test: `src/components/hero.test.tsx`

**Interfaces:**
- Produces: `Hero(): JSX.Element`.

- [ ] Add one editorial placeholder photograph licensed for prototype use.
- [ ] Implement the responsive content and media grid.
- [ ] Add restrained Framer Motion entrances with reduced-motion support.
- [ ] Render price, rating, advantages, and two accessible CTAs.
- [ ] Run `pnpm test --run src/components/hero.test.tsx` and confirm passing behavior.

### Task 5: App integration and verification

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `eslint.config.mjs`
- Create: `components.json`

**Interfaces:**
- `page.tsx` renders exactly `SiteHeader` followed by `Hero`.

- [ ] Configure root metadata, font loading, and body styling.
- [ ] Integrate only Header and Hero.
- [ ] Run `pnpm test --run`.
- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `pnpm exec eslint .`.
- [ ] Run `pnpm build`.
- [ ] Confirm no later homepage section or route was created.

