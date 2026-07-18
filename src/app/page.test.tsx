import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CookieConsentProvider } from "@/components/cookie-consent-provider";
import Home from "./page";

describe("Home", () => {
  it("uses one main landmark for the complete page experience", () => {
    render(
      <CookieConsentProvider>
        <Home />
      </CookieConsentProvider>,
    );

    const main = screen.getByRole("main");

    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(within(main).getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      within(main).getByRole("region", { name: "Контакты" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Перейти к содержанию" }),
    ).toHaveAttribute("href", "#main-content");
  });
});
