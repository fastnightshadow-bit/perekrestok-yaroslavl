import { render, screen, within } from "@testing-library/react";
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
  it("shows every verified tariff and its exact price", () => {
    renderWithEnrollment(<PricingSection />);

    expect(
      screen.getByRole("heading", {
        name: "Понятная стоимость без скрытых платежей",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Выберите подходящий формат обучения. Возможна оплата частями.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Полный курс категории B" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Теоретическая подготовка" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Практическое вождение" })).toBeInTheDocument();
    expect(screen.getByText("53 800 ₽")).toBeInTheDocument();
    expect(screen.getByText("12 000 ₽")).toBeInTheDocument();
    expect(screen.getByText("41 800 ₽")).toBeInTheDocument();
    expect(screen.queryByText("Временная цена")).not.toBeInTheDocument();
    expect(screen.getByText(/1 100 ₽ за 1,5 часа/)).toBeInTheDocument();
    expect(screen.getByText(/экзамен ГИБДД оплачиваются отдельно/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Не уверены, какой тариф выбрать? Получите консультацию",
      ),
    ).toBeInTheDocument();
  });

  it("uses a telephone link for the consultation call action", () => {
    renderWithEnrollment(<PricingSection />);

    const section = screen.getByRole("region", {
      name: "Понятная стоимость без скрытых платежей",
    });
    expect(
      within(section).getByRole("link", { name: "Позвонить" }),
    ).toHaveAttribute("href", "tel:+74852700303");
  });

  it("keeps the popular label in normal document flow", () => {
    renderWithEnrollment(<PricingSection />);

    const card = screen.getByRole("article", {
      name: "Полный курс категории B",
    });
    const badge = within(card).getByText("Популярный выбор");

    expect(badge).not.toHaveClass("absolute");
  });
});
