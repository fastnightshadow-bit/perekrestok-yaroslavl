# Production Audit Implementation Plan

**Goal:** Harden the completed driving-school site for release without adding
sections or changing its approved design.

**Architecture:** Keep the existing component composition. Introduce one typed
site configuration as the source of truth for verified business and SEO data,
one global Framer Motion preference provider, and semantic fixes at the page
boundary. Make targeted accessibility changes inside the existing Header.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion,
Vitest, Testing Library.

---

### Task 1: Semantic document structure

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/hero.tsx`
- Modify: `src/app/globals.css`
- Test: `src/app/page.test.tsx`

1. Write a failing test asserting one main landmark containing the page content.
2. Move `<main id="main-content">` to the page boundary.
3. Add a skip link with a visible focus state.
4. Run the focused test.

### Task 2: Header accessibility and tablet actions

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-header.test.tsx`

1. Add failing tests for Escape close, body scroll lock, focus restoration, and
   the tablet phone action.
2. Add refs, keyboard handling, focus trap, and scroll locking.
3. Add the compact `md:xl` phone action without changing desktop/mobile layout.
4. Run focused Header tests.

### Task 3: Global reduced-motion behavior

**Files:**
- Create: `src/components/motion-provider.tsx`
- Modify: `src/app/layout.tsx`
- Test: `src/components/motion-provider.test.tsx`

1. Add a small test for provider rendering.
2. Wrap application children in `MotionConfig reducedMotion="user"`.
3. Run the focused test.

### Task 4: Verified contact data and footer links

**Files:**
- Create: `src/config/site.ts`
- Modify: `src/data/contact.ts`
- Modify: `src/components/contact-section.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/contact-section.test.tsx`
- Modify: `src/components/site-footer.test.tsx`

1. Update tests to expect verified contact information and working official
   links.
2. Make site configuration the source of truth.
3. Show both telephone numbers and remove temporary-contact notices.
4. Turn verified VK and privacy-policy labels into links.
5. Run focused contact/footer tests.

### Task 5: Technical SEO

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/lib/structured-data.ts`
- Modify: `src/app/reviews/page.tsx`
- Modify: `src/app/programs/[slug]/page.tsx`
- Test: `src/app/seo.test.ts`

1. Add failing tests for metadata, robots, sitemap, JSON-LD, and placeholder
   route `noindex`.
2. Add canonical, Open Graph, Twitter, and robots metadata.
3. Add robots and a home-only sitemap.
4. Render organization/local-business JSON-LD on the home page.
5. Mark incomplete internal routes as `noindex`.
6. Run focused SEO tests.

### Task 6: Final audit and verification

**Files:**
- Review all changed files and dependency usage.

1. Search for stale temporary contact data and dead labels.
2. Verify no new dependency was added.
3. Run the full test suite.
4. Run TypeScript and ESLint.
5. Run a production build and review route output/bundle sizes.
6. Inspect the diff and report improvements and remaining prototype data.
