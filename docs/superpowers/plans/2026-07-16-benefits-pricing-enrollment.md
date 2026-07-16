# Benefits, Pricing, and Enrollment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two responsive, conversion-focused home-page sections with a shared accessible enrollment modal and a safe-area-aware mobile action bar.

**Architecture:** Typed arrays provide all benefit and tariff content. Reusable card components render those arrays, while one client-side `EnrollmentExperience` component owns modal selection and visibility state. The existing Header and Hero remain unchanged; `page.tsx` only appends the new experience after Hero.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn-style Button, Framer Motion, Lucide React, Vitest, Testing Library.

## Global Constraints

- Do not modify the existing Header or Hero components.
- Create only the benefits and pricing sections.
- Store all price placeholders as temporary data and label them visibly.
- Use one shared enrollment modal for every enrollment trigger.
- Preserve the fixed Header and add a mobile-only fixed action bar.
- Prevent horizontal scrolling and account for iPhone safe areas.

---

### Task 1: Content data and section rendering

**Files:**
- Create: `src/data/home-content.ts`
- Create: `src/components/benefit-card.tsx`
- Create: `src/components/benefits-section.tsx`
- Create: `src/components/pricing-card.tsx`
- Create: `src/components/pricing-section.tsx`
- Test: `src/components/home-sections.test.tsx`

**Interfaces:**
- Produces: `benefits`, `tariffs`, `Benefit`, and `Tariff`.
- Produces: `BenefitsSection`.
- Produces: `PricingSection({ onEnroll, onConsultation })`.

- [ ] **Step 1: Write the failing rendering tests**

Create tests that render the benefits and pricing sections, assert all four benefit titles, all three tariff names, the required heading and subtitle, the consultation text, and three visible temporary-price labels.

- [ ] **Step 2: Run the rendering tests**

Run: `pnpm test --run src/components/home-sections.test.tsx`

Expected: FAIL because the section modules do not exist.

- [ ] **Step 3: Add typed data and reusable cards**

Create `Benefit` and `Tariff` types, four benefits, and three tariffs. Set `isTemporaryPrice: true` for every tariff. Render the arrays with focused card components and use responsive Tailwind grids.

- [ ] **Step 4: Run the rendering tests**

Run: `pnpm test --run src/components/home-sections.test.tsx`

Expected: PASS.

### Task 2: Shared enrollment modal behavior

**Files:**
- Create: `src/components/enrollment-modal.tsx`
- Test: `src/components/enrollment-modal.test.tsx`

**Interfaces:**
- Produces: `EnrollmentModal({ isOpen, selectedProgram, onClose })`.

- [ ] **Step 1: Write failing modal tests**

Cover selected-program insertion, focus on the name field, body scroll locking, Escape close, backdrop close, and the presence of labeled name and phone fields.

- [ ] **Step 2: Run the modal tests**

Run: `pnpm test --run src/components/enrollment-modal.test.tsx`

Expected: FAIL because the modal module does not exist.

- [ ] **Step 3: Implement the accessible modal**

Use an overlay with `role="dialog"`, `aria-modal="true"`, a labeled heading, keyboard handling for Escape and Tab, backdrop click handling, focus restoration, and a body overflow cleanup effect.

- [ ] **Step 4: Run the modal tests**

Run: `pnpm test --run src/components/enrollment-modal.test.tsx`

Expected: PASS.

### Task 3: Enrollment orchestration and mobile action bar

**Files:**
- Create: `src/components/mobile-action-bar.tsx`
- Create: `src/components/enrollment-experience.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/enrollment-experience.test.tsx`

**Interfaces:**
- Produces: `MobileActionBar({ onEnroll })`.
- Produces: `EnrollmentExperience`.

- [ ] **Step 1: Write failing interaction tests**

Render `EnrollmentExperience`, click the АКПП tariff button, and assert the dialog contains that program. Assert the mobile telephone action uses `tel:+74852700303`, and the general mobile enrollment action opens “Бесплатная консультация”.

- [ ] **Step 2: Run the interaction tests**

Run: `pnpm test --run src/components/enrollment-experience.test.tsx`

Expected: FAIL because the orchestration modules do not exist.

- [ ] **Step 3: Implement state and page integration**

Keep `selectedProgram` and `isModalOpen` in `EnrollmentExperience`, pass handlers to both sections and the mobile bar, render one modal, and append the component after `Hero` in `page.tsx`.

- [ ] **Step 4: Run the interaction tests**

Run: `pnpm test --run src/components/enrollment-experience.test.tsx`

Expected: PASS.

### Task 4: Responsive safety and full verification

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Adds document-level horizontal overflow protection without changing Header or Hero styles.

- [ ] **Step 1: Add overflow protection**

Apply `overflow-x: clip` to `body`. Keep mobile bar spacing in the pricing section with `env(safe-area-inset-bottom)`.

- [ ] **Step 2: Run the complete test suite**

Run: `pnpm test --run`

Expected: all tests PASS with no warnings.

- [ ] **Step 3: Run static checks**

Run: `pnpm typecheck`

Expected: exit code 0.

Run: `pnpm lint`

Expected: exit code 0.

- [ ] **Step 4: Run the production build**

Run: `pnpm build`

Expected: Next.js production build completes successfully.
