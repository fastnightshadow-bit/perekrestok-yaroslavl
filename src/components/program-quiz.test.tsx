import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ProgramQuiz } from "./program-quiz";

async function reachResult(
  user: ReturnType<typeof userEvent.setup>,
  goal = "Автомобиль на механике",
) {
  await user.click(screen.getByRole("radio", { name: goal }));
  await user.click(screen.getByRole("button", { name: "Продолжить" }));
  await user.click(screen.getByRole("radio", { name: "Вечером" }));
  await user.click(screen.getByRole("button", { name: "Продолжить" }));
  await user.click(screen.getByRole("radio", { name: "Никогда не водил" }));
  await user.click(screen.getByRole("button", { name: "Продолжить" }));
}

describe("ProgramQuiz", () => {
  it("offers only verified category B transmission choices", () => {
    render(<ProgramQuiz />);

    expect(
      screen.getByRole("radio", { name: "Автомобиль на механике" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Автомобиль на автомате" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Пока не решил" })).toBeInTheDocument();
    expect(screen.queryByText(/мотоцикл/i)).not.toBeInTheDocument();
  });

  it("requires an answer and preserves it when moving back", async () => {
    const user = userEvent.setup();
    render(<ProgramQuiz />);

    const continueButton = screen.getByRole("button", { name: "Продолжить" });
    expect(continueButton).toBeDisabled();
    await user.click(
      screen.getByRole("radio", { name: "Автомобиль на автомате" }),
    );
    await user.click(continueButton);
    await user.click(screen.getByRole("button", { name: "Назад" }));
    expect(
      screen.getByRole("radio", { name: "Автомобиль на автомате" }),
    ).toBeChecked();
  });

  it("shows a personalized recommendation after three answers", async () => {
    const user = userEvent.setup();
    render(<ProgramQuiz />);
    await reachResult(user, "Автомобиль на автомате");

    expect(
      screen.getByRole("heading", {
        name: "Вам подойдёт Категория B — АКПП",
      }),
    ).toBeInTheDocument();
  });

  it("validates phone and explicit personal-data consent", async () => {
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

  it("submits the selected transmission and shows success", async () => {
    const user = userEvent.setup();
    const submitLead = vi.fn().mockResolvedValue(undefined);
    render(<ProgramQuiz submitLead={submitLead} />);
    await reachResult(user, "Автомобиль на механике");

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(
      screen.getByLabelText("Телефон"),
      "+7 (999) 123-45-67",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(
      screen.getByRole("button", { name: "Получить консультацию" }),
    );

    expect(submitLead).toHaveBeenCalledWith(
      expect.objectContaining({
        recommendedProgram: "Категория B — МКПП",
        answers: expect.objectContaining({ goal: "manual" }),
        website: "",
        formStartedAt: expect.any(Number),
      }),
    );
    expect(
      await screen.findByRole("heading", { name: "Заявка принята" }),
    ).toBeInTheDocument();
  });
});
