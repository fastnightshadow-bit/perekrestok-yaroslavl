import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("shared enrollment flow", () => {
  it("opens consultation explicitly from the Hero trigger", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(
      screen.getByRole("link", { name: "Записаться на обучение" }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Консультация по обучению",
    );
  });

  it("opens the same modal with the selected tariff", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const pricingSection = screen.getByRole("region", {
      name: "Понятная стоимость без скрытых платежей",
    });
    const fullCourseTariff = within(pricingSection).getByRole("article", {
      name: "Полный курс категории B",
    });
    await user.click(
      within(fullCourseTariff).getByRole("button", { name: "Записаться" }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Полный курс категории B",
    );
  });

  it("does not intercept unrelated hash links at document level", async () => {
    const user = userEvent.setup();
    const unrelatedLink = document.createElement("a");
    unrelatedLink.href = "#enroll";
    unrelatedLink.textContent = "Обычная якорная ссылка";
    document.body.append(unrelatedLink);

    render(<Home />);
    await user.click(unrelatedLink);

    expect(
      screen.queryByRole("dialog", { name: "Заявка на обучение" }),
    ).not.toBeInTheDocument();

    unrelatedLink.remove();
  });
});
