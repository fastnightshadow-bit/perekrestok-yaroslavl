import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ConsentPage from "./consent/page";
import CookiesPage from "./cookies/page";
import PrivacyPage from "./privacy/page";

describe("legal pages", () => {
  it("publishes the verified operator details in the privacy policy", () => {
    render(<PrivacyPage />);

    expect(
      screen.getByRole("heading", {
        name: "Политика в отношении обработки персональных данных",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Общество с ограниченной ответственностью Автошкола «Перекрёсток»",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/ИНН 7620006816/)).toBeInTheDocument();
    expect(screen.getByText(/ОГРН 1177627032880/)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "perekrestok.76@yandex.ru" })[0],
    ).toHaveAttribute("href", "mailto:perekrestok.76@yandex.ru");
  });

  it("publishes consent as a separate document with a defined term", () => {
    render(<ConsentPage />);

    expect(
      screen.getByRole("heading", {
        name: "Согласие на обработку персональных данных",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/действует в течение одного года/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/имя, номер телефона, выбранную программу обучения/i),
    ).toBeInTheDocument();
  });

  it("publishes a separate cookie policy for the map and optional analytics", () => {
    render(<CookiesPage />);

    expect(
      screen.getByRole("heading", { name: "Политика использования cookie" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "3. Яндекс Карты" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "4. Яндекс Метрика" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/только после согласия/i)).toBeInTheDocument();
  });
});
