import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CookieConsentProvider } from "./cookie-consent-provider";
import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("shows navigation, learning, contacts, social and document columns", () => {
    render(
      <CookieConsentProvider>
        <SiteFooter />
      </CookieConsentProvider>,
    );

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

    expect(
      screen.getByText("Политика обработки персональных данных"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Согласие на обработку персональных данных"),
    ).toBeInTheDocument();
    expect(screen.getByText("Политика cookie")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Настройки cookie" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Лицензия")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "ВКонтакте" }),
    ).toHaveAttribute("href", "https://vk.com/perekrestok76");
    expect(
      screen.getByRole("link", { name: "Яндекс Карты" }),
    ).toHaveAttribute(
      "href",
      "https://yandex.ru/maps/org/perekrestok/1387073255/",
    );
    expect(
      screen.getByRole("link", {
        name: "Политика обработки персональных данных",
      }),
    ).toHaveAttribute("href", "/privacy");
    expect(
      screen.getByRole("link", {
        name: "Согласие на обработку персональных данных",
      }),
    ).toHaveAttribute("href", "/consent");
    expect(
      screen.getByRole("link", { name: "Политика cookie" }),
    ).toHaveAttribute("href", "/cookies");
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
