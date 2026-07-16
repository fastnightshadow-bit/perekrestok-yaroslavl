import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("shows navigation, learning, contacts, social and document columns", () => {
    render(<SiteFooter />);

    for (const heading of [
      "Навигация",
      "Обучение",
      "Контакты",
      "Социальные сети",
      "Документы",
    ]) {
      expect(
        screen.getByRole("heading", { name: heading }),
      ).toBeInTheDocument();
    }

    expect(screen.getByText("Политика конфиденциальности")).toBeInTheDocument();
    expect(screen.getByText("Лицензия")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "ВКонтакте" }),
    ).toHaveAttribute("href", "https://vk.com/perekrestok76");
    expect(
      screen.getByRole("link", { name: "Политика конфиденциальности" }),
    ).toHaveAttribute("href", "https://perekrestok76.ru/politika");
    expect(
      screen.queryByText(/ссылки нужно заменить/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/Автошкола «Перекрёсток»/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/демонстрационный проект/i)).not.toBeInTheDocument();
    expect(screen.getByText("Обучение категории B · Ярославль")).toBeInTheDocument();
  });
});
