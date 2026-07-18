import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactSection } from "./contact-section";

const { submitLeadMock } = vi.hoisted(() => ({
  submitLeadMock: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/leads/client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/leads/client")>(
    "@/lib/leads/client",
  );
  return { ...actual, submitLead: submitLeadMock };
});

describe("ContactSection", () => {
  it("shows contact methods and the interactive Yandex map", () => {
    render(<ContactSection />);

    expect(screen.getByText("+7 (4852) 70-03-03")).toBeInTheDocument();
    expect(screen.getByText("+7 (930) 100-03-03")).toBeInTheDocument();
    expect(screen.getByText("perekrestok.76@yandex.ru")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Построить маршрут" }),
    ).toHaveAttribute("href", expect.stringContaining("yandex"));

    const map = screen.getByTitle(
      "Интерактивная карта автошколы «Перекрёсток»",
    );
    expect(map).toHaveAttribute("loading", "lazy");
    expect(map).toHaveAttribute("src", expect.stringContaining("oid=1387073255"));
    expect(map).toHaveAttribute("src", expect.stringContaining("mode=search"));
    expect(map).toHaveAttribute("src", expect.stringContaining("ol=biz"));
    expect(
      screen.getByRole("link", { name: "Открыть в Яндекс Картах" }),
    ).toHaveAttribute("target", "_blank");
  });

  it("sends the shared contact form through the leads endpoint", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "+7 999 123-45-67");
    await user.type(
      screen.getByLabelText("Комментарий"),
      "Хочу заниматься вечером",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Записаться" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Заявка отправлена",
    );
    expect(submitLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        comment: "Хочу заниматься вечером",
        source: "contacts",
        type: "contact",
      }),
    );
  });
});
