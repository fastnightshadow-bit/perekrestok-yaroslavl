# Final Home Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить FAQ, контакты, финальный CTA и Footer без изменения готовых секций и без создания внутренних страниц.

**Architecture:** Вопросы и контактные данные хранятся отдельно от UI. Общая форма извлекается из модального окна в переиспользуемый компонент с двумя вариантами компоновки. Новые секции подключаются после отзывов и используют существующий callback общей записи.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, Testing Library.

## Global Constraints

- Не изменять внешний вид готовых секций.
- Не создавать внутренние страницы.
- Не добавлять библиотеки.
- Сохранить существующие кнопки, радиусы, тени и адаптив.
- Одновременно открывать только один вопрос FAQ.
- Сохранить работу модальных окон и мобильной нижней панели.

---

### Task 1: FAQ

**Files:**
- Create: `src/data/faq.ts`
- Create: `src/components/faq-section.tsx`
- Test: `src/components/faq-section.test.tsx`

**Interfaces:**
- Produces: `FaqSection(): JSX.Element`
- Produces: `faqItems: FaqItem[]`

- [ ] Написать тест шести вопросов и переключения единственного открытого ответа.
- [ ] Запустить тест и подтвердить падение из-за отсутствующего компонента.
- [ ] Создать типизированные данные и доступный accordion.
- [ ] Запустить тест и подтвердить успешное прохождение.

### Task 2: Shared enrollment form and contacts

**Files:**
- Create: `src/components/enrollment-form.tsx`
- Create: `src/components/map-placeholder.tsx`
- Create: `src/components/contact-section.tsx`
- Create: `src/data/contact.ts`
- Modify: `src/components/enrollment-modal.tsx`
- Test: `src/components/contact-section.test.tsx`
- Test: `src/components/enrollment-modal.test.tsx`

**Interfaces:**
- Produces: `EnrollmentForm`
- Produces: `EnrollmentFormValues`
- Produces: `ContactSection(): JSX.Element`
- Existing `EnrollmentModal` consumes `EnrollmentForm` with stacked layout.

- [ ] Написать тест контактных данных, карты, маршрута и полей формы.
- [ ] Написать тест успешной локальной отправки контактной формы.
- [ ] Запустить тесты и подтвердить ожидаемое падение.
- [ ] Извлечь общую форму без визуального изменения модального окна.
- [ ] Реализовать контактную секцию и карту-заглушку.
- [ ] Запустить контактные и модальные тесты.

### Task 3: Final CTA and Footer

**Files:**
- Create: `src/components/final-cta.tsx`
- Create: `src/components/site-footer.tsx`
- Test: `src/components/final-cta.test.tsx`
- Test: `src/components/site-footer.test.tsx`

**Interfaces:**
- Produces: `FinalCta({ onEnroll }: { onEnroll: () => void })`
- Produces: `SiteFooter(): JSX.Element`

- [ ] Написать тест CTA, телефонной ссылки и колонок Footer.
- [ ] Запустить тесты и подтвердить ожидаемое падение.
- [ ] Реализовать графитовый CTA на существующих кнопках.
- [ ] Реализовать Footer только со ссылками на существующие секции.
- [ ] Запустить тесты новых компонентов.

### Task 4: Page integration

**Files:**
- Modify: `src/components/enrollment-experience.tsx`
- Modify: `src/components/enrollment-experience.test.tsx`

**Interfaces:**
- `FinalCta` consumes `openConsultation`.
- Existing `EnrollmentModal` remains the shared modal flow.

- [ ] Написать интеграционный тест открытия общей формы из финального CTA.
- [ ] Запустить тест и подтвердить ожидаемое падение.
- [ ] Подключить FAQ, контакты, CTA и Footer после отзывов.
- [ ] Запустить интеграционный тест.

### Task 5: Final verification

**Files:**
- Verify: all project files

- [ ] Запустить полный Vitest.
- [ ] Запустить TypeScript.
- [ ] Запустить ESLint.
- [ ] Запустить production build.
- [ ] Проверить отсутствие новых внутренних маршрутов.
- [ ] Проверить адаптивные сетки и safe-area по классам.
