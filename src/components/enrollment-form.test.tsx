import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EnrollmentForm } from "./enrollment-form";

describe("EnrollmentForm", () => {
  it("rejects an invalid telephone number with an accessible error", async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();
    render(<EnrollmentForm onSubmitted={onSubmitted} />);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "123");
    await user.click(
      screen.getByRole("button", { name: "Отправить заявку" }),
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent("Введите корректный номер телефона");
    expect(screen.getByLabelText("Телефон")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(onSubmitted).not.toHaveBeenCalled();
  });

  it("submits normalized form values when the telephone is valid", async () => {
    const user = userEvent.setup();
    const onSubmitted = vi.fn();
    render(
      <EnrollmentForm
        onSubmitted={onSubmitted}
        selectedProgram="Категория B — АКПП"
        showProgram
      />,
    );

    await user.type(screen.getByLabelText("Имя"), " Илья ");
    await user.type(
      screen.getByLabelText("Телефон"),
      "+7 (999) 123-45-67",
    );
    await user.click(
      screen.getByRole("button", { name: "Отправить заявку" }),
    );

    expect(onSubmitted).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Илья",
        phone: "+7 (999) 123-45-67",
        program: "Категория B — АКПП",
      }),
    );
  });
});
