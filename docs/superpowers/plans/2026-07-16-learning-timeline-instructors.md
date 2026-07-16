# Learning Timeline and Instructors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive seven-step learning timeline and an instructor catalog with accessible details and reuse of the existing enrollment modal.

**Architecture:** Typed arrays provide timeline and instructor content. Focused reusable components render stages and instructor cards. `InstructorsSection` owns one details modal, while the existing `EnrollmentExperience` remains the only owner of the enrollment modal and receives instructor selections through a callback.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, existing Button, Framer Motion, Lucide React, Next Image, Vitest, Testing Library.

## Global Constraints

- Do not redesign any approved section.
- Add only timeline and instructors.
- Add no dependencies.
- Keep instructor data explicitly test content.
- Reuse the existing enrollment modal.
- Preserve fixed mobile actions and safe-area clearance.

---

### Task 1: Local instructor image assets

**Files:**
- Create: `public/images/instructors/instructor-01.jpg`
- Create: `public/images/instructors/instructor-02.jpg`
- Create: `public/images/instructors/instructor-03.jpg`
- Create: `public/images/instructors/instructor-04.jpg`

- [ ] **Step 1: Download four distinct free test portraits**

Store four Pexels car/driver portraits locally so the interface does not depend on remote image hosts.

- [ ] **Step 2: Verify files**

Confirm all four files exist and each has a non-zero size.

### Task 2: Learning timeline and CTA

**Files:**
- Create: `src/data/learning-steps.ts`
- Create: `src/components/timeline-step.tsx`
- Create: `src/components/learning-timeline.tsx`
- Test: `src/components/learning-timeline.test.tsx`

**Interfaces:**
- Produces: `LearningStep` and `learningSteps`.
- Produces: `LearningTimeline({ onEnroll })`.

- [ ] **Step 1: Write failing timeline tests**

Assert the heading, seven numbered stage titles, CTA copy, enrollment callback, and `tel:+74852700303`.

- [ ] **Step 2: Run the test**

Run: `node node_modules/vitest/vitest.mjs run src/components/learning-timeline.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement responsive timeline**

Map the data through `TimelineStep`. Use desktop horizontal and mobile vertical connector layouts with viewport-entry motion.

- [ ] **Step 4: Run the test**

Expected: PASS.

### Task 3: Instructor cards and details modal

**Files:**
- Create: `src/data/instructors.ts`
- Create: `src/components/instructor-card.tsx`
- Create: `src/components/instructor-modal.tsx`
- Create: `src/components/instructors-section.tsx`
- Test: `src/components/instructors-section.test.tsx`

**Interfaces:**
- Produces: `Instructor` and `instructors`.
- Produces: `InstructorsSection({ onEnroll })`.
- `onEnroll` receives `Инструктор: <name>`.

- [ ] **Step 1: Write failing instructor tests**

Assert four cards and key facts. Open details, assert large-detail content, close with Escape, reopen, and click the instructor-specific enrollment button.

- [ ] **Step 2: Run the test**

Expected: FAIL because instructor modules do not exist.

- [ ] **Step 3: Implement cards and one accessible modal**

Render local images through `next/image`. Implement backdrop/Escape close, focus restoration, focus trapping, body lock, and selection transfer.

- [ ] **Step 4: Run the test**

Expected: PASS.

### Task 4: Home integration and final verification

**Files:**
- Modify: `src/components/enrollment-experience.tsx`
- Modify: `src/components/program-quiz.tsx`
- Test: `src/components/enrollment-experience.test.tsx`

- [ ] **Step 1: Add failing integration tests**

Assert timeline CTA opens the existing enrollment modal and instructor selection inserts `Инструктор: <name>`.

- [ ] **Step 2: Integrate both sections**

Render `LearningTimeline` then `InstructorsSection` after `ProgramQuiz`. Change quiz bottom safe-area padding to regular spacing and apply final clearance to instructors.

- [ ] **Step 3: Run full verification**

Run the full Vitest suite, TypeScript, ESLint, and production build. All commands must exit with code 0.
