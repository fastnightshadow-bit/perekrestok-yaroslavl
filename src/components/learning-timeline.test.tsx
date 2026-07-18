import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { LearningTimeline } from "./learning-timeline";

describe("LearningTimeline", () => {
  it("shows the detailed seven-stage path and medical specialists", () => {
    const { container } = renderWithEnrollment(<LearningTimeline />);

    const stages = [
      "Подайте заявку на обучение",
      "Пройдите медкомиссию",
      "Изучайте теорию очно или онлайн",
      "Учитесь водить с инструктором",
      "Пройдите внутренний экзамен",
      "Сдайте экзамен в ГАИ",
      "Получите водительское удостоверение",
    ];

    for (const stage of stages) {
      expect(screen.getByRole("heading", { name: stage })).toBeInTheDocument();
    }

    for (const doctor of [
      "Психиатр",
      "Психиатр-нарколог",
      "Офтальмолог",
      "Терапевт",
    ]) {
      expect(screen.getByText(doctor)).toBeInTheDocument();
    }

    expect(screen.getByRole("list", { name: "Этапы обучения" })).toHaveClass(
      "lg:grid-cols-2",
    );

    const timelineSteps = container.querySelectorAll("ol > li");
    expect(timelineSteps).toHaveLength(7);
    expect(timelineSteps[0]).toHaveClass("before:-bottom-9");
    expect(timelineSteps[6]).toHaveClass("last:before:hidden");
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
