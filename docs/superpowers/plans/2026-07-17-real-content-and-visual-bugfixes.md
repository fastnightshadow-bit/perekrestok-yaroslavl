# План внедрения реальных данных и исправления визуальных ошибок

> **Для Codex:** выполнять задачи последовательно. Каждый функциональный шаг начинать с теста, подтверждать его падение, затем вносить минимальное исправление и снова запускать тест.

**Цель:** заменить все демонстрационные сведения на подтверждённые данные автошколы «Перекрёсток», исправить модальное окно и адаптивные карточки, а также привести анимации к единому спокойному темпу.

**Архитектура:** факты автошколы хранятся в одном типизированном модуле и используются Hero, тарифами, программами и отзывами. Компоненты продолжают получать данные из массивов. Модальное окно инструктора выводится через портал в `document.body`, чтобы CSS-изоляция секции не влияла на `position: fixed`. Система движения задаётся общими CSS-классами, без новой библиотеки.

**Стек:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Next Image.

**Утверждённая спецификация:** `docs/superpowers/specs/2026-07-17-real-content-and-visual-bugfixes-design.md`.

---

## Задача 1. Зафиксировать реальные факты одним источником

**Файлы:**

- создать: `src/data/school-facts.ts`;
- создать: `src/data/real-content.test.ts`;
- изменить: `src/data/home-content.ts`;
- изменить: `src/components/hero.tsx`;
- изменить: `src/components/home-sections.test.tsx`;
- изменить: `src/components/hero.test.tsx`.

### Шаг 1. Написать падающие проверки

В `src/data/real-content.test.ts` проверить:

- полный курс — `53 800 ₽`;
- теория — `12 000 ₽`;
- практика — `41 800 ₽` и 57 часов;
- отдельное занятие — `1 100 ₽` за 1,5 часа;
- более 85% учеников сдают с первого раза;
- в тарифах отсутствуют `XX XXX`, `МКПП`, `АКПП` и временные цены;
- присутствуют три утверждённых тарифа.

В `hero.test.tsx` заменить ожидания временной цены и рейтинга на `53 800 ₽` и показатель `Более 85%`.

### Шаг 2. Запустить тесты и подтвердить красный результат

```powershell
pnpm test --run src/data/real-content.test.ts src/components/hero.test.tsx src/components/home-sections.test.tsx
```

Ожидаемый результат: тесты падают из-за отсутствия `school-facts.ts` и старого демонстрационного контента.

### Шаг 3. Добавить единый модуль фактов

В `school-facts.ts` экспортировать неизменяемый объект:

```ts
export const schoolFacts = {
  fullCoursePrice: "53 800 ₽",
  theoryPrice: "12 000 ₽",
  practiceCoursePrice: "41 800 ₽",
  practiceHours: 57,
  singleLessonPrice: "1 100 ₽",
  singleLessonDuration: "1,5 часа",
  firstTryPassRate: "Более 85%",
  separateExamPayment: true,
} as const;
```

### Шаг 4. Обновить Hero, преимущества и тарифы

- Импортировать `schoolFacts` в Hero и данные тарифов.
- Удалить `isTemporaryPrice` из типа `Tariff` и из интерфейса карточки.
- Использовать преимущества: центр города, короткие сроки, опытные инструкторы, экзамен на знакомом автомобиле.
- Создать тарифы `full-course`, `theory`, `practice`.
- Указать оплату частями без обещания отсутствия переплаты.
- Добавить отдельное примечание об экзаменах и занятии 1,5 часа.

### Шаг 5. Повторно запустить целевые тесты

```powershell
pnpm test --run src/data/real-content.test.ts src/components/hero.test.tsx src/components/home-sections.test.tsx
```

Ожидаемый результат: целевые тесты проходят.

---

## Задача 2. Заменить программы и рекомендации квиза

**Файлы:**

- изменить: `src/data/programs.ts`;
- изменить: `src/data/quiz.ts`;
- изменить: `src/lib/quiz.ts`;
- изменить: `src/components/program-visual.tsx`;
- изменить: `src/components/program-card.tsx`;
- изменить: `src/components/programs-section.test.tsx`;
- изменить: `src/components/program-quiz.test.tsx`;
- изменить: `src/lib/quiz.test.ts`;
- проверить: `src/app/programs/[slug]/page.tsx`.

### Шаг 1. Переписать тесты под подтверждённые программы

Ожидать четыре направления:

- `/programs/category-b` — полный курс категории B;
- `/programs/theory` — теоретическая подготовка;
- `/programs/driving-practice` — практическое вождение, 57 часов;
- `/programs/additional-lesson` — занятие 1,5 часа.

Проверить отсутствие A/A1, отдельных программ МКПП/АКПП и меток «Временные данные».

Для квиза заменить первый вопрос на выбор цели: полный курс, теория, практика или «пока не решил». Проверить, что восстановление навыков и подготовка к экзамену ведут к дополнительному занятию.

### Шаг 2. Подтвердить падение тестов

```powershell
pnpm test --run src/components/programs-section.test.tsx src/components/program-quiz.test.tsx src/lib/quiz.test.ts
```

### Шаг 3. Обновить типы и данные программ

- Заменить временную длительность полем `volume` с подтверждённым объёмом или текстом «Уточняется при записи».
- Обновить `ProgramVisualKind` на варианты `category-b`, `theory`, `driving`, `practice`.
- Не показывать неподтверждённый срок полного курса.
- Сохранить передачу точного названия программы в общую форму записи.

### Шаг 4. Обновить типизированную логику квиза

- Заменить `VehicleAnswerId` на идентификаторы целей обучения.
- Обновить `getQuizRecommendation` без ссылок на удалённые slug.
- Сохранить три шага, возврат назад, прогресс, валидацию и отправку без перезагрузки.

### Шаг 5. Запустить целевые тесты повторно

```powershell
pnpm test --run src/components/programs-section.test.tsx src/components/program-quiz.test.tsx src/lib/quiz.test.ts
```

---

## Задача 3. Добавить настоящих инструкторов и исправить модальное окно

**Файлы:**

- изменить: `src/data/instructors.ts`;
- изменить: `src/components/instructor-card.tsx`;
- изменить: `src/components/instructor-modal.tsx`;
- изменить: `src/components/instructors-section.tsx`;
- изменить: `src/components/instructors-section.test.tsx`;
- добавить изображения: `public/images/instructors/sergey-pogodin.jpg`;
- добавить изображения: `public/images/instructors/vladimir-shestov.jpg`;
- добавить изображения: `public/images/instructors/nikolay-maltsev.jpg`;
- добавить изображения: `public/images/instructors/nikolay-lobanov.jpg`;
- добавить изображения: `public/images/instructors/eduard-zhuk.jpg`;
- добавить изображения: `public/images/instructors/valentin-krivenko.jpg`;
- добавить изображения: `public/images/instructors/igor-prokhorov.jpg`;
- изменить: `public/images/instructors/SOURCES.md` или создать его, если отсутствует.

### Шаг 1. Написать регрессионные тесты

Проверить:

- отображаются семь реальных имён и соответствующие автомобили;
- отсутствуют выдуманные рейтинг, стаж и категории;
- после открытия `dialog.parentElement === document.body`;
- диалог закрывается по Escape и клику по фону;
- фокус возвращается на кнопку «Подробнее»;
- выбранный инструктор передаётся в общую форму.

### Шаг 2. Подтвердить падение тестов

```powershell
pnpm test --run src/components/instructors-section.test.tsx
```

### Шаг 3. Скачать и проверить исходные фотографии

Скачать семь изображений с официального сайта:

```powershell
curl.exe -L https://perekrestok76.ru/images/instruktory/avtoshkola_instruktor_1.jpg -o public/images/instructors/sergey-pogodin.jpg
curl.exe -L https://perekrestok76.ru/images/instruktory/avtoshkola_instruktor_2.jpg -o public/images/instructors/vladimir-shestov.jpg
curl.exe -L https://perekrestok76.ru/images/instruktory/avtoshkola_instruktor_3.jpg -o public/images/instructors/nikolay-maltsev.jpg
curl.exe -L https://perekrestok76.ru/images/instruktory/avtoshkola_instruktor_4.jpg -o public/images/instructors/nikolay-lobanov.jpg
curl.exe -L https://perekrestok76.ru/images/instruktory/avtoshkola_instruktor_5.jpg -o public/images/instructors/eduard-zhuk.jpg
curl.exe -L https://perekrestok76.ru/images/instruktory/avtoshkola_instruktor_6.jpg -o public/images/instructors/valentin-krivenko.jpg
curl.exe -L https://perekrestok76.ru/images/instruktory/avtoshkola_instruktor_7.jpg -o public/images/instructors/igor-prokhorov.jpg
```

Проверить каждый файл визуально и убедиться, что порядок на официальной странице соответствует имени. В `SOURCES.md` указать URL, дату получения и ограничение «для закрытого демонстрационного прототипа».

### Шаг 4. Упростить тип Instructor

Оставить только подтверждённые поля:

```ts
type Instructor = {
  id: string;
  name: string;
  image: string;
  imagePosition?: string;
  vehicle: string;
  description: string;
};
```

Удалить персональные биографии и достижения. В модальном окне показать имя, автомобиль и общие условия обучения, явно не выдавая их за индивидуальный стаж.

### Шаг 5. Перенести диалог в портал

- Импортировать `createPortal` из `react-dom`.
- При отсутствии `instructor` возвращать `null`.
- Возвращать `createPortal(dialogMarkup, document.body)`.
- Сохранить focus trap, Escape, блокировку прокрутки и возврат фокуса.
- Ограничить высоту панели относительно `100dvh` и оставить внутреннюю прокрутку.

### Шаг 6. Повторно запустить тест

```powershell
pnpm test --run src/components/instructors-section.test.tsx
```

---

## Задача 4. Исправить метку тарифа и обрезанные кнопки программ

**Файлы:**

- изменить: `src/components/pricing-card.tsx`;
- изменить: `src/components/program-card.tsx`;
- изменить: `src/components/home-sections.test.tsx`;
- изменить: `src/components/programs-section.test.tsx`.

### Шаг 1. Добавить проверки структуры

- Метка популярного тарифа находится в верхней строке карточки и не имеет абсолютного позиционирования.
- Группа действий программы имеет стабильное вертикальное расположение.
- Обе кнопки полноширинные и доступны по имени.

Использовать семантические `data-testid` только для проверки контейнеров компоновки, которые невозможно надёжно найти по роли.

### Шаг 2. Подтвердить падение тестов

```powershell
pnpm test --run src/components/home-sections.test.tsx src/components/programs-section.test.tsx
```

### Шаг 3. Исправить PricingCard

- Удалить `absolute right-5 top-5` и `pr-24`.
- Создать обычную flex-строку с подписью школы и меткой.
- Разрешить перенос строки через `flex-wrap`.
- Удалить блок временной цены и текст-заглушку.

### Шаг 4. Исправить ProgramCard

- Удалить `sm:flex-row` у группы CTA.
- Оставить две вертикальные полноширинные кнопки во всех размерах карточки.
- Добавить `min-w-0` для текстовых дочерних элементов и перенос длинных подписей.

### Шаг 5. Повторить тесты

```powershell
pnpm test --run src/components/home-sections.test.tsx src/components/programs-section.test.tsx
```

---

## Задача 5. Обновить автопарк и настоящие отзывы

**Файлы:**

- изменить: `src/data/cars.ts`;
- изменить: `src/components/car-card.tsx`;
- изменить: `src/components/fleet-section.test.tsx`;
- изменить: `src/data/reviews.ts`;
- изменить: `src/components/review-card.tsx`;
- изменить: `src/components/reviews-section.tsx`;
- изменить: `src/components/reviews-section.test.tsx`.

### Шаг 1. Написать падающие проверки реального контента

Для автопарка ожидать Volkswagen Polo, Renault Logan II, Lada Granta и Lada Largus. Проверить отсутствие Kia Rio, Hyundai Solaris, Skoda Rapid и неподтверждённых коробок передач.

Для отзывов ожидать реальные имена и содержание минимум четырёх опубликованных отзывов. Проверить:

- нет выдуманных дат и оценок;
- нет тегов `img` в карточках отзывов;
- отображаются инициалы;
- вместо рейтинга 4.9 выводится показатель «Более 85% сдают с первого раза».

### Шаг 2. Подтвердить падение тестов

```powershell
pnpm test --run src/components/fleet-section.test.tsx src/components/reviews-section.test.tsx
```

### Шаг 3. Упростить данные автопарка

- Удалить неподтверждённые `transmission` и технические `features`.
- Использовать реальные модели и фотографии соответствующих инструкторов/машин.
- Сформулировать нейтральное описание: автомобиль используется для практических занятий.
- Сохранить передачу модели автомобиля в форму записи.

### Шаг 4. Упростить данные отзывов

Тип отзыва содержит `id`, `name`, `initials`, `text` и при наличии подтверждённое упоминание инструктора. Тексты аккуратно сократить без изменения смысла. Удалить импорт Next Image и звёзды из карточки.

### Шаг 5. Повторно запустить тесты

```powershell
pnpm test --run src/components/fleet-section.test.tsx src/components/reviews-section.test.tsx
```

---

## Задача 6. Обновить контакты, тексты и SEO

**Файлы:**

- изменить: `src/config/site.ts`;
- проверить: `src/data/contact.ts`;
- изменить: `src/app/layout.tsx`;
- изменить: `src/lib/structured-data.ts`;
- изменить: `src/app/seo.test.ts`;
- изменить: `src/components/contact-section.test.tsx`;
- изменить при необходимости: `src/components/site-header.tsx`;
- изменить при необходимости: `src/components/site-footer.tsx`;
- изменить при необходимости: `src/components/mobile-action-bar.tsx`.

### Шаг 1. Расширить проверки единого контакта

Проверить оба телефона, адрес, почту и режим работы во всех основных компонентах. В SEO-тесте проверить новое описание без неподтверждённых МКПП/АКПП и структурированные часы работы Пн–Чт 12:00–17:00.

### Шаг 2. Подтвердить падение изменённых ожиданий

```powershell
pnpm test --run src/app/seo.test.ts src/components/contact-section.test.tsx src/components/site-header.test.tsx src/components/site-footer.test.tsx
```

### Шаг 3. Обновить конфигурацию

- Сохранить уже верные телефоны, адрес, email и часы.
- Заменить SEO description на подтверждённые преимущества: категория B, центр города, более 85% сдачи с первого раза, оплата частями.
- Не заявлять отдельное обучение на механике и автомате.
- В `priceRange` структурированных данных указать подтверждённый диапазон `12 000–53 800 ₽`.

### Шаг 4. Запустить тесты повторно

```powershell
pnpm test --run src/app/seo.test.ts src/components/contact-section.test.tsx src/components/site-header.test.tsx src/components/site-footer.test.tsx
```

---

## Задача 7. Привести анимации к единой системе

**Файлы:**

- изменить: `src/app/globals.css`;
- изменить: `src/components/benefit-card.tsx`;
- изменить: `src/components/pricing-card.tsx`;
- изменить: `src/components/program-card.tsx`;
- изменить: `src/components/instructor-card.tsx`;
- изменить: `src/components/car-card.tsx`;
- изменить при необходимости: `src/components/enrollment-modal.tsx`;
- изменить: `src/components/instructor-modal.tsx`.

### Шаг 1. Добавить общие CSS-токены и классы

В `:root` задать:

```css
--motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
--motion-card: 460ms;
--motion-image: 600ms;
--motion-modal: 340ms;
```

Создать переиспользуемые классы `.interactive-card` и `.interactive-image` вместо повторяющихся Tailwind-наборов переходов.

### Шаг 2. Смягчить карточки

- Подъём карточки: максимум `translateY(-4px)`.
- Масштаб изображения: максимум `1.02`.
- Использовать общую кривую ускорения.
- На устройствах без hover не скрывать основные CTA.

### Шаг 3. Смягчить модальные и короткие переходы

- backdrop: 260 мс;
- panel: 340 мс, `translateY(10px) scale(0.99)`;
- quiz: 280–320 мс вместо 200 мс;
- FAQ: около 260 мс;
- сохранить существующий блок `prefers-reduced-motion`.

### Шаг 4. Запустить тесты компонентов с интерактивностью

```powershell
pnpm test --run src/components/instructors-section.test.tsx src/components/enrollment-modal.test.tsx src/components/program-quiz.test.tsx src/components/faq-section.test.tsx
```

---

## Задача 8. Удалить остатки демонстрационных данных

**Файлы:** все файлы `src/`, относящиеся к главной странице и данным.

### Шаг 1. Выполнить поиск запрещённых остатков

```powershell
rg -n "XX XXX|Временная цена|Временные данные|A / A1|Кia Rio|Kia Rio|Hyundai Solaris|Skoda Rapid|Алексей Морозов|Марина Волкова|Дмитрий Соколов|Илья Воронов|4,8 по отзывам|4\.9" src
```

Ожидаемый результат: совпадений в пользовательском интерфейсе и рабочих данных нет. Допустимы только намеренные проверки отсутствия строк в тестах.

### Шаг 2. Проверить TypeScript и ESLint

```powershell
pnpm typecheck
pnpm lint
```

Исправить неиспользуемые импорты, старые поля типов и недостижимые ветки.

---

## Задача 9. Полная автоматическая и визуальная проверка

**Файлы:** изменять только при обнаружении регрессии.

### Шаг 1. Запустить весь набор тестов

```powershell
pnpm test --run
```

Ожидаемый результат: все тесты проходят, предупреждений React нет.

### Шаг 2. Выполнить production-сборку

```powershell
pnpm build
```

Ожидаемый результат: сборка Next.js завершается без ошибок типов, маршрутов и изображений.

### Шаг 3. Открыть локальный сайт

```powershell
pnpm dev
```

Проверить в браузере ширины 320, 375, 390, 414, 768, 1024 и desktop.

### Шаг 4. Визуально проверить сценарии со скриншотов

- Прокрутить до инструкторов, открыть первый и последний диалог: окно остаётся по центру viewport.
- Проверить высокое и низкое положение страницы, Escape, клик по фону и внутреннюю прокрутку.
- Убедиться, что метка «Популярный выбор» не пересекается с подписью.
- Убедиться, что обе кнопки каждой программы видны полностью.
- Проверить отсутствие горизонтальной прокрутки через `document.documentElement.scrollWidth === window.innerWidth` на целевых ширинах.
- Проверить карточки мышью и клавиатурой; CTA не исчезают на touch.
- Включить `prefers-reduced-motion: reduce` и убедиться, что интерфейс остаётся работоспособным.

### Шаг 5. Финальная проверка содержимого

Сравнить видимые цены, инструкторов, автомобили, отзывы и контакты с официальными страницами. Зафиксировать в итоговом сообщении, что данные актуальны на 17 июля 2026 года и требуют подтверждения автошколой перед публичным запуском.

