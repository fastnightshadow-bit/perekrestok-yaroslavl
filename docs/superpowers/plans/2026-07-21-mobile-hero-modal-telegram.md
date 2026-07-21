# Mobile Hero, Modal and Telegram Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved mobile-only Hero concept, make the enrollment dialog reliably closable, and restore production Telegram lead delivery.

**Architecture:** Keep one semantic Hero and use responsive order/grid classes so the approved image-first mobile composition becomes the existing two-column desktop composition at `lg`, avoiding duplicate headings and actions. Isolate viewport-dependent action-bar visibility in the client component, while keeping dialog scrolling inside the panel and lead errors in the existing typed client layer.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Netlify Functions.

## Global Constraints

- Do not change the desktop Hero design.
- Do not add libraries or new page sections.
- Do not expose the Telegram bot token in source, logs, command output, or chat.
- Preserve keyboard access, reduced-motion behavior and iPhone safe areas.

---

### Task 1: Mobile Hero and delayed action bar

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/components/hero.test.tsx`
- Modify: `src/components/mobile-action-bar.tsx`
- Create: `src/components/mobile-action-bar.test.tsx`

**Interfaces:**
- Consumes: existing `siteConfig.heroImage`, `schoolFacts`, `EnrollmentTrigger`, and `contactDetails`.
- Produces: one responsive Hero carrying `data-testid="hero-layout"` and separate media/content test IDs; `MobileActionBar` observes `#hero` and renders with `data-visible`.

- [ ] **Step 1: Write failing Hero tests**

Assert that the media precedes the content on mobile using responsive order classes, actions are full-width `Получить консультацию` and `Позвонить`, and the layout restores the existing desktop grid, spans and crop at `lg`.

- [ ] **Step 2: Run the Hero tests and verify RED**

Run: `pnpm test src/components/hero.test.tsx --run`

Expected: failure because the approved mobile presentation and action labels do not exist.

- [ ] **Step 3: Implement the mobile presentation without altering desktop layout**

Reorder the existing media and content responsively in a single semantic branch. Use natural mobile height, a full-width media card and full-width buttons, while preserving the existing `lg` grid, column spans, dimensions and crop.

- [ ] **Step 4: Write and verify the action-bar visibility test**

Stub `IntersectionObserver`, render the bar, and assert `data-visible="false"` while the Hero intersects and `data-visible="true"` after it leaves.

- [ ] **Step 5: Implement the observer and motion-safe transition**

Keep the bar mounted for accessibility and transition it with opacity and translate. Disable pointer events while hidden.

- [ ] **Step 6: Run focused tests**

Run: `pnpm test src/components/hero.test.tsx src/components/mobile-action-bar.test.tsx --run`

Expected: all focused tests pass.

### Task 2: Stable enrollment dialog

**Files:**
- Modify: `src/components/enrollment-modal.tsx`
- Modify: `src/components/enrollment-modal.test.tsx`

**Interfaces:**
- Consumes: existing `EnrollmentForm` and `onClose` contract.
- Produces: a viewport-capped dialog with `data-testid="enrollment-modal-panel"`, sticky header, scrollable body, and initial focus on the close button.

- [ ] **Step 1: Replace the old autofocus expectation with failing stability tests**

Assert that the close button receives focus, the panel has a capped viewport height and overflow hidden, and a dedicated body has vertical scrolling.

- [ ] **Step 2: Run the modal test and verify RED**

Run: `pnpm test src/components/enrollment-modal.test.tsx --run`

Expected: failure because the name field currently receives focus and the backdrop scrolls.

- [ ] **Step 3: Implement fixed dialog chrome and inner scrolling**

Focus the close button on open, keep the backdrop non-scrolling, constrain the panel with `max-h`, and move the form into an `overflow-y-auto` body with safe-area bottom padding.

- [ ] **Step 4: Run modal and flow tests**

Run: `pnpm test src/components/enrollment-modal.test.tsx src/components/enrollment-flow.test.tsx --run`

Expected: both suites pass.

### Task 3: Safe actionable form errors

**Files:**
- Modify: `src/components/enrollment-form.tsx`
- Modify: `src/components/enrollment-form.test.tsx`

**Interfaces:**
- Consumes: `LeadSubmissionError` from `src/lib/leads/client.ts`.
- Produces: a safe user-facing `submissionError` string that preserves server guidance and falls back to the current phone message.

- [ ] **Step 1: Write a failing error-message test**

Reject the override with `new LeadSubmissionError("Сервис временно недоступен")` and assert that exact safe message is rendered while the typed values remain.

- [ ] **Step 2: Run the form test and verify RED**

Run: `pnpm test src/components/enrollment-form.test.tsx --run`

Expected: failure because the component currently discards the typed error.

- [ ] **Step 3: Implement minimal typed error handling**

Store the `LeadSubmissionError.message` and render it above the existing phone fallback; use the generic fallback for unknown errors.

- [ ] **Step 4: Run the form and lead-client tests**

Run: `pnpm test src/components/enrollment-form.test.tsx src/lib/leads/client.test.ts --run`

Expected: all tests pass.

### Task 4: Production secret, deployment and verification

**Files:**
- No repository secret files.
- Verify: Netlify environment and production deploy.

**Interfaces:**
- Consumes: clipboard token, existing Netlify project link, existing `TELEGRAM_CHAT_ID`.
- Produces: protected `TELEGRAM_BOT_TOKEN` in Netlify and a working `/api/leads` production endpoint.

- [ ] **Step 1: Run full local verification**

Run: `pnpm lint`, `pnpm typecheck`, `pnpm test --run`, and `pnpm build`.

Expected: all commands exit 0.

- [ ] **Step 2: Set the secret without echoing it**

Read `Get-Clipboard` into a PowerShell variable, pass it to Netlify CLI as `TELEGRAM_BOT_TOKEN`, clear the variable and clipboard, and do not print command internals.

- [ ] **Step 3: Commit and push the verified source changes**

Commit only the intended code, tests and documentation, then push `main` so the connected Netlify project deploys.

- [ ] **Step 4: Verify production**

Wait for the deploy, inspect the public mobile Hero and dialog, POST an explicitly labeled test lead to `/api/leads`, and confirm an HTTP success response.

- [ ] **Step 5: Report result**

Provide the public URL, summarize changes, explain how to test on a phone, and identify any remaining external confirmation (Telegram message receipt) if it cannot be observed automatically.
