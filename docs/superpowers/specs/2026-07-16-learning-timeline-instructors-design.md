# Learning Timeline and Instructors Design

## Scope

Add exactly two sections after the approved quiz:

1. “Как проходит обучение”
2. “Наши инструкторы”

The Header, Hero, benefits, pricing, programs, quiz, shared enrollment modal, and fixed mobile action bar keep their current structure and styling. No fleet, reviews, FAQ, or contacts are added.

## Learning timeline

The section returns to the warm-white background and existing `1440px` content container. A short heading introduces a seven-stage path:

1. Оставляете заявку
2. Консультация
3. Заключение договора
4. Изучение теории
5. Практические занятия
6. Экзамен
7. Получение водительского удостоверения

On desktop, stages share one horizontal line and equal-width columns. The connector sits behind numbered yellow nodes to communicate forward movement without decorative clutter. On mobile, the same data renders as a vertical timeline with the line at the left.

Each stage includes a Lucide line icon, two-digit number, short title, and a description no longer than two short lines. Framer Motion introduces stages with a small opacity and position change when they enter the viewport.

The timeline ends with a graphite CTA panel. “Записаться” opens the existing shared enrollment modal with “Запись на обучение” selected. “Позвонить” uses the existing telephone URI.

## Instructors section

Four test instructor records are stored in a typed array. Each record includes a local image, name, experience, vehicle, categories, rating, short description, extended experience, and three concise advantages.

Cards use real test photographs, a 4:5 image area, white surface, restrained border, and existing radii and shadows. Desktop uses four columns where space permits, tablet uses two, and mobile uses one. Hover slightly scales the image/card and reveals a stronger “Подробнее” action without hiding essential information from touch users.

Clicking “Подробнее” opens one shared instructor-details modal. The modal has a large photograph, facts, experience text, advantages, Escape/backdrop close, focus management, focus trapping, and body scroll locking.

“Записаться именно к этому инструктору” closes the details modal and opens the existing enrollment modal with `Инструктор: <name>` as the selected program value.

## Responsive integration

The quiz is no longer the final section, so its mobile safe-area bottom clearance becomes regular section spacing. The instructors section receives final safe-area clearance for the fixed mobile action bar. Existing global horizontal-overflow protection remains unchanged.

## Validation

Tests cover all seven timeline stages, CTA behavior, all instructor records, details modal opening/closing, instructor data, and transfer of the selected instructor into the existing enrollment form. Final verification runs all tests, TypeScript, ESLint, and the Next.js production build.
