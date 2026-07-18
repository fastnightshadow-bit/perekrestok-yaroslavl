# Telegram Leads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect every existing lead form to one secure Next.js API endpoint that delivers validated leads to a private Telegram group.

**Architecture:** The browser sends a typed JSON payload to `POST /api/leads`. Server-only modules validate the payload, format a plain-text message, and call the Telegram Bot API using credentials stored in Vercel environment variables. Enrollment, contact, and quiz forms share one client transport and consistent loading, success, and error states.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Vitest, Testing Library, Vercel serverless runtime, Telegram Bot API.

## Global Constraints

- Telegram is the only lead-delivery channel in version one.
- Do not add a CRM, database, spreadsheet, email delivery, CAPTCHA, Redis, or a new npm dependency.
- Do not expose `TELEGRAM_BOT_TOKEN` or `TELEGRAM_CHAT_ID` to browser code.
- Do not log names, telephone numbers, comments, bot credentials, or complete request bodies.
- Preserve the current visual design, responsive layout, consent links, and shared form structure.
- Success may be shown only after Telegram confirms delivery.
- If Telegram delivery fails, retain the entered values and offer retry plus the school's telephone number.
- Existing dirty worktree changes belong to the user; never discard or overwrite unrelated changes.
- Use TDD for every behavior change: test must fail for the expected reason before production code is edited.

---

## File map

- Create `src/lib/leads/types.ts`: shared lead payload and response types safe for browser imports.
- Create `src/lib/leads/validation.ts`: server-side parsing, normalization, size limits, honeypot, and timing checks.
- Create `src/lib/leads/message.ts`: Telegram plain-text formatting and quiz label mapping.
- Create `src/lib/leads/telegram.ts`: server-only Telegram Bot API transport.
- Create `src/lib/leads/client.ts`: browser transport, UTM collection, and safe API error mapping.
- Create `src/app/api/leads/route.ts`: App Router POST endpoint.
- Create colocated `*.test.ts` files for each non-UI unit and `src/app/api/leads/route.test.ts` for endpoint behavior.
- Modify `src/components/enrollment-form.tsx`: asynchronous submission states and hidden anti-spam fields.
- Modify `src/components/enrollment-provider.tsx`, `src/components/enrollment-trigger.tsx`, and their tests: carry an explicit source from each CTA into the modal.
- Modify existing Hero, Header, pricing, instructors, fleet, timeline, final CTA, and mobile-action callers: supply stable source identifiers.
- Modify `src/components/contact-section.tsx`: remove the local fake-success state and use real delivery.
- Modify `src/lib/quiz.ts`: replace the artificial delay with shared lead submission.
- Modify `src/data/quiz.ts`: align quiz lead payload with the shared API contract.
- Modify `src/components/quiz-result.tsx`: keep values on error and show the telephone fallback.
- Modify existing form and quiz tests to cover loading, success, failure, retry, and duplicate prevention.
- Modify `next.config.ts`: remove static export and GitHub Pages runtime settings.
- Create `src/config/next-config.test.ts`: guard against restoring static export while the API route exists.
- Create `.env.example`: document empty environment-variable names.
- Create `docs/telegram-setup.md`: user-facing BotFather, group, chat-ID, and Vercel setup.
- Verify `.gitignore`: `.env.local` and other secret env files remain ignored.

---

### Task 1: Shared lead contract, validation, and Telegram message

**Files:**
- Create: `src/lib/leads/types.ts`
- Create: `src/lib/leads/validation.ts`
- Create: `src/lib/leads/validation.test.ts`
- Create: `src/lib/leads/message.ts`
- Create: `src/lib/leads/message.test.ts`

**Interfaces:**
- Produces: `LeadInput`, `ValidatedLead`, `LeadApiResponse`, `LeadValidationError`, `parseLeadInput(value, now)`, and `formatTelegramLead(lead, date)`.
- Consumes: existing quiz answer IDs from `src/data/quiz.ts` only as string values; server validation never trusts TypeScript types from the browser.

- [ ] **Step 1: Write failing validation tests**

```ts
import { describe, expect, it } from "vitest";
import { LeadValidationError, parseLeadInput } from "./validation";

const validLead = {
  type: "enrollment",
  name: "  Илья  ",
  phone: "+7 (900) 000-00-00",
  source: "hero",
  consent: true,
  interest: "Категория B — МКПП / АКПП",
  website: "",
  formStartedAt: 1_000,
};

describe("parseLeadInput", () => {
  it("normalizes a valid lead and drops unknown keys", () => {
    expect(parseLeadInput({ ...validLead, secret: "ignored" }, 4_000)).toMatchObject({
      type: "enrollment",
      name: "Илья",
      phone: "+7 (900) 000-00-00",
      source: "hero",
      consent: true,
      interest: "Категория B — МКПП / АКПП",
    });
  });

  it.each([
    [{ ...validLead, consent: false }, "consent"],
    [{ ...validLead, phone: "123" }, "phone"],
    [{ ...validLead, website: "spam" }, "request"],
    [{ ...validLead, formStartedAt: 3_500 }, "request"],
  ])("rejects invalid or automated input", (value, field) => {
    expect(() => parseLeadInput(value, 4_000)).toThrow(LeadValidationError);
    try {
      parseLeadInput(value, 4_000);
    } catch (error) {
      expect((error as LeadValidationError).field).toBe(field);
    }
  });
});
```

- [ ] **Step 2: Run the validation tests and verify RED**

Run: `pnpm vitest run src/lib/leads/validation.test.ts`

Expected: FAIL because `./validation` does not exist.

- [ ] **Step 3: Implement the exact shared contract**

```ts
export type LeadType = "enrollment" | "contact" | "quiz";

export type LeadAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

export type QuizLeadAnswers = {
  goal: "manual" | "automatic" | "undecided";
  schedule: "morning" | "day" | "evening" | "weekends" | "unknown";
  experience: "never" | "little" | "restore" | "exam";
};

export type LeadInput = {
  type: LeadType;
  name: string;
  phone: string;
  source: string;
  consent: true;
  interest?: string;
  comment?: string;
  quizAnswers?: QuizLeadAnswers;
  pageUrl?: string;
  attribution?: LeadAttribution;
  website: string;
  formStartedAt: number;
};

export type ValidatedLead = Omit<LeadInput, "website" | "formStartedAt">;

export type LeadApiResponse =
  | { ok: true }
  | { ok: false; error: "invalid" | "delivery" | "configuration"; message: string; field?: string };
```

Implement `parseLeadInput(value: unknown, now = Date.now()): ValidatedLead` with these exact limits:

```ts
const limits = {
  name: 80,
  phone: 40,
  source: 80,
  interest: 160,
  comment: 1000,
  pageUrl: 500,
  utm: 120,
};

export class LeadValidationError extends Error {
  constructor(public readonly field: string, message: string) {
    super(message);
    this.name = "LeadValidationError";
  }
}
```

Validation must require an object, an allowed `type`, a trimmed name of 2–80 characters, a phone containing 10–15 digits, a non-empty source, `consent === true`, an empty `website`, and `now - formStartedAt >= 1500`. Optional text is trimmed and omitted when empty. Quiz leads require all three allowed quiz answers. Unknown keys are not copied.

- [ ] **Step 4: Run validation tests and verify GREEN**

Run: `pnpm vitest run src/lib/leads/validation.test.ts`

Expected: PASS.

- [ ] **Step 5: Write failing Telegram message tests**

```ts
import { describe, expect, it } from "vitest";
import { formatTelegramLead } from "./message";

describe("formatTelegramLead", () => {
  it("formats enrollment details and omits empty fields", () => {
    const message = formatTelegramLead({
      type: "enrollment",
      name: "Илья",
      phone: "+7 900 000-00-00",
      source: "hero",
      consent: true,
      interest: "Категория B",
    }, new Date("2026-07-18T12:20:00.000Z"));

    expect(message).toContain("🚗 Новая заявка с сайта");
    expect(message).toContain("Имя: Илья");
    expect(message).toContain("Интерес: Категория B");
    expect(message).not.toContain("Комментарий:");
  });

  it("converts quiz answer IDs to readable Russian labels", () => {
    const message = formatTelegramLead({
      type: "quiz",
      name: "Анна",
      phone: "+7 900 000-00-00",
      source: "quiz",
      consent: true,
      quizAnswers: { goal: "automatic", schedule: "evening", experience: "never" },
    }, new Date("2026-07-18T12:20:00.000Z"));

    expect(message).toContain("Коробка: автомат");
    expect(message).toContain("Время занятий: вечером");
    expect(message).toContain("Опыт: никогда не водил");
  });
});
```

- [ ] **Step 6: Run message tests and verify RED**

Run: `pnpm vitest run src/lib/leads/message.test.ts`

Expected: FAIL because `./message` does not exist.

- [ ] **Step 7: Implement `formatTelegramLead`**

Build a string from a line array. Use `Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", dateStyle: "short", timeStyle: "short" })`. Do not use Telegram HTML or Markdown parse mode. Map every quiz answer ID to the exact Russian labels asserted above and append UTM values only when they exist.

- [ ] **Step 8: Run both core test files**

Run: `pnpm vitest run src/lib/leads/validation.test.ts src/lib/leads/message.test.ts`

Expected: both files PASS.

---

### Task 2: Telegram transport and Next.js API route

**Files:**
- Create: `src/lib/leads/telegram.ts`
- Create: `src/lib/leads/telegram.test.ts`
- Create: `src/app/api/leads/route.ts`
- Create: `src/app/api/leads/route.test.ts`

**Interfaces:**
- Consumes: `ValidatedLead`, `LeadApiResponse`, `parseLeadInput`, and `formatTelegramLead` from Task 1.
- Produces: `sendTelegramMessage(text, options?)` and App Router `POST(request)`.

- [ ] **Step 1: Write failing Telegram transport tests**

Test that `sendTelegramMessage("hello", { token: "token", chatId: "-1001", fetchImpl })` posts JSON to `https://api.telegram.org/bottoken/sendMessage` with `{ chat_id: "-1001", text: "hello", disable_web_page_preview: true }`, resolves when `{ ok: true }`, throws `TelegramDeliveryError` when Telegram returns non-2xx or `{ ok: false }`, and aborts after the configured timeout.

- [ ] **Step 2: Run transport tests and verify RED**

Run: `pnpm vitest run src/lib/leads/telegram.test.ts`

Expected: FAIL because `./telegram` does not exist.

- [ ] **Step 3: Implement server-only Telegram transport**

```ts
import "server-only";

export class TelegramConfigurationError extends Error {}
export class TelegramDeliveryError extends Error {}

type TelegramOptions = {
  token?: string;
  chatId?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

export async function sendTelegramMessage(
  text: string,
  options: TelegramOptions = {},
): Promise<void> {
  const token = options.token ?? process.env.TELEGRAM_BOT_TOKEN;
  const chatId = options.chatId ?? process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new TelegramConfigurationError();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 8_000);
  try {
    const response = await (options.fetchImpl ?? fetch)(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
        signal: controller.signal,
        cache: "no-store",
      },
    );
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.ok) throw new TelegramDeliveryError();
  } finally {
    clearTimeout(timeout);
  }
}
```

- [ ] **Step 4: Run transport tests and verify GREEN**

Run: `pnpm vitest run src/lib/leads/telegram.test.ts`

Expected: PASS.

- [ ] **Step 5: Write failing route tests**

Cover exact outcomes:

- valid JSON plus successful Telegram response returns `200 { ok: true }`;
- non-JSON content type returns 415;
- body longer than 8,000 characters returns 413;
- `LeadValidationError` returns 400 with `{ ok: false, error: "invalid", field }`;
- missing env returns 503 with `error: "configuration"`;
- Telegram failure returns 502 with `error: "delivery"`;
- no response contains a bot token or raw Telegram error body.

- [ ] **Step 6: Run route tests and verify RED**

Run: `pnpm vitest run src/app/api/leads/route.test.ts`

Expected: FAIL because the route does not exist.

- [ ] **Step 7: Implement `POST` route**

Read `request.text()` once, enforce the content type and 8,000-character limit, `JSON.parse`, call `parseLeadInput`, format with the current date, and call `sendTelegramMessage`. Return `NextResponse.json<LeadApiResponse>()` with the exact status codes from Step 5. Do not log the body or caught error object.

- [ ] **Step 8: Run route and transport tests**

Run: `pnpm vitest run src/lib/leads/telegram.test.ts src/app/api/leads/route.test.ts`

Expected: both files PASS.

---

### Task 3: Shared browser transport and attribution

**Files:**
- Create: `src/lib/leads/client.ts`
- Create: `src/lib/leads/client.test.ts`

**Interfaces:**
- Consumes: `LeadInput`, `LeadApiResponse`.
- Produces: `submitLead(input, fetchImpl?)`, `collectLeadAttribution(searchParams)`, and `LeadSubmissionError`.

- [ ] **Step 1: Write failing client tests**

Test that `collectLeadAttribution(new URLSearchParams("utm_source=yandex&utm_medium=cpc"))` returns `{ utmSource: "yandex", utmMedium: "cpc" }`; unrelated parameters are ignored. Test that `submitLead` posts JSON to `/api/leads`, resolves only for `response.ok && body.ok`, and throws `LeadSubmissionError` with a safe Russian message for 400, 502, 503, malformed JSON, and network failure.

- [ ] **Step 2: Run client tests and verify RED**

Run: `pnpm vitest run src/lib/leads/client.test.ts`

Expected: FAIL because `./client` does not exist.

- [ ] **Step 3: Implement the client**

```ts
export class LeadSubmissionError extends Error {
  constructor(
    message = "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.",
    public readonly field?: string,
  ) {
    super(message);
    this.name = "LeadSubmissionError";
  }
}

export async function submitLead(
  input: LeadInput,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  const response = await fetchImpl("/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.ok) {
    throw new LeadSubmissionError(result?.message, result?.field);
  }
}
```

`collectLeadAttribution` must read only `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`, trim values, cap each at 120 characters, and omit empty values.

- [ ] **Step 4: Run client tests and verify GREEN**

Run: `pnpm vitest run src/lib/leads/client.test.ts`

Expected: PASS.

---

### Task 4: Real enrollment and contact form submission

**Files:**
- Modify: `src/components/enrollment-form.tsx`
- Modify: `src/components/enrollment-form.test.tsx`
- Modify: `src/components/contact-section.tsx`
- Modify: `src/components/contact-section.test.tsx`
- Modify: `src/components/enrollment-modal.tsx`
- Modify: `src/components/enrollment-provider.tsx`
- Modify: `src/components/enrollment-provider.test.tsx`
- Modify: `src/components/enrollment-trigger.tsx`
- Modify: `src/components/hero.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/pricing-section.tsx`
- Modify: `src/components/instructors-section.tsx`
- Modify: `src/components/fleet-section.tsx`
- Modify: `src/components/learning-timeline.tsx`
- Modify: `src/components/final-cta.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `submitLead`, `collectLeadAttribution`, `LeadInput`.
- Produces: one real shared enrollment form used by the modal and contacts.

- [ ] **Step 1: Extend tests and verify RED**

Add these exact form props for deterministic tests and explicit lead classification:

```ts
type EnrollmentFormProps = {
  // keep the existing layout, ref, display, callback, and label props
  leadType?: Extract<LeadType, "enrollment" | "contact">;
  source?: string;
  submitLeadOverride?: (input: LeadInput) => Promise<void>;
};
```

`leadType` defaults to `"enrollment"`; `source` defaults to `"enrollment-modal"`. Test:

- valid form calls the override with `type`, normalized name and phone, interest/program, comment, consent, source, honeypot, start time, page URL, and UTM values;
- button text becomes `Отправляем...` and is disabled while pending;
- a second submit while pending does not call the override again;
- success shows `Заявка отправлена` through `role="status"`;
- failure preserves field values, shows `role="alert"`, provides the existing `tel:` link, and allows retry;
- contact section passes `type="contact"` and `source="contacts"` and no longer shows the fake local-storage message.

Run: `pnpm vitest run src/components/enrollment-form.test.tsx src/components/contact-section.test.tsx`

Expected: FAIL because current submission is synchronous and contact success is fake.

- [ ] **Step 2: Implement the form state machine**

Add `type SubmissionStatus = "idle" | "submitting" | "success" | "error"`. Capture `formStartedAt` once with `useRef(Date.now())`. Add a hidden, keyboard-inaccessible honeypot input:

```tsx
<div aria-hidden="true" className="absolute -left-[9999px]" inert>
  <label>
    Website
    <input autoComplete="off" name="website" tabIndex={-1} type="text" />
  </label>
</div>
```

Make `handleSubmit` async. After existing phone and consent validation, construct `LeadInput`, call the override or shared `submitLead`, and set success only after resolution. Do not clear fields on error. Disable the submit button during `submitting`. Keep the original `formStartedAt` value across retries.

Render a compact success panel inside the form. On error render the safe message plus an anchor using `contactDetails.phoneHref`. Keep `onSubmitted` as an optional post-success callback so existing modal behavior remains compatible.

- [ ] **Step 3: Remove fake contact state**

Delete `preparedRequest` and its explanatory paragraph from `ContactSection`. Pass `leadType="contact"`, `source="contacts"`, and the existing comment/layout props to `EnrollmentForm`.

- [ ] **Step 4: Propagate exact modal sources**

Change the enrollment context contract to:

```ts
export type EnrollmentContextValue = {
  closeEnrollment: () => void;
  openConsultation: (source?: string) => void;
  openEnrollment: (interest: string, source?: string) => void;
};
```

Store `{ interest, source }` in the provider and pass both values to `EnrollmentModal`, which passes `source` into `EnrollmentForm`. Preserve `"enrollment-modal"` as the fallback.

Use these stable values at existing callers:

- Hero: `hero`;
- desktop and mobile Header: `header`;
- pricing cards and pricing consultation: `pricing`;
- instructor selection: `instructors`;
- fleet and fleet consultation: `fleet`;
- learning timeline CTA: `learning-timeline`;
- final CTA: `final-cta`;
- fixed mobile action bar from `src/app/page.tsx`: `mobile-action-bar`;
- contact form: `contacts`;
- quiz: `quiz`.

Update provider and flow tests to assert that interest and source both reach the form payload.

- [ ] **Step 5: Run form tests and verify GREEN**

Run: `pnpm vitest run src/components/enrollment-form.test.tsx src/components/contact-section.test.tsx src/components/enrollment-modal.test.tsx`

Expected: all files PASS.

---

### Task 5: Real quiz submission

**Files:**
- Modify: `src/data/quiz.ts`
- Modify: `src/lib/quiz.ts`
- Modify: `src/lib/quiz.test.ts`
- Modify: `src/components/quiz-result.tsx`
- Modify: `src/components/program-quiz.test.tsx`

**Interfaces:**
- Consumes: shared `submitLead` from Task 3.
- Produces: `submitQuizLead(payload)` that sends a real `type: "quiz"` lead.

- [ ] **Step 1: Write failing quiz transport and UI tests**

Update the test payload to include `website: ""` and `formStartedAt`. Assert that `submitQuizLead` calls the shared client with:

```ts
{
  type: "quiz",
  name: "Анна",
  phone: "+7 900 000-00-00",
  source: "quiz",
  consent: true,
  interest: "Категория B — АКПП",
  quizAnswers: { goal: "automatic", schedule: "evening", experience: "never" },
  website: "",
  formStartedAt: 1_000,
}
```

UI tests must confirm pending-button disablement, no duplicate call, success only after resolution, preserved values on rejection, retry, and telephone fallback.

Run: `pnpm vitest run src/lib/quiz.test.ts src/components/program-quiz.test.tsx`

Expected: FAIL because `submitQuizLead` still waits locally instead of calling the API.

- [ ] **Step 2: Implement real quiz transport**

Replace the artificial timeout in `src/lib/quiz.ts` with a call to shared `submitLead`. Update `QuizLeadPayload` so the UI supplies the honeypot and start timestamp. Reuse `collectLeadAttribution` and `window.location.href` in the browser.

- [ ] **Step 3: Align quiz UI with shared error behavior**

Keep the existing `idle/loading/success/error` states. Disable the button while loading, ignore repeated submit calls, retain name/phone/answers on error, and render the school's existing telephone link under the error message. Do not change the quiz layout or animations.

- [ ] **Step 4: Run quiz tests and verify GREEN**

Run: `pnpm vitest run src/lib/quiz.test.ts src/components/program-quiz.test.tsx`

Expected: both files PASS.

---

### Task 6: Vercel runtime and secret configuration

**Files:**
- Modify: `next.config.ts`
- Create: `.env.example`
- Verify/modify: `.gitignore`
- Create: `docs/telegram-setup.md`
- Create: `src/config/next-config.test.ts`
- Test: `src/app/api/leads/route.test.ts`

**Interfaces:**
- Consumes: `/api/leads` from Task 2.
- Produces: a Vercel-compatible Next.js build with documented secret setup.

- [ ] **Step 1: Add a failing configuration assertion**

Create `src/config/next-config.test.ts`. Read `next.config.ts` with `readFileSync(resolve(process.cwd(), "next.config.ts"), "utf8")` and assert it does not contain `output: "export"`, `basePath`, or `assetPrefix`. Run `pnpm vitest run src/config/next-config.test.ts` and confirm it fails against the current static-export config.

- [ ] **Step 2: Replace the static configuration**

Use this exact config:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 3: Add safe environment documentation**

Create `.env.example` containing only:

```dotenv
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Confirm `.gitignore` contains `.env*` with an explicit exception for `.env.example`, or equivalent rules that ignore `.env.local` while tracking `.env.example`.

Create `docs/telegram-setup.md` with the six BotFather/group/chat-ID/Vercel steps from the approved design. Explicitly state that tokens must be entered in Vercel settings and never sent in chat or committed.

- [ ] **Step 4: Run config test and production build**

Run: `pnpm vitest run src/config/next-config.test.ts src/app/api/leads/route.test.ts`

Expected: PASS.

Run: `pnpm build`

Expected: successful Next.js build showing `/api/leads` as a dynamic server route and no static-export error.

---

### Task 7: Full regression and deployment readiness

**Files:**
- Review all files changed in Tasks 1–6.
- Do not create production secrets or send a real Telegram request until the private group and bot exist.

**Interfaces:**
- Consumes: the complete feature.
- Produces: verified code ready for Vercel environment variables and one manual end-to-end test.

- [ ] **Step 1: Run the complete automated suite**

Run: `pnpm test -- --run`

Expected: all test files pass with zero failures.

- [ ] **Step 2: Run static verification**

Run: `pnpm typecheck`

Expected: exit code 0.

Run: `pnpm lint`

Expected: exit code 0 with no ESLint errors.

Run: `pnpm build`

Expected: exit code 0 and `/api/leads` present in route output.

- [ ] **Step 3: Verify secrets cannot leak**

Run: `rg -n "TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID" src public .next/static`

Expected: server-only references may exist under `src/app/api` or `src/lib/leads/telegram.ts`; no token values and no references in `.next/static`.

Run: `git status --short --ignored`

Expected: `.env.local` is ignored and `.env.example` is trackable.

- [ ] **Step 4: Manually test without credentials**

Start the normal Next.js dev server. Submit the modal, contact, and quiz forms. Each must retain values, show the safe configuration/delivery error, and offer the telephone link without exposing an internal message.

- [ ] **Step 5: Complete live delivery only after user-controlled setup**

The user creates the private group and bot, then enters `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` directly into Vercel project settings. Redeploy and submit exactly one test lead from the modal, contact form, and quiz. Confirm three structured messages arrive in the private group and no duplicate appears.

- [ ] **Step 6: Final handoff**

Report the changed files, automated verification results, Vercel variables still required, and the legal limitation from the approved design. Do not push to GitHub or deploy unless the user separately asks for those external actions.
