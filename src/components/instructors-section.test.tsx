import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { instructors } from "@/data/instructors";
import { InstructorsSection } from "./instructors-section";

const verifiedInstructors = [
  ["Погодин Сергей Владимирович", "С 1999 года"],
  ["Шестов Владимир Владимирович", "С 2007 года"],
  ["Мальцев Николай Анатольевич", "С 2014 года"],
  ["Лобанов Николай Николаевич", "С 2014 года"],
  ["Жук Эдуард Алексеевич", "С 2007 года"],
  ["Кривенко Валентин Николаевич", "С 2014 года"],
  ["Прохоров Игорь Юрьевич", "С 2002 года"],
  ["Зайцев Алексей Валерьевич", "С 2009 года"],
] as const;

describe("InstructorsSection", () => {
  it("cache-busts every studio portrait so replaced photos cannot stay stale", () => {
    for (const instructor of instructors) {
      expect(instructor.image).toMatch(/-studio-20260718\.jpg$/);
    }
  });

  it("uses the cache-busted studio portrait for Alexey Zaytsev", () => {
    const alexey = instructors.find((instructor) => instructor.id === "alexey-zaytsev");

    expect(alexey?.image).toContain(
      "/images/instructors/alexey-zaytsev-studio-20260718.jpg",
    );
  });

  it("shows all eight instructors and the experience published by the school", () => {
    renderWithEnrollment(<InstructorsSection />);

    expect(
      screen.getByRole("heading", { name: "Наши инструкторы" }),
    ).toBeInTheDocument();

    for (const [name, experience] of verifiedInstructors) {
      const card = screen.getByRole("article", { name });
      expect(card).toBeInTheDocument();
      expect(within(card).getByText(experience)).toBeInTheDocument();
    }

    expect(screen.queryByText(/^4\.[89]$/)).not.toBeInTheDocument();
  });

  it("portals accessible details to the body and restores focus on Escape", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<InstructorsSection />);

    const card = screen.getByRole("article", {
      name: "Погодин Сергей Владимирович",
    });
    const trigger = within(card).getByRole("button", { name: "Подробнее" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", {
      name: "Инструктор Погодин Сергей Владимирович",
    });
    expect(dialog.parentElement).toBe(document.body);
    expect(document.body.style.overflow).toBe("hidden");
    expect(
      within(dialog).getByRole("button", {
        name: "Записаться именно к этому инструктору",
      }),
    ).toHaveClass("whitespace-normal");

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

    const card = screen.getByRole("article", {
      name: "Мальцев Николай Анатольевич",
    });
    await user.click(within(card).getByRole("button", { name: "Подробнее" }));

    const dialog = screen.getByRole("dialog", {
      name: "Инструктор Мальцев Николай Анатольевич",
    });
    await user.click(dialog);
    expect(dialog).not.toBeInTheDocument();
  });

  it("passes the chosen instructor to the shared enrollment flow", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<InstructorsSection />);

    const card = screen.getByRole("article", {
      name: "Шестов Владимир Владимирович",
    });
    await user.click(within(card).getByRole("button", { name: "Подробнее" }));
    await user.click(
      screen.getByRole("button", {
        name: "Записаться именно к этому инструктору",
      }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Инструктор: Шестов Владимир Владимирович",
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
