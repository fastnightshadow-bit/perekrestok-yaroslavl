# Programs and Quiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive program catalog and a three-step accessible quiz that recommends a program and prepares a typed consultation lead.

**Architecture:** Typed data modules define program cards, quiz questions, answers, recommendations, and lead payloads. Focused components render program visuals, program cards, quiz options, quiz steps, and the final result. The existing `EnrollmentExperience` remains the single owner of the shared enrollment modal and passes its existing callback into the new program section.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, existing shadcn-style Button, Framer Motion, Lucide React, Vitest, Testing Library.

## Global Constraints

- Do not redesign Header, Hero, benefits, pricing, modal, or mobile action bar.
- Add only the program section and quiz.
- Add no new dependencies.
- Keep all durations explicitly temporary.
- Keep the `/programs` index page unimplemented.
- Prevent horizontal overflow and preserve fixed mobile actions.

---

### Task 1: Program data, cards, and enrollment behavior

**Files:**
- Create: `src/data/programs.ts`
- Create: `src/components/program-visual.tsx`
- Create: `src/components/program-card.tsx`
- Create: `src/components/programs-section.tsx`
- Test: `src/components/programs-section.test.tsx`

**Interfaces:**
- Produces: `Program`, `programs`, and `getProgramBySlug(slug)`.
- Produces: `ProgramsSection({ onEnroll })`.

- [ ] **Step 1: Write failing rendering and interaction tests**

Assert the four program headings, four temporary-duration labels, individual `/programs/<slug>` links, `/programs` all-programs link, and selected program passed to `onEnroll`.

- [ ] **Step 2: Run the test and verify the missing-module failure**

Run: `node node_modules/vitest/vitest.mjs run src/components/programs-section.test.tsx`

Expected: FAIL because `ProgramsSection` does not exist.

- [ ] **Step 3: Implement typed data and reusable cards**

Create four typed program records and render them through `ProgramCard`. Render distinct code-native visuals through `ProgramVisual`, using each record’s `visual` discriminator.

- [ ] **Step 4: Run the program section test**

Run: `node node_modules/vitest/vitest.mjs run src/components/programs-section.test.tsx`

Expected: PASS.

### Task 2: Dynamic placeholder routes

**Files:**
- Create: `src/app/programs/[slug]/page.tsx`

**Interfaces:**
- Consumes: `programs` and `getProgramBySlug`.
- Produces: static routes for `a-a1`, `category-b-manual`, `category-b-automatic`, and `additional-lessons`.

- [ ] **Step 1: Implement route generation and not-found handling**

Use `generateStaticParams()` from the program array. Render a small placeholder page containing the program name, temporary duration, format, and a link back to `/#programs`. Call `notFound()` for unknown slugs.

- [ ] **Step 2: Verify routes through the production build**

Run: `node node_modules/next/dist/bin/next build`

Expected: four static program routes appear and `/programs` remains absent.

### Task 3: Quiz data and recommendation logic

**Files:**
- Create: `src/data/quiz.ts`
- Create: `src/lib/quiz.ts`
- Test: `src/lib/quiz.test.ts`

**Interfaces:**
- Produces: `QuizQuestionId`, `QuizAnswerId`, `QuizAnswers`, `QuizLeadPayload`, `quizQuestions`.
- Produces: `getQuizRecommendation(answers)` and `isValidPhone(phone)`.

- [ ] **Step 1: Write failing pure-function tests**

Test motorcycle, automatic, manual, and skill-restoration recommendations. Test valid formatted Russian telephone input and invalid short input.

- [ ] **Step 2: Run the pure-function tests**

Run: `node node_modules/vitest/vitest.mjs run src/lib/quiz.test.ts`

Expected: FAIL because the quiz modules do not exist.

- [ ] **Step 3: Implement minimal typed logic**

Map answers to existing program records and validate telephone values by keeping digits and accepting lengths 10 or 11.

- [ ] **Step 4: Run the pure-function tests**

Run: `node node_modules/vitest/vitest.mjs run src/lib/quiz.test.ts`

Expected: PASS.

### Task 4: Interactive quiz components

**Files:**
- Create: `src/components/quiz-option.tsx`
- Create: `src/components/quiz-step.tsx`
- Create: `src/components/quiz-result.tsx`
- Create: `src/components/program-quiz.tsx`
- Test: `src/components/program-quiz.test.tsx`

**Interfaces:**
- Produces: `SubmitQuizLead = (payload: QuizLeadPayload) => Promise<void>`.
- Produces: `ProgramQuiz({ submitLead? })`.

- [ ] **Step 1: Write failing quiz behavior tests**

Verify disabled continuation without an answer, step progress, back navigation with preserved selection, recommendation after three answers, invalid telephone feedback, successful submission, and rejected submission.

- [ ] **Step 2: Run the quiz component test**

Run: `node node_modules/vitest/vitest.mjs run src/components/program-quiz.test.tsx`

Expected: FAIL because `ProgramQuiz` does not exist.

- [ ] **Step 3: Implement quiz state and focused components**

Store typed answers in `ProgramQuiz`. Render native radio options through `QuizOption`, navigation through `QuizStep`, and the result form through `QuizResult`. Use an injectable async submit function, defaulting to a short simulated request.

- [ ] **Step 4: Run the quiz component test**

Run: `node node_modules/vitest/vitest.mjs run src/components/program-quiz.test.tsx`

Expected: PASS.

### Task 5: Home-page integration and final spacing

**Files:**
- Modify: `src/components/enrollment-experience.tsx`
- Modify: `src/components/pricing-section.tsx`

**Interfaces:**
- Appends `ProgramsSection` and `ProgramQuiz` after pricing.
- Reuses `openEnrollment(program)` without creating another modal.

- [ ] **Step 1: Write a failing integration assertion**

Extend `enrollment-experience.test.tsx` to click a program card’s “Записаться” button and assert the existing dialog receives that program.

- [ ] **Step 2: Run the integration test**

Run: `node node_modules/vitest/vitest.mjs run src/components/enrollment-experience.test.tsx`

Expected: FAIL because the program section is not integrated.

- [ ] **Step 3: Integrate both sections**

Render `ProgramsSection` and `ProgramQuiz` after `PricingSection`. Change pricing’s final mobile safe-area padding to regular section spacing, and move safe-area clearance to the quiz because it is now the last section.

- [ ] **Step 4: Run all verification commands**

Run the full Vitest suite, TypeScript, ESLint, and Next.js production build. All commands must exit with code 0.
