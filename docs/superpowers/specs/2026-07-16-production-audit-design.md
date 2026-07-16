# Production Audit Design

## Scope

Audit and harden the completed home page without adding sections, changing the
approved visual direction, or introducing new product functionality.

The work is limited to:

- architecture and semantic cleanup;
- consistency and accessibility fixes;
- verified business contact data;
- technical SEO;
- restrained performance and animation improvements;
- removal of demonstrably unused or misleading code/content.

## Findings and decisions

### Document structure

The Hero currently owns the only `<main>` element, leaving the rest of the home
page outside the primary landmark. Move the landmark to `page.tsx`, wrap the
complete home-page experience, and make Hero a section. Add a keyboard-visible
skip link to the main content.

### Header and conversion

The header exposes a phone action on small mobile screens and the full number on
extra-large screens, but tablet users only receive the enrollment button. Add a
compact phone icon action for the `md` through `xl` range.

Treat the mobile menu as a real modal navigation surface:

- close on Escape;
- lock body scrolling while open;
- move focus into the menu;
- trap Tab navigation;
- restore focus to the trigger after closing;
- keep all existing visuals and animations.

### Motion

Existing components use a mixture of explicit reduced-motion handling and raw
Framer Motion transitions. Add one lightweight client provider using
`MotionConfig reducedMotion="user"` so all Framer Motion components respect the
operating-system preference consistently.

### Business data

Replace temporary contact placeholders with verified information from the
existing official website:

- address: Ярославль, ул. Республиканская, д. 3, корп. 1, оф. 405;
- phones: +7 (4852) 70-03-03 and +7 (930) 100-03-03;
- email: perekrestok.76@yandex.ru;
- hours: Monday–Thursday 12:00–17:00;
- official VK, privacy-policy, website, and Yandex Maps links.

Do not replace program prices, reviews, cars, or instructor content because the
project intentionally marks those data as prototypes and no complete verified
dataset has been approved.

### SEO

Create a single typed site configuration and use it for:

- title and description;
- canonical URL;
- Open Graph and Twitter metadata;
- robots instructions;
- sitemap;
- LocalBusiness/EducationalOrganization JSON-LD.

Only the completed home page belongs in the sitemap. Existing placeholder
program and review routes remain reachable for prototype navigation but receive
`noindex` metadata until real pages are built.

### UI and performance

Keep the approved hierarchy of radii, shadows, spacing, and motion durations.
The current differences are purposeful: compact controls, standard cards, hero
media, and modal surfaces use different but consistent size tiers.

Retain Next Image usage and current lazy loading. The hero remains the only
priority image. Avoid speculative component rewrites that would increase risk
without a measured performance benefit.

## Validation

Tests will cover:

- one main landmark containing the full page;
- mobile-menu Escape, focus, and scroll-lock behavior;
- verified contact data and working external links;
- metadata, robots, sitemap, and structured data;
- placeholder-route `noindex` metadata.

Final verification runs the complete test suite, TypeScript, ESLint, and a
production build.
