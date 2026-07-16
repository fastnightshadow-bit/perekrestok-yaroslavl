# Production Hardening Design

## Scope

Prepare the completed driving-school website for production without adding
marketing sections, changing the approved visual design, or inventing new
business functionality.

The work covers:

- Server and Client Component boundaries;
- shared enrollment state;
- route loading, error, empty, success, and not-found states;
- Core Web Vitals and Lighthouse;
- Framer Motion and reduced-motion behavior;
- Tailwind and shadcn/ui consistency;
- Next.js App Router production conventions;
- automated and production verification.

## Baseline

The current production build is healthy and renders statically, but the home
route ships 81.3 kB of route JavaScript and 187 kB of First Load JS.

The main architectural cause is `EnrollmentExperience`. Because it is a Client
Component that imports almost every home-page section, all imported sections
and their dependencies enter the client module graph, including components
that have no state or browser behavior.

The existing project already has:

- complete metadata, canonical, Open Graph, Twitter, robots, sitemap, and
  JSON-LD;
- optimized `next/image` usage with explicit `sizes`;
- reduced-motion support;
- accessible enrollment and instructor modals;
- validation, loading, success, and error states in the quiz;
- smooth in-page scrolling and fixed-header anchor offsets;
- a shared shadcn-style Button component.

These working parts must be preserved.

## Architecture

### Enrollment provider

Replace `EnrollmentExperience` with a narrow client-side
`EnrollmentProvider`.

The provider owns only:

- selected enrollment program;
- modal open state;
- `openEnrollment(program)`;
- `openConsultation()`;
- `closeEnrollment()`;
- the shared enrollment modal;
- the fixed mobile action bar.

The provider accepts Server Component children. The Server page renders each
home section directly, allowing static sections to stay outside the client
module graph.

Interactive sections consume a typed `useEnrollment()` hook instead of
receiving callback props from one large client parent.

### Enrollment triggers

Remove the document-level click delegation that intercepts every
`a[href="#enroll"]`.

Use explicit enrollment actions:

- Header calls `openConsultation()`;
- Hero uses a small client `EnrollmentTrigger`;
- pricing, programs, timeline, instructors, fleet, and final CTA call the
  provider through `useEnrollment()`;
- ordinary anchor links remain ordinary navigation.

This removes one global effect and makes event ownership explicit.

### Server component recovery

Return components to the server graph when they do not require state, effects,
browser APIs, or event handlers.

Target components:

- Hero, using CSS entrance animations instead of Framer Motion;
- BenefitCard, using its existing CSS hover transition;
- BenefitsSection;
- static visual and content helpers already compatible with Server Components.

Interactive components remain client-side:

- Header;
- pricing and program actions;
- quiz;
- instructor modal flow;
- reviews carousel controls;
- FAQ accordion;
- contact form;
- enrollment modal and mobile action bar.

### Framer Motion

Keep Framer Motion only where it adds behavior that CSS cannot express as
clearly:

- quiz transitions;
- FAQ height transitions;
- timeline reveal;
- modal enter and exit transitions.

Remove Framer Motion from Hero and benefit hover effects. Preserve the same
timing, easing, opacity, translate, and scale behavior with CSS keyframes.
Existing global reduced-motion rules must disable these animations.

## Route states

### Loading and skeleton

Add a root `loading.tsx` that renders a lightweight server-side skeleton.

The skeleton:

- reserves Header, Hero text, Hero media, and first content-card dimensions;
- uses the same warm-white background and approved radii;
- has no JavaScript;
- uses a restrained pulse animation disabled by reduced-motion preferences;
- contains an accessible loading announcement.

Add a reusable shadcn-style `Skeleton` primitive under `components/ui`.

### Error

Add `error.tsx` as the required Client Component error boundary.

It presents:

- a concise Russian error message;
- a Retry button using `reset()`;
- a link to the home page;
- the existing graphite, white, and yellow visual language.

Do not log production errors from an unnecessary effect.

### Not found

Add a server-side `not-found.tsx`.

It presents:

- a clear 404 heading;
- a short explanation;
- a link to the home page;
- a link to the contacts section.

Next.js will supply the noindex behavior for missing pages.

### Empty states

Add a small reusable `EmptyState` component for content collections.

Programs, instructors, cars, and reviews render the empty state only when their
data array is empty. Existing content and layout remain unchanged when data is
present.

The empty state has:

- a neutral heading;
- a short explanation;
- an optional contact or consultation action;
- no decorative animation.

### Form states

Keep the quiz loading, error, and success flow.

Keep the contact form’s success state and accessible phone-validation error.
Do not simulate network loading for forms that do not yet have an approved
backend endpoint.

## Navigation and scroll

Keep native Next.js App Router scroll restoration. Next.js already scrolls to
the top on route navigation and preserves expected browser history behavior.

Do not add a route-change `useEffect`, manual history manipulation, or
`window.scrollTo` handler.

Keep:

- CSS `scroll-behavior: smooth` for in-page anchors;
- reduced-motion override;
- fixed-header `scroll-margin-top`;
- standard Next.js `<Link>` navigation.

## Core Web Vitals

### LCP

- Keep Hero as the only priority image.
- Keep its stable container dimensions and accurate `sizes`.
- Move Hero animation from hydrated JavaScript to CSS.
- Ensure the skeleton reserves approximately the same Hero geometry.

### CLS

- Keep aspect-ratio or fixed-height containers for all fill images.
- Keep modal and mobile safe-area spacing.
- Avoid loading UI that changes page width or removes the scrollbar.

### INP

- Reduce initial hydration by shrinking the client module graph.
- Remove global enrollment click delegation.
- Avoid unnecessary memoization and callbacks.
- Keep animations transform/opacity-based where possible.

## Tailwind and shadcn/ui

- Continue using the existing Button variant system.
- Add Skeleton as a focused UI primitive.
- Do not introduce a second button, card, or form-control abstraction.
- Preserve current radius hierarchy:
  controls, compact surfaces, cards, and feature media remain distinct tiers.
- Preserve current shadow hierarchy and section spacing.
- Remove only styles proven to be duplicated or unreachable.

## Typing

- Expose a strict `EnrollmentContextValue` interface.
- Make the provider hook throw a clear development error when used outside the
  provider.
- Keep collection item types sourced from their data modules.
- Avoid `any`, type assertions that hide invalid states, and duplicated form
  status unions.

## Lighthouse

Run Lighthouse against a production `next start` server using installed Chrome.

Audit:

- Performance;
- Accessibility;
- Best Practices;
- SEO;
- mobile emulation.

Store generated reports under the ignored `work/` directory rather than
shipping them with the application.

If Lighthouse is not locally installed, run it as a temporary CLI tool without
adding it to runtime dependencies.

Compare:

- performance score;
- accessibility score;
- best-practices score;
- SEO score;
- LCP;
- CLS;
- Total Blocking Time;
- route and First Load JavaScript sizes.

## Testing

Add or update tests for:

- provider state and selected-program propagation;
- Hero enrollment trigger;
- absence of global click interception;
- loading skeleton semantics;
- error reset action;
- not-found navigation;
- empty collection states;
- preserved enrollment flows in every section.

Final verification:

1. complete Vitest suite;
2. TypeScript;
3. ESLint with zero warnings;
4. production build;
5. production HTML smoke test;
6. Lighthouse mobile audit;
7. bundle-size comparison;
8. responsive review at 320, 375, 390, 414, 768, and 1024 CSS widths.

## Non-goals

- No new marketing sections.
- No visual redesign.
- No new business pages.
- No backend, CRM, email, or analytics integration.
- No fake asynchronous form requests.
- No dependency replacement solely for novelty.
- No manual scroll-restoration component.
