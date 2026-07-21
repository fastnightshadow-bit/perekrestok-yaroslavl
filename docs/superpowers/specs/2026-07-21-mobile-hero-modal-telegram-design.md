# Mobile Hero, Modal and Telegram Delivery Design

## Scope

- Change only the mobile Hero. Keep the current desktop Hero layout unchanged from `lg` and above.
- Use the approved third concept: a large, sharp photograph immediately below the mobile header, followed by the headline, price/trust row, and two full-width actions.
- Fix the mobile enrollment dialog so its close control never scrolls away and opening it does not force the keyboard or shift the panel.
- Keep the mobile action bar out of the way while the Hero is visible, then reveal it for the rest of the page.
- Restore production Telegram delivery through Netlify environment variables without putting secrets in source control, logs, or chat.

## Mobile Hero

The mobile order is header, large rounded photo, trust overlay, headline, price, primary CTA and phone CTA. The same semantic elements are reordered responsively instead of duplicating the Hero, so assistive technology receives one heading and one content flow. The image uses the existing `perekrestok-hero.jpg` and a wide crop so both the student and instructor remain visible. The mobile section has natural height; it is not forced into `100svh`.

The primary action is `Получить консультацию`, because it is a lower-friction promise than an immediate enrollment. The secondary action is `Позвонить`. Both actions span the available content width. At `lg` and above the current two-column desktop markup, copy, dimensions and crop remain unchanged.

## Mobile Action Bar

The bar remains mobile-only. An `IntersectionObserver` watches the Hero and hides the bar while the Hero is meaningfully visible. After the user scrolls past it, the bar enters with a short opacity/translate transition. Safe-area padding remains in place and the page already reserves space below the content.

## Enrollment Dialog

The backdrop does not scroll. The dialog is capped to the visual viewport and uses a fixed header plus a separately scrolling body. The close button stays in the header. Initial focus moves to the close button instead of the name field, avoiding unwanted mobile keyboard activation and scroll jumps. Escape, backdrop click, focus trapping and focus restoration remain supported.

The selected program remains part of the submitted data but is shown compactly to reduce vertical space. The form preserves entered values on failure and shows the safe server-provided message when available.

## Telegram Delivery

`TELEGRAM_BOT_TOKEN` is read from the Windows clipboard only inside a local command, sent directly to Netlify's protected environment variables, and never printed or written into the repository. The clipboard is cleared afterward. `TELEGRAM_CHAT_ID` remains unchanged. A new production deploy is triggered, followed by an explicitly labeled test lead and confirmation that the endpoint responds successfully.

## Verification

- Vitest tests cover the mobile/desktop Hero class split, delayed mobile bar, pinned dialog header, initial focus, and safe form error propagation.
- Run lint, typecheck, full tests and production build.
- Inspect widths 320, 375, 390, 414, 768 and desktop 1024+ with no horizontal overflow.
- Verify the desktop Hero is visually unchanged and the public API accepts a test lead.
