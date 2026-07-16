import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { LearningTimeline } from "./learning-timeline";

describe("LearningTimeline", () => {
  it("shows the complete seven-stage path", () => {
    renderWithEnrollment(<LearningTimeline />);

    expect(
      screen.getByRole("heading", { name: "Как проходит обучение" }),
    ).toBeInTheDocument();

    const stages = [
      "Оставляете заявку",
      "Консультация",
      "Заключение договора",
      "Изучение теории",
      "Практические занятия",
      "Экзамен",
      "Получение водительского удостоверения",
    ];

    for (const stage of stages) {
      expect(screen.getByRole("heading", { name: stage })).toBeInTheDocument();
    }
  });

  it("connects the CTA to enrollment and telephone actions", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<LearningTimeline />);

    const section = screen.getByRole("region", {
      name: "Как проходит обучение",
    });
    await user.click(
      within(section).getByRole("button", { name: "Записаться" }),
    );
    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Запись на обучение",
    );
    expect(
      within(section).getByRole("link", { name: "Позвонить" }),
    ).toHaveAttribute("href", "tel:+74852700303");
  });
});
