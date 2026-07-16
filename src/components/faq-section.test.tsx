import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FaqSection } from "./faq-section";

describe("FaqSection", () => {
  it("shows all six questions", () => {
    render(<FaqSection />);

    expect(
      screen.getByRole("region", { name: "Частые вопросы" }),
    ).toBeInTheDocument();

    for (const question of [
      "Сколько длится обучение?",
      "Можно ли оплачивать частями?",
      "Какие документы нужны?",
      "Когда начинается обучение?",
      "Можно ли выбрать инструктора?",
      "Что входит в стоимость?",
    ]) {
      expect(
        screen.getByRole("button", { name: question }),
      ).toBeInTheDocument();
    }
  });

  it("keeps only one answer open at a time", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const durationQuestion = screen.getByRole("button", {
      name: "Сколько длится обучение?",
    });
    const paymentQuestion = screen.getByRole("button", {
      name: "Можно ли оплачивать частями?",
    });

    expect(durationQuestion).toHaveAttribute("aria-expanded", "true");
    expect(paymentQuestion).toHaveAttribute("aria-expanded", "false");

    await user.click(paymentQuestion);

    expect(durationQuestion).toHaveAttribute("aria-expanded", "false");
    expect(paymentQuestion).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/разделить стоимость обучения/i),
    ).toBeInTheDocument();
  });
});
