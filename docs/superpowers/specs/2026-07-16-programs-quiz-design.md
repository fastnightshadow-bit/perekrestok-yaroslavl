# Programs and Quiz Design

## Scope

Add exactly two home-page sections after the approved pricing section:

1. “Выберите программу обучения”
2. A three-step program-selection quiz

The Header, Hero, benefits cards, pricing cards, shared enrollment modal, and fixed mobile action bar keep their existing design and behavior. No sections for the learning process, instructors, fleet, reviews, FAQ, or contacts are added.

## Program section

The section continues the warm-white page background and the existing `1440px` container, spacing, graphite typography, yellow accents, and rounded cards.

Four large program cards appear in a two-column desktop grid and a single-column mobile layout:

- Категория A / A1
- Категория B — МКПП
- Категория B — АКПП
- Дополнительные занятия

Each card uses a different code-native illustration built from restrained shapes and Lucide line icons. This avoids repeated stock photography and keeps the visuals fast and consistent with the site.

Program content is stored in a typed array. Durations use explicit temporary values and a visible “Временные данные” label. “Посмотреть программу” links to a working dynamic placeholder route under `/programs/[slug]`. “Записаться” calls the existing shared enrollment modal with the program name. A single “Все программы” link points to `/programs`; the index page intentionally remains unimplemented.

## Quiz section

The quiz sits immediately after the programs on a graphite background with yellow as the only strong accent. The content is inside one large rounded panel, visually distinct from the light sections without aggressive gradients.

Three typed questions are stored in data:

1. Vehicle choice
2. Preferred schedule
3. Experience

Each step is a fieldset with large radio-card labels. A selected option receives a yellow border, yellow-tinted surface, and clear radio indicator. “Продолжить” is disabled until the current answer exists. “Назад” preserves prior answers.

A progress label and bar show the current step. Framer Motion provides short opacity and horizontal-position transitions while respecting the site’s reduced-motion behavior.

## Recommendation and form

The recommendation function prioritizes:

- motorcycle → A / A1;
- automatic → B — АКПП;
- manual → B — МКПП;
- restoring skills or exam preparation → Дополнительные занятия;
- undecided → B — МКПП as a flexible consultation starting point.

The final screen shows a short personalized explanation, recommended program, name field, telephone field, and “Получить консультацию”.

Telephone validation accepts 10 or 11 digits after formatting characters are removed. Submission produces a typed `QuizLeadPayload` containing contact details, recommendation, and all answers. The current submit adapter simulates a future server request without page reload. Loading, success, and error states are explicit.

## Accessibility and responsive behavior

- Questions use `fieldset`, `legend`, and native radio inputs.
- Error text is connected with `aria-describedby`.
- Loading status uses `aria-live`.
- Buttons have visible focus states inherited from the existing system.
- The quiz and program grids use `min-width: 0` and responsive columns.
- Final mobile spacing accounts for the fixed action bar and iPhone safe area.

## Validation

Tests cover program content and links, enrollment selection, answer gating, answer persistence, recommendation, telephone validation, successful submission, and failed submission. Final checks run the full test suite, TypeScript, ESLint, and a Next.js production build.
