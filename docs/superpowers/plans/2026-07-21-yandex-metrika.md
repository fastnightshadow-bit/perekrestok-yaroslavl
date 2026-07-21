# Yandex Metrika Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Подключить счётчик Яндекс.Метрики `110924306` к публичному сайту после согласия на аналитические cookie.

**Architecture:** Существующий клиентский компонент `YandexMetrika` остаётся единственной точкой загрузки тега для всех страниц через корневой `layout.tsx`. Публичный ID поступает из `NEXT_PUBLIC_YANDEX_METRIKA_ID`; компонент загружает тег и вызывает `ym(..., "init", options)` только при `consent === "accepted"`, а при отзыве согласия уничтожает счётчик.

**Tech Stack:** Next.js 15, React 19, TypeScript, Vitest, Testing Library, Netlify.

## Global Constraints

- Счётчик: `110924306`.
- Метрика не загружается до явного согласия на аналитические cookie.
- Включены `ssr`, `webvisor`, `clickmap`, `accurateTrackBounce`, `trackLinks`, `ecommerce: "dataLayer"`, текущие `referrer` и `url`.
- Постоянный `<noscript>`-пиксель не добавляется.
- Новые библиотеки не добавляются.

---

### Task 1: Параметры счётчика и публичная конфигурация

**Files:**
- Modify: `src/components/cookie-consent.test.tsx`
- Modify: `src/components/yandex-metrika.tsx`
- Modify: `.env.example`

**Interfaces:**
- Consumes: `useCookieConsent(): { consent: "accepted" | "necessary" | null; hydrated: boolean; ... }` и `process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID`.
- Produces: тег `#yandex-metrika-script` с URL `https://mc.yandex.ru/metrika/tag.js?id=<counterId>` и вызов `window.ym(counterId, "init", options)`.

- [ ] **Step 1: Написать падающий тест точного URL и параметров**

В тесте `loads Metrika only with an id and analytics consent` после существующей проверки добавить:

```tsx
expect(document.querySelector("#yandex-metrika-script")).toHaveAttribute(
  "src",
  "https://mc.yandex.ru/metrika/tag.js?id=12345678",
);

const ym = (window as Window & {
  ym?: { a?: unknown[][] };
}).ym;

expect(ym?.a).toContainEqual([
  12345678,
  "init",
  {
    accurateTrackBounce: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    ssr: true,
    trackLinks: true,
    url: window.location.href,
    webvisor: true,
  },
]);
```

- [ ] **Step 2: Запустить тест и подтвердить ожидаемое падение**

Run:

```powershell
pnpm test src/components/cookie-consent.test.tsx --run
```

Expected: FAIL, потому что текущий URL не содержит `?id=12345678`, а `webvisor` сейчас равен `false` и остальные параметры отсутствуют.

- [ ] **Step 3: Реализовать минимальное изменение компонента**

В `YandexMetrika` заменить URL тега и объект инициализации:

```tsx
script.src = `https://mc.yandex.ru/metrika/tag.js?id=${encodeURIComponent(counterId)}`;

windowWithYm.ym?.(numericCounterId, "init", {
  accurateTrackBounce: true,
  clickmap: true,
  ecommerce: "dataLayer",
  referrer: document.referrer,
  ssr: true,
  trackLinks: true,
  url: window.location.href,
  webvisor: true,
});
```

В `.env.example` добавить:

```dotenv
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

- [ ] **Step 4: Запустить тест компонента повторно**

Run:

```powershell
pnpm test src/components/cookie-consent.test.tsx --run
```

Expected: все тесты файла PASS.

- [ ] **Step 5: Проверить весь проект**

Run:

```powershell
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
git diff --check
```

Expected: команды завершаются с кодом `0`; весь набор тестов проходит; production-сборка создаётся без ошибок.

- [ ] **Step 6: Зафиксировать изменение**

```powershell
git add .env.example src/components/yandex-metrika.tsx src/components/cookie-consent.test.tsx
git commit -m "Connect Yandex Metrika counter"
```

Expected: создан отдельный commit с кодом и тестом.

---

### Task 2: Netlify и публичная проверка

**Files:**
- No repository file changes.

**Interfaces:**
- Consumes: переменную `NEXT_PUBLIC_YANDEX_METRIKA_ID` и коммит Task 1.
- Produces: опубликованный сайт, который загружает счётчик `110924306` после принятия аналитических cookie.

- [ ] **Step 1: Установить публичную переменную во всех контекстах Netlify**

Run:

```powershell
netlify env:set NEXT_PUBLIC_YANDEX_METRIKA_ID 110924306 --context all
```

Expected: Netlify подтверждает сохранение `NEXT_PUBLIC_YANDEX_METRIKA_ID`; значение не является секретом.

- [ ] **Step 2: Отправить коммиты в GitHub**

```powershell
git push origin main
```

Expected: `main` отправлен в `origin`, Netlify начинает production deploy.

- [ ] **Step 3: Дождаться успешной публикации**

Проверить production deploy проекта `perekrestok-yaroslavl` в Netlify.

Expected: статус deploy `Published` для последнего commit.

- [ ] **Step 4: Проверить отсутствие Метрики до согласия**

Открыть `https://perekrestok-yaroslavl.netlify.app/` в чистом состоянии localStorage.

Expected: cookie-баннер виден, а `document.querySelector("#yandex-metrika-script")` возвращает `null`.

- [ ] **Step 5: Проверить Метрику после согласия**

Нажать «Принять» и проверить DOM.

Expected: `#yandex-metrika-script` имеет `src="https://mc.yandex.ru/metrika/tag.js?id=110924306"`, интерфейс сайта продолжает работать, горизонтальной прокрутки и новых ошибок нет.

- [ ] **Step 6: Проверить итоговое состояние Git**

```powershell
git status --short
git log -2 --oneline
```

Expected: рабочее дерево чистое; последние коммиты содержат спецификацию/план и подключение Метрики.
