# Benefits, Pricing, and Enrollment Design

## Scope

Extend the existing home page after the approved Header and Hero with exactly two sections:

1. “Почему выбирают Перекрёсток”
2. “Стоимость обучения”

No program, quiz, instructor, fleet, review, FAQ, or contact sections are included.

## Visual direction

The new sections continue the Hero’s warm-white background, graphite typography, restrained yellow accent, wide content container, generous spacing, rounded corners, and subtle shadows. Cards use white surfaces with quiet neutral borders. Yellow appears only in icons, focus states, labels, and primary actions.

The benefits section begins without a hard color break. Four compact cards appear as a four-column row on large screens, a two-column grid on tablet, and a single column on narrow phones.

The pricing section uses three reusable tariff cards. “Категория B — АКПП” is marked as the popular option with a small yellow label and a slightly stronger border, without scaling or aggressive glow.

## Content architecture

Benefit and tariff content live in typed data arrays. Every tariff price is stored with `isTemporaryPrice: true` and displayed with a visible “Временная цена” label so it cannot be mistaken for confirmed business data.

The pricing section ends with a compact consultation panel containing one form trigger and one `tel:` link.

## Enrollment flow

All tariff enrollment buttons call a shared `openEnrollment(program)` function. A single modal receives the selected program and displays it in a read-only field. The consultation buttons use the same modal with “Бесплатная консультация” selected.

The modal:

- has `role="dialog"` and `aria-modal="true"`;
- receives focus when opened and restores focus when closed;
- closes on Escape and backdrop click;
- traps keyboard focus within the dialog;
- locks page scrolling while open;
- includes labeled name, phone, and selected-program fields.

The form is a presentational prototype: submission is prevented locally because no backend or CRM endpoint has been approved.

## Mobile action bar

Below the tablet breakpoint, a fixed bottom bar remains visible with “Позвонить” and “Записаться”. Safe-area padding uses `env(safe-area-inset-bottom)`. The pricing section includes enough bottom padding on mobile so the bar does not cover content.

## Accessibility and responsive behavior

- Interactive elements have visible focus states and accessible names.
- Decorative icons are hidden from assistive technology.
- Cards do not depend on hover to communicate meaning.
- Layouts use wrapping grids and `min-width: 0` behavior to prevent horizontal overflow.
- Reduced-motion preferences are respected by existing global styles and Framer Motion settings.

## Validation

Automated tests cover rendered content, temporary price labels, selected-program propagation, Escape close, backdrop close, focus behavior, body scroll locking, and telephone links. Final verification runs tests, TypeScript, ESLint, and the production build.
