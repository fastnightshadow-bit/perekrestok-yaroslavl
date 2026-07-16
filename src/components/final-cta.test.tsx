import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { FinalCta } from "./final-cta";

describe("FinalCta", () => {
  it("offers enrollment through the shared flow and a direct call", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<FinalCta />);

    const section = screen.getByRole("region", {
      name: "Сделайте первый шаг к водительским правам уже сегодня",
    });

    await user.click(
      within(section).getByRole("button", { name: "Записаться" }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Заявка с финального экрана",
    );
    expect(
      within(section).getByRole("link", { name: "Позвонить" }),
    ).toHaveAttribute("href", "tel:+74852700303");
  });
});
