import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { BenefitsSection } from "./benefits-section";
import { PricingSection } from "./pricing-section";

describe("BenefitsSection", () => {
  it("shows the four trust-building advantages", () => {
    render(<BenefitsSection />);

    expect(
      screen.getByRole("heading", { name: "Почему выбирают Перекрёсток" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Обучение в центре Ярославля" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Короткие сроки обучения" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Опытные инструкторы" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Экзамен на знакомом автомобиле",
      }),
    ).toBeInTheDocument();
  });
});

describe("PricingSection", () => {
  it("presents category B and the two useful supporting services", () => {
    renderWithEnrollment(<PricingSection />);

    expect(
      screen.getByRole("heading", { name: "Обучение категории B" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Категория B — МКПП / АКПП" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Восстановление навыков" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Переход из другой автошколы" }),
    ).toBeInTheDocument();
    expect(screen.getByText("47 600 ₽")).toBeInTheDocument();
    expect(screen.getByText("Теория — 14 000 ₽")).toBeInTheDocument();
    expect(screen.getByText("28 занятий по 90 минут — 1 200 ₽ каждое")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", {
        name: "Узнать стоимость и свободные места",
      }),
    ).toHaveLength(3);
    expect(screen.queryByText("Все программы")).not.toBeInTheDocument();
    expect(screen.queryByText("Посмотреть программу")).not.toBeInTheDocument();
    expect(
      screen.getByText(/внутренний экзамен — 2 000 ₽/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/первый экзамен в ГИБДД — 2 500 ₽/i),
    ).toBeInTheDocument();
  });

  it("passes the selected service to the shared consultation form", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<PricingSection />);

    const automaticCard = screen.getByRole("article", {
      name: "Восстановление навыков",
    });
    await user.click(
      within(automaticCard).getByRole("button", {
        name: "Узнать стоимость и свободные места",
      }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Восстановление навыков",
    );
  });

  it("uses a telephone link for the consultation call action", () => {
    renderWithEnrollment(<PricingSection />);

    const section = screen.getByRole("region", {
      name: "Обучение категории B",
    });
    expect(
      within(section).getByRole("link", { name: "Позвонить" }),
    ).toHaveAttribute("href", "tel:+74852700303");
  });
});
