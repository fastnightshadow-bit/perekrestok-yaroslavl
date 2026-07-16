import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ProgramQuiz } from "./program-quiz";

async function reachResult(
  user: ReturnType<typeof userEvent.setup>,
  goal = "Полный курс категории B",
) {
  await user.click(screen.getByRole("radio", { name: goal }));
  await user.click(screen.getByRole("button", { name: "Продолжить" }));
  await user.click(screen.getByRole("radio", { name: "Вечером" }));
  await user.click(screen.getByRole("button", { name: "Продолжить" }));
  await user.click(screen.getByRole("radio", { name: "Никогда не водил" }));
  await user.click(screen.getByRole("button", { name: "Продолжить" }));
}

describe("ProgramQuiz", () => {
  it("requires an answer before continuing and shows progress", async () => {
    const user = userEvent.setup();
    render(<ProgramQuiz />);

    expect(screen.getByText("Шаг 1 из 3")).toBeInTheDocument();
    const continueButton = screen.getByRole("button", {
      name: "Продолжить",
    });
    expect(continueButton).toBeDisabled();

    await user.click(
      screen.getByRole("radio", { name: "Полный курс категории B" }),
    );
    expect(continueButton).toBeEnabled();
  });

  it("preserves the selected answer when moving back", async () => {
    const user = userEvent.setup();
    render(<ProgramQuiz />);

    const fullCourseOption = screen.getByRole("radio", {
      name: "Полный курс категории B",
    });
    await user.click(fullCourseOption);
    await user.click(screen.getByRole("button", { name: "Продолжить" }));
    await user.click(screen.getByRole("button", { name: "Назад" }));

    expect(
      screen.getByRole("radio", { name: "Полный курс категории B" }),
    ).toBeChecked();
  });

  it("shows a personalized recommendation after three answers", async () => {
    const user = userEvent.setup();
    render(<ProgramQuiz />);

    await reachResult(user);

    expect(
      screen.getByRole("heading", {
        name: "Вам подойдёт Полный курс категории B",
      }),
    ).toBeInTheDocument();
  });

  it("validates the telephone before submission", async () => {
    const user = userEvent.setup();
    const submitLead = vi.fn();
    render(<ProgramQuiz submitLead={submitLead} />);
    await reachResult(user);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "12345");
    await user.click(
      screen.getByRole("button", { name: "Получить консультацию" }),
    );

    expect(
      screen.getByText("Введите корректный номер телефона"),
    ).toBeInTheDocument();
    expect(submitLead).not.toHaveBeenCalled();
  });

  it("submits prepared answers without reloading and shows success", async () => {
    const user = userEvent.setup();
    let resolveRequest: (() => void) | undefined;
    const submitLead = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    render(<ProgramQuiz submitLead={submitLead} />);
    await reachResult(user);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(
      screen.getByLabelText("Телефон"),
      "+7 (999) 123-45-67",
    );
    await user.click(
      screen.getByRole("button", { name: "Получить консультацию" }),
    );

    expect(
      screen.getByRole("button", { name: "Отправляем..." }),
    ).toBeDisabled();
    expect(submitLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Илья",
        phone: "+7 (999) 123-45-67",
        recommendedProgram: "Полный курс категории B",
        answers: expect.objectContaining({
          goal: "full-course",
          schedule: "evening",
          experience: "never",
        }),
      }),
    );

    resolveRequest?.();
    expect(
      await screen.findByRole("heading", { name: "Заявка принята" }),
    ).toBeInTheDocument();
  });

  it("shows an error state when submission fails", async () => {
    const user = userEvent.setup();
    const submitLead = vi.fn().mockRejectedValue(new Error("network"));
    render(<ProgramQuiz submitLead={submitLead} />);
    await reachResult(user);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(
      screen.getByLabelText("Телефон"),
      "+7 (999) 123-45-67",
    );
    await user.click(
      screen.getByRole("button", { name: "Получить консультацию" }),
    );

    expect(
      await screen.findByText(
        "Не удалось отправить заявку. Попробуйте ещё раз.",
      ),
    ).toBeInTheDocument();
  });
});
