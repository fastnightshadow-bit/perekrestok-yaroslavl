import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { FleetSection } from "./fleet-section";

describe("FleetSection", () => {
  it("shows the four verified training-car models", () => {
    renderWithEnrollment(<FleetSection />);

    const section = screen.getByRole("region", { name: "Автопарк" });
    expect(
      within(section).getAllByRole("article"),
    ).toHaveLength(4);

    for (const model of [
      "Volkswagen Polo",
      "Renault Logan II",
      "Lada Granta",
      "Lada Largus",
    ]) {
      expect(
        within(section).getByRole("article", { name: model }),
      ).toBeInTheDocument();
    }

    expect(within(section).queryByText(/МКПП|АКПП/)).not.toBeInTheDocument();
  });

  it("passes the selected car to the shared enrollment flow", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<FleetSection />);

    const car = screen.getByRole("article", { name: "Volkswagen Polo" });
    await user.click(
      within(car).getByRole("button", { name: "Записаться" }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Автомобиль: Volkswagen Polo",
    );
  });

  it("offers consultation and a direct telephone action", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<FleetSection />);

    await user.click(
      screen.getByRole("button", { name: "Получить консультацию" }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Консультация по обучению",
    );
    expect(
      within(
        screen.getByRole("region", { name: "Автопарк" }),
      ).getByRole("link", { name: "Позвонить" }),
    ).toHaveAttribute("href", "tel:+74852700303");
  });

  it("shows an empty state when cars are unavailable", () => {
    renderWithEnrollment(<FleetSection items={[]} />);

    expect(
      screen.getByRole("heading", {
        name: "Автомобили временно недоступны",
      }),
    ).toBeInTheDocument();
  });
});
