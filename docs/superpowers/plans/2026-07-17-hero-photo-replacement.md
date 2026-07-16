# Hero Photo Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hero image with the supplied driving-school photograph and give mobile a distinct crop that keeps the student and instructor visible.

**Architecture:** Keep the existing Hero structure and `next/image` integration. Store the supplied JPEG in `public/images`, switch the existing image source, and control the mobile/desktop crop with responsive Tailwind `object-position` classes.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library.

## Global Constraints

- Do not change Hero text, buttons, grid, dimensions, overlay, or any other section.
- Do not redraw, retouch, or generate content inside the supplied photograph.
- Keep `priority` and the existing responsive `sizes` attribute.
- Use a descriptive Russian alt text.
- The repository has no initial commit, so implementation remains uncommitted unless the user separately requests Git integration.

---

### Task 1: Replace and responsively crop the Hero photograph

**Files:**
- Create: `public/images/perekrestok-hero.jpg`
- Modify: `src/components/hero.tsx`
- Test: `src/components/hero.test.tsx`

**Interfaces:**
- Consumes: the supplied JPEG attachment and the existing `Hero` component.
- Produces: a Hero `<img>` whose source contains `/images/perekrestok-hero.jpg`, alt text is `Инструктор автошколы разговаривает с ученицей в учебном автомобиле`, and classes include `object-[52%_center] lg:object-center`.

- [ ] **Step 1: Write the failing test**

Add this test inside the existing `describe("Hero", ...)` block:

```tsx
it("uses the supplied school photograph with a dedicated mobile crop", () => {
  renderWithEnrollment(<Hero />);

  const image = screen.getByRole("img", {
    name: "Инструктор автошколы разговаривает с ученицей в учебном автомобиле",
  });

  expect(image).toHaveAttribute(
    "src",
    expect.stringContaining("perekrestok-hero.jpg"),
  );
  expect(image).toHaveClass("object-[52%_center]", "lg:object-center");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
& 'C:\Users\fastn\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'node_modules/vitest/vitest.mjs' run src/components/hero.test.tsx
```

Expected: FAIL because the current image has the old alt text, source, and crop classes.

- [ ] **Step 3: Copy the supplied photograph**

Copy:

```text
C:\Users\fastn\.codex\codex-remote-attachments\019f6232-dc54-7a82-b93e-8ef8a9ac481e\08BD2E5B-C2AA-4E55-9457-7D3AF0BDB7F5\1-Фото-1.jpg
```

to:

```text
public/images/perekrestok-hero.jpg
```

- [ ] **Step 4: Update the existing Next.js image**

Replace only the following properties on the Hero `Image`:

```tsx
<Image
  alt="Инструктор автошколы разговаривает с ученицей в учебном автомобиле"
  className="object-cover object-[52%_center] lg:object-center"
  fill
  priority
  sizes="(max-width: 1023px) 100vw, 58vw"
  src="/images/perekrestok-hero.jpg"
/>
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run the command from Step 2.

Expected: 3 tests pass.

- [ ] **Step 6: Run static verification**

Run `pnpm typecheck`, `pnpm lint`, and `pnpm build` with the bundled Node runtime.

Expected: all three commands exit with code 0.

- [ ] **Step 7: Visually verify responsive cropping**

Open the local production site at `http://127.0.0.1:3117/` and inspect the first screen at 390 × 844 and 1440 × 900.

Expected: the photograph loads, the student and instructor are visible, the Hero does not overflow horizontally, and all existing content remains unchanged.
