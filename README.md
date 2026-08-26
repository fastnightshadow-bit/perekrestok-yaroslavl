# Автошкола «Перекрёсток» — Ярославль

Одностраничный сайт автошколы с информацией об обучении категории B, ценами, квизом, инструкторами, автопарком, отзывами, контактами и отправкой заявок в Telegram.

- Публичный сайт: https://perekrestok-yaroslavl.netlify.app
- GitHub: https://github.com/fastnightshadow-bit/perekrestok-yaroslavl
- Подробный перенос на MacBook: [docs/MACBOOK-HANDOFF.md](docs/MACBOOK-HANDOFF.md)
- Подключение Telegram: [docs/telegram-setup.md](docs/telegram-setup.md)

## Технологии

- Next.js 15 и React 19
- TypeScript
- Tailwind CSS 4
- Radix Slot и собственные UI-компоненты
- Vitest и Testing Library
- Netlify для публикации

## Быстрый запуск на MacBook

Нужны Git, Node.js 22 LTS и pnpm.

    git clone https://github.com/fastnightshadow-bit/perekrestok-yaroslavl.git
    cd perekrestok-yaroslavl
    corepack enable
    pnpm install
    cp .env.example .env.local
    pnpm dev

После запуска откройте http://localhost:3000.

Настоящие значения Telegram нужно вручную записать в файл .env.local. Этот файл специально исключён из Git.

## Переменные окружения

    TELEGRAM_BOT_TOKEN=
    TELEGRAM_CHAT_ID=
    NEXT_PUBLIC_YANDEX_METRIKA_ID=
    NEXT_PUBLIC_SITE_URL=

- TELEGRAM_BOT_TOKEN — секретный токен бота от BotFather.
- TELEGRAM_CHAT_ID — ID закрытой группы заявок.
- NEXT_PUBLIC_YANDEX_METRIKA_ID — номер счётчика Метрики. Созданный для проекта счётчик: 110924306.
- NEXT_PUBLIC_SITE_URL — публичный адрес сайта для SEO. Для текущего Netlify-сайта: https://perekrestok-yaroslavl.netlify.app.

## Полезные команды

    pnpm dev
    pnpm test --run
    pnpm lint
    pnpm typecheck
    pnpm build
    pnpm start

Перед отправкой изменений должны проходить тесты, lint, typecheck и build.

## Структура

- src/app — страницы, SEO, legal-страницы и серверный API заявок.
- src/components — секции главной страницы и общие компоненты.
- src/data — цены, инструкторы, автомобили, отзывы и остальной контент.
- src/config/site.ts — адрес, телефоны, ссылки, реквизиты и базовая SEO-информация.
- src/lib/leads — проверка и отправка заявок в Telegram.
- public/images — фотографии Hero, инструкторов и автомобилей.
- docs — технические инструкции и история принятых решений.

## Публикация

Ветка main подключена к Netlify. После проверок:

    git add .
    git commit -m "Краткое описание изменений"
    git push origin main

Netlify автоматически собирает и публикует новую версию. Серверные переменные нужно хранить в настройках Netlify, а не в GitHub.
