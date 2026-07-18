# Cookies, Map, Learning Flow, and Category B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing one-page site into a verified category B conversion flow, add an interactive Yandex map, expand the learning journey, and prepare consent-controlled Yandex Metrika support.

**Architecture:** Keep the existing enrollment provider and visual system. Replace duplicated pricing/program data with one typed category B offering source, keep the quiz as a consultation funnel, isolate cookie state in a provider, and load optional analytics only after consent. The Yandex map remains a functional embedded service independent of analytics consent.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Lucide React, Vitest, Testing Library.

## Global Constraints

- Do not add libraries.
- Preserve the existing design system, shared enrollment modal, mobile action bar, safe-area spacing, and one-page navigation.
- Display the official price as 53 800 ₽, theory as 12 000 ₽, practice course as 41 800 ₽, and 57 practice hours.
- State that internal and GAI exams are paid separately and current conditions must be confirmed with the school.
- Keep only category B with MKPP and AKPP choices; remove A/A1, motorcycle, unverified additional lessons, “Все программы”, and “Посмотреть программу”.
- Do not load Yandex Metrika unless both `NEXT_PUBLIC_YANDEX_METRIKA_ID` and analytics consent exist.
- The interactive Yandex map must remain directly visible and usable regardless of analytics consent.
- All new dialogs and controls must work with keyboard navigation and visible focus.

---

### Task 1: Unify Category B Pricing and Program UI

**Files:**
- Modify: `src/data/home-content.ts`
- Modify: `src/components/pricing-card.tsx`
- Modify: `src/components/pricing-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/home-sections.test.tsx`
- Delete after references are removed: `src/components/programs-section.tsx`, `src/components/program-card.tsx`, `src/components/program-visual.tsx`

**Interfaces:**
- Produces: `TrainingOption` with `id: "manual" | "automatic"`, `name`, `description`, `price`, `included`, and `installment`.
- Consumes: `useEnrollment().openEnrollment(program: string)`.

- [ ] **Step 1: Write failing integration assertions**

Add assertions to `home-sections.test.tsx` that the home page contains “Категория B — МКПП”, “Категория B — АКПП”, “53 800 ₽”, “Узнать стоимость и свободные места”, and does not contain “Все программы” or “Посмотреть программу”.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `pnpm test -- src/components/home-sections.test.tsx`

Expected: FAIL because the current page renders separate pricing and programs sections.

- [ ] **Step 3: Replace tariffs with two verified training options**

Use this data shape in `home-content.ts`:

```ts
export type TrainingOption = {
  id: "manual" | "automatic";
  name: string;
  description: string;
  price: string;
  included: string[];
  installment: string;
};

export const trainingOptions: TrainingOption[] = [
  {
    id: "manual",
    name: "Категория B — МКПП",
    description: "Полный курс обучения вождению на автомобиле с механической коробкой передач.",
    price: "53 800 ₽",
    included: ["Теория — 12 000 ₽", "Практика — 41 800 ₽", "57 часов практического вождения"],
    installment: "Доступна рассрочка — условия уточнит администратор.",
  },
  {
    id: "automatic",
    name: "Категория B — АКПП",
    description: "Полный курс обучения вождению на автомобиле с автоматической коробкой передач.",
    price: "53 800 ₽",
    included: ["Теория — 12 000 ₽", "Практика — 41 800 ₽", "57 часов практического вождения"],
    installment: "Доступна рассрочка — условия уточнит администратор.",
  },
];
```

- [ ] **Step 4: Convert pricing components into the single category B section**

Update `PricingCard` to accept `TrainingOption`, remove the popular badge and self-referencing program link, and make the primary button call:

```tsx
<Button className="w-full" onClick={() => onEnroll(option.name)}>
  Узнать стоимость и свободные места
</Button>
```

Render two cards in `PricingSection`. Add visible copy that internal and GAI exams are paid separately and “Актуальную стоимость и условия уточняйте у автошколы”. Keep `id="pricing"` and add `id="programs"` to a nested anchor target so old navigation still reaches the unified section.

- [ ] **Step 5: Remove the duplicate section from the home page**

Remove the `ProgramsSection` import and `<ProgramsSection />` from `src/app/page.tsx`. Remove the obsolete program card components only after `rg "ProgramsSection|ProgramCard|ProgramVisual" src` reports no remaining runtime imports.

- [ ] **Step 6: Run focused tests**

Run: `pnpm test -- src/components/home-sections.test.tsx src/components/enrollment-flow.test.tsx`

Expected: PASS.

---

### Task 2: Refocus the Quiz on MKPP and AKPP

**Files:**
- Modify: `src/data/quiz.ts`
- Modify: `src/lib/quiz.ts`
- Modify: `src/lib/quiz.test.ts`
- Modify: `src/components/program-quiz.test.tsx`
- Modify: `src/components/quiz-result.tsx`
- Delete after references are removed: `src/data/programs.ts`, `src/app/programs/[slug]/page.tsx`
- Modify: `src/app/seo.test.ts`

**Interfaces:**
- Produces: `GoalAnswerId = "manual" | "automatic" | "undecided"`.
- Produces: `getQuizRecommendation(answers): { name: string; description: string }`.

- [ ] **Step 1: Update quiz tests first**

Replace the first-step test options with “Автомобиль на механике”, “Автомобиль на автомате”, and “Пока не решил”. Assert that the automatic choice recommends “Категория B — АКПП” and that no motorcycle option exists.

- [ ] **Step 2: Run quiz tests and confirm failure**

Run: `pnpm test -- src/lib/quiz.test.ts src/components/program-quiz.test.tsx`

Expected: FAIL because current goal IDs and recommendation logic describe course fragments.

- [ ] **Step 3: Replace goal types and options**

Use:

```ts
export type GoalAnswerId = "manual" | "automatic" | "undecided";
```

and first-step options:

```ts
[
  { id: "manual", label: "Автомобиль на механике" },
  { id: "automatic", label: "Автомобиль на автомате" },
  { id: "undecided", label: "Пока не решил" },
]
```

- [ ] **Step 4: Make recommendations independent of program pages**

Return a small typed result directly from `src/lib/quiz.ts`:

```ts
export type QuizRecommendation = { name: string; description: string };

export function getQuizRecommendation(answers: QuizAnswers): QuizRecommendation {
  if (answers.goal === "automatic") {
    return { name: "Категория B — АКПП", description: "Комфортное обучение без переключения передач." };
  }
  if (answers.goal === "manual") {
    return { name: "Категория B — МКПП", description: "Универсальный вариант обучения категории B." };
  }
  return { name: "Категория B", description: "Администратор поможет выбрать подходящую коробку передач." };
}
```

Update `QuizResult` to consume this shape and keep the existing lead payload and success/error states.

- [ ] **Step 5: Remove obsolete routes and SEO expectations**

Remove program-route imports and metadata tests from `src/app/seo.test.ts`. Delete `src/app/programs/[slug]/page.tsx` and `src/data/programs.ts` after `rg "@/data/programs|/programs/" src` shows only files scheduled for deletion.

- [ ] **Step 6: Run quiz and SEO tests**

Run: `pnpm test -- src/lib/quiz.test.ts src/components/program-quiz.test.tsx src/app/seo.test.ts`

Expected: PASS.

---

### Task 3: Expand the Learning Journey

**Files:**
- Modify: `src/data/learning-steps.ts`
- Modify: `src/components/learning-timeline.tsx`
- Modify: `src/components/timeline-step.tsx`
- Modify: `src/components/learning-timeline.test.tsx`

**Interfaces:**
- Extends: `LearningStep` with optional `details?: string[]`.

- [ ] **Step 1: Add failing content and layout tests**

Assert seven numbered stages, including “Пройди медкомиссию”, “Учи теорию очно или онлайн”, “Сдай экзамен в ГАИ”, and the four doctor labels. Assert the list uses a two-column desktop class rather than `lg:grid-cols-7`.

- [ ] **Step 2: Run the timeline test and confirm failure**

Run: `pnpm test -- src/components/learning-timeline.test.tsx`

Expected: FAIL on the new copy and layout.

- [ ] **Step 3: Replace the seven step records**

Use the approved order: application, medical commission, theory, practice, internal exam, GAI exam, license. Set `details` for the medical step to `["Психиатр", "Психиатр-нарколог", "Офтальмолог", "Терапевт"]`. Adapt the supplied copy into concise original wording without Greenlight branding.

- [ ] **Step 4: Update the timeline composition**

Use a vertical mobile flow and `lg:grid-cols-2` desktop flow. Render `details` as a compact accessible list. Keep the current sequential CSS delay and reduce any transition to the shared gentle motion duration.

- [ ] **Step 5: Run the timeline test**

Run: `pnpm test -- src/components/learning-timeline.test.tsx`

Expected: PASS.

---

### Task 4: Replace the Contact Placeholder with Yandex Maps

**Files:**
- Create: `src/components/yandex-map.tsx`
- Modify: `src/components/contact-section.tsx`
- Modify: `src/components/contact-section.test.tsx`
- Delete: `src/components/map-placeholder.tsx`
- Modify: `src/config/site.ts`

**Interfaces:**
- Produces: `siteConfig.contact.mapEmbedUrl`.
- Produces: `<YandexMap />` with an iframe and fallback route link.

- [ ] **Step 1: Write the failing map test**

Assert an iframe named “Интерактивная карта автошколы «Перекрёсток»” exists, has `loading="lazy"`, and its `src` contains `oid=1387073255`.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `pnpm test -- src/components/contact-section.test.tsx`

Expected: FAIL because the current map is decorative.

- [ ] **Step 3: Add the verified embed URL**

Add to `siteConfig.contact`:

```ts
mapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=39.883644%2C57.639569&z=17&oid=1387073255",
```

- [ ] **Step 4: Implement the map component**

Render an iframe inside the existing rounded container:

```tsx
<iframe
  className="absolute inset-0 h-full w-full border-0"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  src={siteConfig.contact.mapEmbedUrl}
  title="Интерактивная карта автошколы «Перекрёсток»"
/>
```

Keep an external “Открыть в Яндекс Картах” link available over or below the map without blocking panning.

- [ ] **Step 5: Replace the placeholder and run tests**

Run: `pnpm test -- src/components/contact-section.test.tsx`

Expected: PASS.

---

### Task 5: Add Cookie Preferences and Conditional Metrika

**Files:**
- Create: `src/components/cookie-consent-provider.tsx`
- Create: `src/components/cookie-banner.tsx`
- Create: `src/components/cookie-settings-dialog.tsx`
- Create: `src/components/yandex-metrika.tsx`
- Create: `src/components/cookie-consent.test.tsx`
- Create: `src/app/cookies/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/config/site.ts`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/site-footer.test.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/seo.test.ts`

**Interfaces:**
- Produces: `CookieConsent = "accepted" | "necessary" | null`.
- Produces: `useCookieConsent(): { consent; acceptAll; acceptNecessary; openSettings; closeSettings; settingsOpen }`.

- [ ] **Step 1: Write provider and banner tests**

Test initial visibility, “Принять”, “Только необходимые”, settings reopening, localStorage persistence under `perekrestok-cookie-consent-v1`, Escape closing, and the absence of a Metrika script without consent or without an ID.

- [ ] **Step 2: Run the cookie test and confirm failure**

Run: `pnpm test -- src/components/cookie-consent.test.tsx`

Expected: FAIL because components do not exist.

- [ ] **Step 3: Implement typed consent state**

Create the provider with this storage contract:

```ts
export type CookieConsent = "accepted" | "necessary" | null;
export const COOKIE_CONSENT_KEY = "perekrestok-cookie-consent-v1";
```

Read localStorage after mount, save explicit choices, and expose settings state through context. Do not block scroll or focus for the banner.

- [ ] **Step 4: Implement compact accessible controls**

The banner uses three controls: “Принять”, “Только необходимые”, “Настроить”. The settings dialog has a fixed necessary row, an analytics switch, “Сохранить выбор”, Escape close, click-outside close, focus restoration, and `role="dialog"` with an accessible title.

- [ ] **Step 5: Implement conditional Metrika loading**

Read `process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID`. Return `null` unless it is truthy and consent is `"accepted"`. Load the official `https://mc.yandex.ru/metrika/tag.js` script only then. Configure click map and accurate bounce tracking, but leave Webvisor and form-content transmission disabled.

- [ ] **Step 6: Add the cookie policy page and navigation**

Add `siteConfig.legal.cookies = publicPath("/cookies")`. Create `/cookies` using `LegalDocumentPage` and cover local storage, Yandex Maps, optional Metrika, preference changes, retention references, and operator contacts. Add the footer link and sitemap entry.

- [ ] **Step 7: Mount consent once at the root**

Wrap the body content with `CookieConsentProvider` and render `CookieBanner`, `CookieSettingsDialog`, and `YandexMetrika` once in `src/app/layout.tsx`.

- [ ] **Step 8: Run cookie, footer, legal, and SEO tests**

Run: `pnpm test -- src/components/cookie-consent.test.tsx src/components/site-footer.test.tsx src/app/legal-pages.test.tsx src/app/seo.test.ts`

Expected: PASS.

---

### Task 6: Final Integration and Responsive Verification

**Files:**
- Modify only files revealed by test, type, lint, or visual failures.

**Interfaces:**
- Consumes all prior task outputs.

- [ ] **Step 1: Run the full automated suite**

Run: `pnpm test -- --run`

Expected: all tests PASS.

- [ ] **Step 2: Run static verification**

Run: `pnpm typecheck`

Expected: exit code 0.

Run: `pnpm lint`

Expected: exit code 0.

Run: `pnpm build`

Expected: production build succeeds.

- [ ] **Step 3: Check for dead routes and copy**

Run: `rg -n "Все программы|Посмотреть программу|A1|Мотоцикл|additional-lesson|/programs" src`

Expected: no user-facing obsolete program copy or links.

- [ ] **Step 4: Perform browser verification**

Check widths 320, 375, 390, 414, 768, 1024, and desktop. Verify: no horizontal scroll; the cookie bar does not block the mobile action panel; MKPP/AKPP CTAs prefill the shared form; quiz back/progress/success/error states work; map pans and zooms; timeline remains readable; keyboard focus is visible; dialogs close with Escape.

- [ ] **Step 5: Review the final diff without overwriting unrelated work**

Run: `git status --short` and `git diff --check`.

Expected: no whitespace errors; all pre-existing unrelated image and legal changes remain preserved.
