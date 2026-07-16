import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ContactSection } from "./contact-section";

describe("ContactSection", () => {
  it("shows contact methods, route action and a map placeholder", () => {
    render(<ContactSection />);

    const section = screen.getByRole("region", { name: "Контакты" });
    expect(section).toBeInTheDocument();
    expect(screen.getByText("+7 (4852) 70-03-03")).toBeInTheDocument();
    expect(screen.getByText("+7 (930) 100-03-03")).toBeInTheDocument();
    expect(screen.getByText("perekrestok.76@yandex.ru")).toBeInTheDocument();
    expect(
      screen.getAllByText(/Республиканская, д\. 3, корп\. 1, оф\. 405/i),
    ).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Построить маршрут" }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("yandex"),
    );
    expect(
      screen.getByRole("region", { name: "Карта автошколы" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/временные данные/i),
    ).not.toBeInTheDocument();
  });

  it("uses the shared form fields and prepares a contact request", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "+7 999 123-45-67");
    await user.type(
      screen.getByLabelText("Комментарий"),
      "Хочу заниматься вечером",
    );
    await user.click(
      screen.getByRole("button", { name: "Записаться" }),
    );

    expect(
      screen.getByRole("status"),
    ).toHaveTextContent("Данные формы сохранены на этой странице");
    expect(screen.getByRole("status")).toHaveTextContent(
      "отправка будет доступна после подключения сервера",
    );
  });
});
