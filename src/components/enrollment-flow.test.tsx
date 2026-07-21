import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { CookieConsentProvider } from "@/components/cookie-consent-provider";

function renderHome() {
  return render(
    <CookieConsentProvider>
      <Home />
    </CookieConsentProvider>,
  );
}

describe("shared enrollment flow", () => {
  it("opens consultation explicitly from the Hero trigger", async () => {
    const user = userEvent.setup();
    renderHome();

    await user.click(
      screen.getByRole("link", { name: "Получить консультацию" }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Консультация по обучению",
    );
  });

  it("opens the same modal with the selected category B service", async () => {
    const user = userEvent.setup();
    renderHome();

    const pricingSection = screen.getByRole("region", {
      name: "Обучение категории B",
    });
    const automaticOption = within(pricingSection).getByRole("article", {
      name: "Категория B — МКПП / АКПП",
    });
    await user.click(
      within(automaticOption).getByRole("button", {
        name: "Узнать стоимость и свободные места",
      }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Категория B — МКПП / АКПП",
    );
  });

  it("does not intercept unrelated hash links at document level", async () => {
    const user = userEvent.setup();
    const unrelatedLink = document.createElement("a");
    unrelatedLink.href = "#enroll";
    unrelatedLink.textContent = "Обычная якорная ссылка";
    document.body.append(unrelatedLink);

    renderHome();
    await user.click(unrelatedLink);

    expect(
      screen.queryByRole("dialog", { name: "Заявка на обучение" }),
    ).not.toBeInTheDocument();

    unrelatedLink.remove();
  });
});
