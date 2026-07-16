# Perekrestok Header and Hero Design

## Scope

Implement only the responsive site header and the first-screen hero for the
Yaroslavl driving school “Перекрёсток”. Do not add later homepage sections,
additional pages, a footer, or speculative business functionality.

## Visual direction

The interface follows the approved “quiet confidence” system:

- warm white background;
- graphite typography;
- restrained yellow accents for primary actions;
- large editorial photography;
- generous whitespace;
- precise, modern spacing;
- subtle motion that never delays access to content.

## Header

- Transparent over the hero at the top of the page.
- Becomes a lightly translucent white surface after scrolling.
- Contains the wordmark, desktop navigation, telephone number, and a yellow
  “Записаться” button.
- Uses an accessible burger menu on smaller screens.
- The mobile menu exposes the same navigation, telephone number, and CTA.

## Hero

- Occupies almost the full initial viewport.
- Uses a two-column editorial composition on desktop and a single-column
  mobile-first composition on smaller screens.
- Left side contains the location label, headline, explanatory copy, indicative
  price, rating, three concise advantages, and two actions.
- Right side contains one large photographic scene featuring a learner,
  instructor, and training car.
- Copy must remain visible without waiting for animation.

## Copy

- Eyebrow: `Автошкола «Перекрёсток» · Ярославль`
- Heading: `Спокойно научим уверенно водить`
- Supporting copy: `Категория B на механике и автомате. Понятная программа, практика с инструктором и подготовка к экзамену.`
- Indicative price: `от 35 000 ₽`
- Primary action: `Записаться на обучение`
- Secondary action: `Подобрать программу`
- Rating: `4,8 по отзывам учеников`
- Advantages: `МКПП и АКПП`, `Удобный график`, `Рассрочка`

The price and rating are concept content and must be confirmed with the client
before production launch.

## Responsive behavior

- Desktop: 12-column grid, copy on five columns, image on seven.
- Tablet: balanced two-column layout until the content becomes constrained,
  then stack naturally.
- Mobile: headline, price, actions, proof, then photograph; full-width primary
  action and touch targets at least 44px.

## Motion and accessibility

- Use Framer Motion for restrained fade/translate entrances.
- Header state changes must not cause layout shift.
- Respect reduced-motion preferences.
- Menu controls, navigation, telephone, and CTAs require accessible names and
  keyboard focus states.

## Verification

- Component tests verify core copy, actions, telephone link, and mobile-menu
  behavior.
- TypeScript, ESLint, tests, and production build must pass.
- No section beyond Header and Hero may be rendered.

