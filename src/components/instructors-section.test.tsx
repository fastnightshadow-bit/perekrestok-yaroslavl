import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { InstructorsSection } from "./instructors-section";

const verifiedInstructors = [
  ["Сергей Погодин", "Volkswagen Polo"],
  ["Шестов Владимир", "Renault Logan II"],
  ["Николай Мальцев", "Lada Granta"],
  ["Николай Лобанов", "Lada Granta"],
  ["Эдуард Жук", "Lada Granta"],
  ["Валентин Кривенко", "Lada Granta"],
  ["Игорь Прохоров", "Lada Largus"],
] as const;

describe("InstructorsSection", () => {
  it("shows the seven verified instructors without invented ratings or experience", () => {
    renderWithEnrollment(<InstructorsSection />);

    expect(
      screen.getByRole("heading", { name: "Наши инструкторы" }),
    ).toBeInTheDocument();

    for (const [name, vehicle] of verifiedInstructors) {
      const card = screen.getByRole("article", { name });
      expect(card).toBeInTheDocument();
      expect(within(card).getByText(vehicle)).toBeInTheDocument();
    }

    expect(screen.queryByText(/Стаж \d+ лет/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^4\.[89]$/)).not.toBeInTheDocument();
  });

  it("portals accessible details to the body and restores focus on Escape", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<InstructorsSection />);

    const card = screen.getByRole("article", { name: "Сергей Погодин" });
    const trigger = within(card).getByRole("button", { name: "Подробнее" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", {
      name: "Инструктор Сергей Погодин",
    });
    expect(dialog.parentElement).toBe(document.body);
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(dialog).not.toBeInTheDocument();
    await waitFor(() => {
      expect(document.body.style.overflow).toBe("");
      expect(trigger).toHaveFocus();
    });
  });

  it("closes the portaled dialog when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<InstructorsSection />);

    const card = screen.getByRole("article", { name: "Николай Мальцев" });
    await user.click(within(card).getByRole("button", { name: "Подробнее" }));

    const dialog = screen.getByRole("dialog", {
      name: "Инструктор Николай Мальцев",
    });
    await user.click(dialog);
    expect(dialog).not.toBeInTheDocument();
  });

  it("passes the chosen instructor to the shared enrollment flow", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<InstructorsSection />);

    const card = screen.getByRole("article", { name: "Шестов Владимир" });
    await user.click(within(card).getByRole("button", { name: "Подробнее" }));
    await user.click(
      screen.getByRole("button", {
        name: "Записаться именно к этому инструктору",
      }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Инструктор: Шестов Владимир",
    );
  });

  it("shows an empty state when instructors are unavailable", () => {
    renderWithEnrollment(<InstructorsSection items={[]} />);

    expect(
      screen.getByRole("heading", {
        name: "Инструкторы временно недоступны",
      }),
    ).toBeInTheDocument();
  });
});
