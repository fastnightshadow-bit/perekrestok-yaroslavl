# Telegram leads integration design

Date: 2026-07-18

## Goal

Connect every existing lead form on the Perekrestok driving-school website to one secure server endpoint. The endpoint sends each valid lead to a private Telegram group through a bot. The first version uses Telegram only: no CRM, email, spreadsheet, or lead database.

## Confirmed decisions

- The production site will be deployed as a Next.js application on Vercel.
- GitHub remains the source-code repository, but GitHub Pages is no longer the production runtime.
- Leads go to a dedicated private Telegram group.
- Telegram is the only delivery channel in the first version.
- Bot credentials never enter browser code or the Git repository.
- The existing visual design and page structure remain unchanged.

## Architecture

1. An existing form collects the minimum necessary fields.
2. A shared client function sends JSON to `POST /api/leads`.
3. A Next.js route handler validates and normalizes the payload on the server.
4. The route handler formats a plain-text message and calls the Telegram Bot API.
5. Telegram publishes the message in the private leads group.
6. The route returns a small success or error response to the form.

The static `output: "export"` configuration will be removed because a static export cannot execute `/api/leads`. Local development will use the normal Next.js development server, and production will use Vercel's Next.js runtime.

## Connected forms

The integration covers all current lead entry points without creating duplicate forms:

- the shared enrollment modal opened from Hero, prices, instructors, fleet, CTA blocks, Header, and the mobile action bar;
- the contact-section form;
- the final screen of the program quiz.

All forms use one shared submission client and one payload contract. Each entry point supplies its own `source` value so the Telegram message shows where the lead originated.

## Lead payload

Required fields:

- `type`: `enrollment`, `contact`, or `quiz`;
- `name`;
- `phone`;
- `source`;
- `consent: true`.

Optional fields:

- selected program or consultation topic;
- selected instructor;
- selected training car;
- comment;
- quiz answers and recommendation;
- page URL;
- UTM source, medium, campaign, content, and term when present.

The browser must not send bot credentials, Telegram group identifiers, internal error details, cookies, or unrelated personal information.

## Telegram message

Each lead becomes one readable plain-text message:

```text
🚗 Новая заявка с сайта

Имя: Илья
Телефон: +7 900 000-00-00
Интерес: Категория B — МКПП / АКПП
Источник: блок стоимости
Комментарий: —
Реклама: yandex / search / category-b
Время: 18.07.2026, 15:20 МСК
```

Quiz messages additionally include the selected transmission, preferred schedule, driving experience, and recommended program. Empty optional fields are omitted instead of producing a long message full of placeholders.

## Validation and abuse protection

The browser provides immediate feedback, but the server repeats every important validation because browser checks can be bypassed.

- Name is trimmed and length-limited.
- Phone is normalized and must contain a plausible number of digits.
- Program, source, comment, and UTM fields have strict maximum lengths.
- Unknown object keys are ignored.
- The request body has a small maximum size.
- Consent must be explicitly true.
- A visually hidden honeypot field rejects basic automated spam.
- Requests submitted implausibly quickly are rejected.
- The endpoint accepts only JSON and returns generic errors without exposing secrets.
- Telegram requests use a short timeout.
- Personal form values and the bot token are not written to application logs.

The first version does not add CAPTCHA, Redis, a database, or a third-party automation platform. If real traffic later attracts persistent spam, rate limiting or Turnstile can be added as a separate improvement.

## Form behavior

Every connected form has the same state model:

- `idle`: fields are editable;
- `submitting`: submit button is disabled and shows a loading label;
- `success`: the form confirms that the request was sent;
- `error`: the entered values remain, an understandable error appears, and the user can retry or call the school.

Double submission is blocked while a request is in progress. Success is shown only after Telegram confirms message delivery. Errors are announced through an accessible live region, and focus is moved only when it improves keyboard and screen-reader use.

## Server configuration

Vercel environment variables:

- `TELEGRAM_BOT_TOKEN` — secret token issued by BotFather;
- `TELEGRAM_CHAT_ID` — identifier of the private leads group;
- `NEXT_PUBLIC_SITE_URL` — the final public site URL.

The repository contains only an `.env.example` with empty placeholders. Real values are entered in Vercel project settings and a local `.env.local`; both secret files remain outside Git.

## Telegram setup

1. Create a bot through the official `@BotFather` account.
2. Create the private group `Заявки Перекрёсток`.
3. Add the bot to the group and allow it to send messages.
4. Send one test message in the group and obtain the group chat ID through the Bot API.
5. Add the token and chat ID to Vercel environment variables.
6. Deploy and send one test lead from each of the three form types.

Bot credentials shared during setup must not be pasted into source files, screenshots, public chats, or commits. If a token is exposed, it must be revoked and recreated through BotFather.

## Errors and delivery guarantees

- Telegram success produces HTTP 200 and the form success state.
- Invalid user data produces HTTP 400 with a safe field-level or general message.
- Honeypot or abuse checks produce a generic rejection.
- Telegram timeout, configuration error, or non-success response produces HTTP 502/503 and leaves the form available for retry.
- Because the approved first version has no database, a lead is not retained when Telegram delivery fails. The interface must state that it was not sent and prominently offer the school's telephone number.

## Testing

Automated tests cover:

- payload validation and normalization;
- Telegram message formatting;
- route success with a mocked Telegram response;
- invalid payload, honeypot, timeout, and Telegram failure;
- loading, success, error, retry, and duplicate-submit prevention in each form flow;
- preservation of quiz answers, program, instructor, car, comment, source, and UTM values;
- absence of credentials in the client bundle and repository.

Before production deployment, one manual end-to-end test lead is sent from the enrollment modal, contact form, and quiz to a test or temporary private Telegram group.

## Personal-data boundary

The existing consent and privacy links remain mandatory. The legal texts must identify the real personal-data operator and accurately describe the services and recipients involved.

This design is suitable as the agreed technical implementation for the current promotional/test stage, but it is not a legal guarantee for the future official Russian website. Article 18(5) of Federal Law No. 152-FZ contains localization requirements for collecting Russian citizens' personal data, and Telegram/Vercel may also raise cross-border-transfer questions. Before an official launch, the school should confirm the operator details, Roskomnadzor notification duties, localization architecture, and Telegram transfer with a qualified Russian privacy lawyer. If required, the production architecture must first record leads in infrastructure located in Russia and use Telegram only as a notification channel.

Official legal source: https://ips.pravo.gov.ru/api/ips/legislation/document?baseid=None&hash=98490812b3409e2a8d78a11ca9010f434ea3d9250a11dbbdb78690cd5551bdd6

## Out of scope

- CRM integration;
- email or spreadsheet backup;
- storing leads in a database;
- automatic Telegram replies;
- a Telegram bot command interface;
- changing the site's visual design;
- connecting the final domain or Yandex Metrika in this task.

