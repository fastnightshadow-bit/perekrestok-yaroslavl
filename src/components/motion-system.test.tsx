import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BenefitsSection } from "@/components/benefits-section";
import { FleetSection } from "@/components/fleet-section";
import { InstructorsSection } from "@/components/instructors-section";
import { PricingSection } from "@/components/pricing-section";
import { renderWithEnrollment } from "@/test/render-with-enrollment";

describe("shared motion system", () => {
  it("defines calm reusable motion timings", () => {
    const css = readFileSync(resolve(process.cwd(), "src/app/globals.css"), "utf8");

    expect(css).toContain("--motion-ease: cubic-bezier(0.22, 1, 0.36, 1)");
    expect(css).toContain("--motion-card: 460ms");
    expect(css).toContain("--motion-image: 600ms");
    expect(css).toContain("--motion-modal: 340ms");
    expect(css).toContain(".interactive-card");
    expect(css).toContain(".interactive-image");
  });

  it("applies shared motion to conversion cards", () => {
    renderWithEnrollment(
      <>
        <BenefitsSection />
        <PricingSection />
        <InstructorsSection />
        <FleetSection />
      </>,
    );

    expect(
      screen
        .getByRole("heading", { name: "Обучение в центре Ярославля" })
        .closest("article"),
    ).toHaveClass("interactive-card");

    const pricing = screen.getByRole("region", { name: "Обучение категории B" });
    expect(
      within(pricing).getByRole("article", { name: "Категория B — МКПП / АКПП" }),
    ).toHaveClass("interactive-card");

    const instructor = screen.getByRole("article", {
      name: "Погодин Сергей Владимирович",
    });
    expect(within(instructor).getByRole("img")).toHaveClass("interactive-image");

    const car = screen.getByRole("article", { name: "Volkswagen Polo" });
    expect(within(car).getByRole("img")).toHaveClass("interactive-image");
  });
});
