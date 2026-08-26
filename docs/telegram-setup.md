# Подключение заявок к Telegram

Сайт отправляет формы через серверный адрес /api/leads. Токен бота используется только на сервере и не попадает в браузер посетителя.

## 1. Создать группу и бота

1. Создайте в Telegram закрытую группу, например «Заявки — Перекрёсток».
2. Откройте официального бота @BotFather и выполните команду /newbot.
3. Сохраните выданный токен в менеджере паролей. Не присылайте его в чат, не вставляйте в код и не загружайте на GitHub.
4. Добавьте нового бота в группу и разрешите ему отправлять сообщения.
5. Отправьте в группе команду /start@имя_вашего_бота или любое обычное сообщение.

## 2. Узнать ID группы

### Windows PowerShell

    $env:TELEGRAM_BOT_TOKEN = Read-Host "Вставьте токен бота"
    Invoke-RestMethod "https://api.telegram.org/bot$env:TELEGRAM_BOT_TOKEN/getUpdates" | ConvertTo-Json -Depth 8
    Remove-Item Env:TELEGRAM_BOT_TOKEN

### macOS Terminal

    read -s TELEGRAM_BOT_TOKEN
    curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates"
    unset TELEGRAM_BOT_TOKEN

В ответе найдите message.chat.id. ID закрытой группы обычно начинается со знака минус, например -1001234567890. Не сохраняйте настоящий токен в истории команд.

## 3. Настроить локальный запуск

Скопируйте пример настроек:

    cp .env.example .env.local

Затем заполните .env.local:

    TELEGRAM_BOT_TOKEN=токен_от_BotFather
    TELEGRAM_CHAT_ID=-1001234567890
    NEXT_PUBLIC_YANDEX_METRIKA_ID=110924306
    NEXT_PUBLIC_SITE_URL=https://perekrestok-yaroslavl.netlify.app

Файл .env.local исключён из Git. Убедитесь, что команда git status не показывает его перед commit.

## 4. Настроить Netlify

1. Откройте проект perekrestok-yaroslavl в Netlify.
2. Перейдите в Site configuration → Environment variables.
3. Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.
4. Добавьте NEXT_PUBLIC_YANDEX_METRIKA_ID со значением 110924306.
5. Добавьте NEXT_PUBLIC_SITE_URL со значением https://perekrestok-yaroslavl.netlify.app.
6. Запустите новый production deploy, чтобы переменные применились.

Для отправки заявок нужен серверный хостинг. GitHub хранит код, а рабочая версия сайта запускается через Netlify.

## 5. Проверка

Откройте опубликованный сайт и отправьте тестовую заявку. В закрытой группе должно появиться сообщение с источником заявки, контактами и выбранной программой.

Отдельно проверьте:

- форму в Hero;
- кнопку в тарифе;
- финал квиза;
- запись к инструктору;
- контактную форму;
- финальный CTA.

Если Telegram временно недоступен, сайт должен показать понятную ошибку и сохранить введённые поля, чтобы посетитель мог повторить отправку или позвонить.
