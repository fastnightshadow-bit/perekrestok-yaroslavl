import {
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("exposes the school identity, telephone and primary action", () => {
    renderWithEnrollment(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: /перекрёсток/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /\+7 \(4852\) 70-03-03/i }),
    ).toHaveAttribute("href", "tel:+74852700303");
    expect(
      screen.getByRole("link", { name: "Записаться" }),
    ).toHaveAttribute("href", "#enroll");
  });

  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: "Открыть меню" });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("dialog", { name: "Мобильная навигация" }),
    ).toBeInTheDocument();

    const dialog = screen.getByRole("dialog", {
      name: "Мобильная навигация",
    });
    await user.click(screen.getByRole("button", { name: "Закрыть меню" }));
    expect(dialog).not.toBeInTheDocument();
  });

  it("locks scrolling, closes on Escape and restores trigger focus", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: "Открыть меню" });
    trigger.focus();
    await user.click(trigger);

    expect(document.body.style.overflow).toBe("hidden");
    const dialog = screen.getByRole("dialog", {
      name: "Мобильная навигация",
    });
    expect(
      within(dialog).getByRole("link", { name: "Обучение" }),
    ).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(dialog).not.toBeInTheDocument();

    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it("keeps a compact telephone action available on tablet widths", () => {
    renderWithEnrollment(<SiteHeader />);

    const telephoneActions = screen.getAllByRole("link", {
      name: "Позвонить в автошколу",
    });

    expect(
      telephoneActions.find((action) =>
        action.classList.contains("md:grid"),
      ),
    ).toBeInTheDocument();
  });
});
