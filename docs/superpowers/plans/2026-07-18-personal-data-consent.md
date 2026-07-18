# Personal Data Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add verified legal documents and explicit personal-data consent to every lead form without adding cookies, analytics, advertising consent, or unverified license information.

**Architecture:** Store verified operator data and internal legal routes in `siteConfig`. Reuse one controlled consent-field component in the shared enrollment form and the quiz form, and reuse one document shell for the two static legal routes.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library.

## Global Constraints

- Do not invent organization, license, hosting, processor, or analytics details.
- Do not add Yandex Metrika or a cookie banner in this phase.
- Preserve all unrelated working-tree changes.
- Consent must be unchecked by default and required before submission.
- Legal links in forms open in a new tab without losing entered data.

---

### Task 1: Consent behavior in shared enrollment forms

**Files:**
- Create: `src/components/personal-data-consent.tsx`
- Modify: `src/components/enrollment-form.tsx`
- Modify: `src/config/site.ts`
- Test: `src/components/enrollment-form.test.tsx`

**Interfaces:**
- Produces: `PersonalDataConsent` with `checked`, `onChange`, `error`, and `tone` props.
- Produces: `EnrollmentFormValues.consent: true`.

- [ ] Add a failing test that submits a valid name and phone without checking consent and expects an accessible error with no `onSubmitted` call.
- [ ] Run `pnpm test src/components/enrollment-form.test.tsx` and confirm the new test fails because no consent field exists.
- [ ] Add a failing success-path expectation that checks the checkbox and expects `consent: true` in the submitted values.
- [ ] Implement the reusable consent component, verified internal routes, validation, focus/error wiring, and normalized payload.
- [ ] Run `pnpm test src/components/enrollment-form.test.tsx` and confirm all tests pass.

### Task 2: Consent behavior in the quiz lead form

**Files:**
- Modify: `src/components/quiz-result.tsx`
- Modify: `src/data/quiz.ts`
- Test: `src/components/program-quiz.test.tsx`

**Interfaces:**
- Consumes: `PersonalDataConsent` from Task 1.
- Produces: `QuizLeadPayload.consent: true`.

- [ ] Add a failing test that reaches the result, fills valid contacts, submits without consent, and expects no `submitLead` call.
- [ ] Update the success-path test to check consent and expect `consent: true` in the payload.
- [ ] Run `pnpm test src/components/program-quiz.test.tsx` and confirm the new consent test fails for the expected reason.
- [ ] Add controlled consent state and accessible validation to `QuizResult` using the dark variant of `PersonalDataConsent`.
- [ ] Run `pnpm test src/components/program-quiz.test.tsx` and confirm all tests pass.

### Task 3: Static legal documents and navigation

**Files:**
- Create: `src/components/legal-document-page.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/consent/page.tsx`
- Create: `src/app/legal-pages.test.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/site-footer.test.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/seo.test.ts`

**Interfaces:**
- Consumes: verified operator data and legal routes from `siteConfig`.
- Produces: statically exportable `/privacy/` and `/consent/` routes with route-level metadata.

- [ ] Add failing legal-page tests for operator name, INN, OGRN, email, consent term, and separate document headings.
- [ ] Change Footer and sitemap expectations to the two internal legal routes and run the focused tests to confirm failure.
- [ ] Implement the shared document shell and both static pages with only known data and no cookie or advertising claims.
- [ ] Update Footer links without changing the unverified license item; add both routes to sitemap.
- [ ] Run the focused legal, Footer, and SEO tests and confirm they pass.

### Task 4: Full verification

**Files:**
- Verify only; no planned production changes.

**Interfaces:**
- Consumes: all deliverables from Tasks 1–3.
- Produces: verification evidence for the final handoff.

- [ ] Run `pnpm test --run` and confirm zero failing tests.
- [ ] Run `pnpm lint` and confirm zero lint errors.
- [ ] Run `pnpm typecheck` and confirm TypeScript exits with code 0.
- [ ] Run `pnpm build` and confirm static export includes `/privacy` and `/consent`.
- [ ] Inspect `git diff --check` and the final scoped diff for whitespace errors and accidental edits.
