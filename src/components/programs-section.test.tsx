import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { ProgramsSection } from "./programs-section";

describe("ProgramsSection", () => {
  it("shows four verified programs with working routes", () => {
    renderWithEnrollment(<ProgramsSection />);

    expect(
      screen.getByRole("heading", { name: "Выберите программу обучения" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Временные данные")).not.toBeInTheDocument();

    const expectedRoutes = [
      ["Полный курс категории B", "/programs/category-b"],
      ["Теоретическая подготовка", "/programs/theory"],
      ["Практическое вождение", "/programs/driving-practice"],
      ["Дополнительное практическое занятие", "/programs/additional-lesson"],
    ] as const;

    for (const [name, href] of expectedRoutes) {
      const card = screen.getByRole("article", { name });
      expect(
        within(card).getByRole("link", { name: "Посмотреть программу" }),
      ).toHaveAttribute("href", href);
    }

    expect(
      screen.getByRole("link", { name: "Все программы" }),
    ).toHaveAttribute("href", "/programs");
  });

  it("passes the selected program to the existing enrollment flow", async () => {
    const user = userEvent.setup();
    renderWithEnrollment(<ProgramsSection />);

    const practiceCard = screen.getByRole("article", {
      name: "Практическое вождение",
    });
    await user.click(
      within(practiceCard).getByRole("button", { name: "Записаться" }),
    );

    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Практическое вождение",
    );
  });

  it("shows an empty state when programs are unavailable", () => {
    renderWithEnrollment(<ProgramsSection items={[]} />);

    expect(
      screen.getByRole("heading", {
        name: "Программы временно недоступны",
      }),
    ).toBeInTheDocument();
  });

  it("stacks long program actions so neither button is clipped", () => {
    renderWithEnrollment(<ProgramsSection />);

    const card = screen.getByRole("article", {
      name: "Полный курс категории B",
    });
    const enrollButton = within(card).getByRole("button", {
      name: "Записаться",
    });
    const actionGroup = enrollButton.parentElement;

    expect(actionGroup).toHaveClass("flex-col");
    expect(actionGroup).not.toHaveClass("sm:flex-row");
  });
});
