# Production Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the home-page client bundle, add complete App Router system
states, and verify production quality without changing the approved design or
adding marketing sections.

**Architecture:** Replace the all-encompassing `EnrollmentExperience` client
boundary with a narrow context provider that accepts Server Component children.
Render home sections directly from the server page, keep only interactive
islands client-side, and use route conventions for loading, error, and not-found
states.

**Tech Stack:** Next.js 15.5, React 19, TypeScript, Tailwind CSS 4,
Framer Motion 12, shadcn-style UI primitives, Vitest, Testing Library,
Lighthouse.

## Global Constraints

- Do not add marketing sections or internal business pages.
- Do not change approved copy, layout, colors, typography, radii, or shadows.
- Do not add a backend or simulate fake network requests.
- Do not add runtime dependencies.
- Preserve all current enrollment flows and accessible modal behavior.
- Preserve native Next.js scroll restoration and existing smooth anchor scroll.
- Keep Lighthouse output under `work/`, not in application source.
- Do not commit or push unless the user explicitly requests it.

---

### Task 1: Typed enrollment provider

**Files:**
- Create: `src/components/enrollment-provider.tsx`
- Create: `src/components/enrollment-provider.test.tsx`
- Create: `src/components/enrollment-trigger.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/hero.tsx`
- Modify: `src/components/pricing-section.tsx`
- Modify: `src/components/programs-section.tsx`
- Modify: `src/components/learning-timeline.tsx`
- Modify: `src/components/instructors-section.tsx`
- Modify: `src/components/fleet-section.tsx`
- Modify: `src/components/final-cta.tsx`
- Delete: `src/components/enrollment-experience.tsx`
- Replace test: `src/components/enrollment-experience.test.tsx`

**Interfaces:**
- Produces:
  ```ts
  export type EnrollmentContextValue = {
    openEnrollment: (program: string) => void;
    openConsultation: () => void;
    closeEnrollment: () => void;
  };

  export type EnrollmentProviderProps = {
    children: React.ReactNode;
  };

  export function EnrollmentProvider({
    children,
  }: EnrollmentProviderProps): React.ReactNode;

  export function useEnrollment(): EnrollmentContextValue;
  ```
- `EnrollmentTrigger` consumes:
  ```ts
  export type EnrollmentTriggerProps =
    Omit<ButtonProps, "onClick"> & {
      children: React.ReactNode;
      program?: string;
    };
  ```
  It calls `openEnrollment(program)` or `openConsultation()`.

- [ ] **Step 1: Write provider tests before production code**

  Cover consultation selection, explicit program selection, modal close, and
  the error thrown when `useEnrollment()` is used outside the provider:

  ```tsx
  function TestActions() {
    const { openEnrollment, openConsultation } = useEnrollment();
    return (
      <>
        <button onClick={openConsultation}>Консультация</button>
        <button onClick={() => openEnrollment("Категория B — АКПП")}>
          АКПП
        </button>
      </>
    );
  }
  ```

- [ ] **Step 2: Run the focused test and verify RED**

  Run:
  ```powershell
  .\node_modules\.bin\vitest.cmd run src\components\enrollment-provider.test.tsx
  ```

  Expected: failure because `enrollment-provider.tsx` does not exist.

- [ ] **Step 3: Implement the minimal typed provider**

  Use context with a stable value:

  ```tsx
  "use client";

  import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";

  const consultationProgram = "Бесплатная консультация";
  const EnrollmentContext = createContext<EnrollmentContextValue | null>(null);

  export function EnrollmentProvider({ children }: EnrollmentProviderProps) {
    const [selectedProgram, setSelectedProgram] =
      useState(consultationProgram);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openEnrollment = useCallback((program: string) => {
      setSelectedProgram(program);
      setIsModalOpen(true);
    }, []);
    const closeEnrollment = useCallback(() => setIsModalOpen(false), []);
    const openConsultation = useCallback(
      () => openEnrollment(consultationProgram),
      [openEnrollment],
    );
    const value = useMemo(
      () => ({ openEnrollment, openConsultation, closeEnrollment }),
      [closeEnrollment, openConsultation, openEnrollment],
    );

    return (
      <EnrollmentContext.Provider value={value}>
        {children}
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={closeEnrollment}
          selectedProgram={selectedProgram}
        />
        <MobileActionBar onEnroll={openConsultation} />
      </EnrollmentContext.Provider>
    );
  }
  ```

- [ ] **Step 4: Run provider tests and verify GREEN**

- [ ] **Step 5: Add failing integration tests for every existing trigger**

  Assert Header, Hero, pricing, programs, timeline, instructors, fleet, final
  CTA, and mobile bar all open the same modal with the correct selected value.
  Add an assertion that clicking an arbitrary `a[href="#enroll"]` no longer
  opens the modal through document-level delegation.

- [ ] **Step 6: Move sections into `page.tsx` under the provider**

  The page structure becomes:

  ```tsx
  <EnrollmentProvider>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <BenefitsSection />
      <PricingSection />
      <ProgramsSection />
      <ProgramQuiz />
      <LearningTimeline />
      <InstructorsSection />
      <FleetSection />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <FinalCta />
    </main>
    <SiteFooter />
  </EnrollmentProvider>
  ```

- [ ] **Step 7: Replace callback props with `useEnrollment()`**

  Remove callback prop types from each interactive section. Call the provider
  hook directly. Remove unnecessary `useCallback` wrappers from
  `InstructorsSection`; its local handlers do not feed memoized children.

- [ ] **Step 8: Add `EnrollmentTrigger` to the server-rendered Hero**

  Keep the same Button size, icon, label, and classes. The trigger is the only
  client island inside Hero.

- [ ] **Step 9: Delete `EnrollmentExperience` and run all enrollment tests**

  Expected: all enrollment flows pass and no document click effect remains.

---

### Task 2: Recover Server Components and reduce Framer Motion

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/components/benefit-card.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/hero.test.tsx`
- Modify: `src/components/home-sections.test.tsx`

**Interfaces:**
- Hero remains `export function Hero()`.
- BenefitCard remains `export function BenefitCard({ benefit })`.
- CSS produces `hero-enter` and `hero-media-enter` animation utilities.

- [ ] **Step 1: Add tests asserting Hero and BenefitCard render without
  Framer-specific runtime output**

  Assert stable content, image priority attributes through the Next Image mock,
  CTA behavior, and unchanged accessible headings.

- [ ] **Step 2: Run focused tests before the refactor**

  Existing behavioral tests should pass. Record this characterization baseline.

- [ ] **Step 3: Convert Hero to a Server Component**

  Remove:

  ```ts
  "use client";
  import { motion, useReducedMotion } from "framer-motion";
  ```

  Replace motion wrappers with semantic HTML using CSS variables:

  ```tsx
  <p
    className="hero-enter ..."
    style={{ "--hero-delay": "0ms" } as React.CSSProperties}
  >
  ```

  Use the existing stagger values: 0, 80, 160, 240, 320, and 400 ms.

- [ ] **Step 4: Add matching CSS keyframes**

  ```css
  @keyframes hero-enter {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hero-enter {
    animation: hero-enter 580ms cubic-bezier(.22, 1, .36, 1) both;
    animation-delay: var(--hero-delay, 0ms);
  }
  ```

  Add a separate 900 ms opacity/scale animation for the Hero image. Existing
  reduced-motion CSS must reduce both to 0.01 ms.

- [ ] **Step 5: Convert BenefitCard to CSS-only hover**

  Remove Framer and `useReducedMotion`. Add `hover:-translate-y-1` to the
  existing transform transition.

- [ ] **Step 6: Run focused and full tests**

- [ ] **Step 7: Build and record the new route JavaScript sizes**

  Compare against the baseline:

  ```text
  / route JS: 81.3 kB
  First Load JS: 187 kB
  ```

---

### Task 3: Loading skeleton and route loading state

**Files:**
- Create: `src/components/ui/skeleton.tsx`
- Create: `src/components/home-loading-skeleton.tsx`
- Create: `src/components/home-loading-skeleton.test.tsx`
- Create: `src/app/loading.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces:
  ```ts
  export function Skeleton(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
  export function HomeLoadingSkeleton(): JSX.Element;
  ```

- [ ] **Step 1: Write a failing semantic skeleton test**

  Assert:

  - `role="status"`;
  - accessible text `Загружаем страницу`;
  - reserved Hero media block;
  - four first-section card placeholders;
  - decorative blocks are `aria-hidden`.

- [ ] **Step 2: Run the test and verify RED**

- [ ] **Step 3: Implement the shadcn-style Skeleton primitive**

  ```tsx
  import { cn } from "@/lib/utils";

  export function Skeleton({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn("skeleton-pulse rounded-xl bg-neutral-200", className)}
        {...props}
      />
    );
  }
  ```

- [ ] **Step 4: Build the no-JavaScript home skeleton**

  Reuse the page container widths, header height, Hero grid, card radii, and
  breakpoint structure without copying real text.

- [ ] **Step 5: Export it from `src/app/loading.tsx`**

  ```tsx
  export default function Loading() {
    return <HomeLoadingSkeleton />;
  }
  ```

- [ ] **Step 6: Add pulse CSS and reduced-motion behavior**

- [ ] **Step 7: Run focused tests**

---

### Task 4: Error and not-found route states

**Files:**
- Create: `src/app/error.tsx`
- Create: `src/app/error.test.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/not-found.test.tsx`

**Interfaces:**
- Error consumes:
  ```ts
  type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
  };
  ```
- NotFound has no props.

- [ ] **Step 1: Write failing Error tests**

  Assert the error heading, Retry button, home link, and `reset()` invocation.

- [ ] **Step 2: Run Error tests and verify RED**

- [ ] **Step 3: Implement `error.tsx`**

  It must start with `"use client"`, use the shared Button, and avoid a logging
  effect:

  ```tsx
  <Button onClick={reset}>Попробовать снова</Button>
  <Button asChild variant="outline">
    <Link href="/">Вернуться на главную</Link>
  </Button>
  ```

- [ ] **Step 4: Write failing NotFound tests**

  Assert `404`, the home link, and `/#contacts`.

- [ ] **Step 5: Implement `not-found.tsx` as a Server Component**

- [ ] **Step 6: Run both focused suites**

---

### Task 5: Reusable empty collection states

**Files:**
- Create: `src/components/empty-state.tsx`
- Create: `src/components/empty-state.test.tsx`
- Modify: `src/components/programs-section.tsx`
- Modify: `src/components/instructors-section.tsx`
- Modify: `src/components/fleet-section.tsx`
- Modify: `src/components/reviews-section.tsx`
- Modify corresponding section tests.

**Interfaces:**
- Produces:
  ```ts
  type EmptyStateProps = {
    title: string;
    description: string;
    action?: React.ReactNode;
  };
  ```
- Sections accept optional collection props only for testability:
  ```ts
  type ProgramsSectionProps = { items?: readonly Program[] };
  type InstructorsSectionProps = { items?: readonly Instructor[] };
  type FleetSectionProps = { items?: readonly TrainingCar[] };
  type ReviewsSectionProps = { items?: readonly StudentReview[] };
  ```
  Production defaults remain the existing imported arrays.

- [ ] **Step 1: Write the reusable EmptyState test**

  Assert heading, description, and optional action rendering.

- [ ] **Step 2: Run and verify RED**

- [ ] **Step 3: Implement the neutral EmptyState**

  Use the existing border, radius, spacing, and typography hierarchy. Do not
  add icons or animation.

- [ ] **Step 4: Add failing empty-array tests to all four sections**

  Pass `items={[]}` or `reviews={[]}` and assert the correct state. Keep normal
  dataset tests unchanged.

- [ ] **Step 5: Add typed optional data props and conditional rendering**

  Example:

  ```tsx
  {items.length > 0 ? (
    <div className="...">{items.map(...)}</div>
  ) : (
    <EmptyState
      title="Программы временно недоступны"
      description="Позвоните нам — администратор поможет подобрать обучение."
    />
  )}
  ```

- [ ] **Step 6: Run focused tests**

---

### Task 6: Next.js, Tailwind, accessibility, and render cleanup

**Files:**
- Modify files only where the audit proves a change is required.
- Review: `src/app/layout.tsx`
- Review: `src/app/globals.css`
- Review: `src/components/**/*.tsx`
- Review: `package.json`

- [ ] **Step 1: Verify native navigation behavior**

  Keep Next.js default route scrolling and browser history restoration. Do not
  add a custom component or route-change effect. Keep `html { scroll-behavior:
  smooth; }`, fixed-header offsets, and reduced-motion override.

- [ ] **Step 2: Audit Client Component directives**

  For every `"use client"` file, confirm it directly needs state, an event
  handler, an effect, browser API access, or a client library entry point.
  Remove the directive only when the component can be imported directly from a
  Server Component without function props.

- [ ] **Step 3: Audit effects and callbacks**

  Keep modal focus/scroll-lock effects and Header scroll/menu effects. Remove
  the enrollment document effect and local callbacks without a memoization
  consumer.

- [ ] **Step 4: Audit image performance**

  Confirm:

  - only Hero uses `priority`;
  - every fill image has a stable container;
  - every image has `sizes`;
  - all non-Hero images retain default lazy loading;
  - no raw `<img>` exists.

- [ ] **Step 5: Audit Tailwind and shadcn primitives**

  Confirm Button and Skeleton are the only general UI primitives required.
  Search for unused classes, duplicate standalone button implementations, and
  conflicting focus states.

- [ ] **Step 6: Audit dependencies and typing**

  Use source searches to prove every package is imported. Run strict
  TypeScript. Search for `any`, `@ts-ignore`, disabled lint rules, TODO, FIXME,
  and console calls.

- [ ] **Step 7: Run accessibility regression tests**

  Verify keyboard modal/menu control, focus restoration, `aria-live`, error
  alerts, headings, main landmark, skip link, telephone links, and contrast
  class choices.

---

### Task 7: Production and Lighthouse verification

**Files:**
- Write reports only to: `work/lighthouse/`
- Do not modify application source unless an audit exposes a reproducible issue.

- [ ] **Step 1: Run the full automated suite**

  ```powershell
  .\node_modules\.bin\vitest.cmd run
  .\node_modules\.bin\tsc.cmd --noEmit
  .\node_modules\.bin\eslint.cmd . --max-warnings 0
  .\node_modules\.bin\next.cmd build
  ```

  Expected: zero failures, errors, and warnings.

- [ ] **Step 2: Record final bundle output**

  Compare home route Size and First Load JS with the 81.3/187 kB baseline.

- [ ] **Step 3: Start `next start` on port 3117**

  Use installed Node and a hidden background process. Stop it after all audits.

- [ ] **Step 4: Run production HTML smoke tests**

  Verify status 200, canonical, Open Graph, Twitter, JSON-LD, main landmark,
  robots, sitemap, and noindex for placeholder routes.

- [ ] **Step 5: Run mobile Lighthouse**

  Use temporary Lighthouse CLI and installed Chrome:

  ```powershell
  npx --yes lighthouse http://127.0.0.1:3117 `
    --chrome-path="C:\Program Files\Google\Chrome\Application\chrome.exe" `
    --only-categories=performance,accessibility,best-practices,seo `
    --output=json `
    --output=html `
    --output-path=work/lighthouse/perekrestok-mobile `
    --quiet
  ```

- [ ] **Step 6: Parse the report**

  Report category scores and numeric LCP, CLS, and Total Blocking Time. If a
  score is below 90, inspect the exact failing audits before changing code.

- [ ] **Step 7: Responsive production review**

  Review the page at 320, 375, 390, 414, 768, and 1024 CSS pixels. Check
  horizontal overflow, fixed Header, mobile bar safe area, cards, modals,
  skeleton, error page, and not-found page.

- [ ] **Step 8: Stop the server and confirm no background process remains**

- [ ] **Step 9: Produce the final improvement report**

  Include:

  - architecture changes;
  - removed client boundaries/effects;
  - route-state additions;
  - accessibility and SEO verification;
  - bundle before/after;
  - Lighthouse scores;
  - tests/build evidence;
  - remaining real-content or backend work only.
