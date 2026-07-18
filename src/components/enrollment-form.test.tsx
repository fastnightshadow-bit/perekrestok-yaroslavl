import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EnrollmentForm } from "./enrollment-form";

describe("EnrollmentForm", () => {
  it("rejects an invalid telephone number with an accessible error", async () => {
    const user = userEvent.setup();
    const submitLeadOverride = vi.fn();
    render(<EnrollmentForm submitLeadOverride={submitLeadOverride} />);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "123");
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Введите корректный номер телефона",
    );
    expect(screen.getByLabelText("Телефон")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(submitLeadOverride).not.toHaveBeenCalled();
  });

  it("requires explicit personal-data consent before submission", async () => {
    const user = userEvent.setup();
    const submitLeadOverride = vi.fn();
    render(<EnrollmentForm submitLeadOverride={submitLeadOverride} />);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "+7 (999) 123-45-67");
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Подтвердите согласие на обработку персональных данных",
    );
    expect(submitLeadOverride).not.toHaveBeenCalled();
  });

  it("sends the selected program and shows a success state", async () => {
    const user = userEvent.setup();
    const submitLeadOverride = vi.fn().mockResolvedValue(undefined);
    const onSubmitted = vi.fn();
    render(
      <EnrollmentForm
        onSubmitted={onSubmitted}
        selectedProgram="Категория B — АКПП"
        showProgram
        source="pricing"
        submitLeadOverride={submitLeadOverride}
      />,
    );

    await user.type(screen.getByLabelText("Имя"), " Илья ");
    await user.type(screen.getByLabelText("Телефон"), "+7 (999) 123-45-67");
    await user.click(
      screen.getByRole("checkbox", { name: /согласие на обработку/i }),
    );
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));

    await waitFor(() => expect(submitLeadOverride).toHaveBeenCalledTimes(1));
    expect(submitLeadOverride).toHaveBeenCalledWith(
      expect.objectContaining({
        consent: true,
        interest: "Категория B — АКПП",
        name: "Илья",
        phone: "+7 (999) 123-45-67",
        source: "pricing",
        type: "enrollment",
      }),
    );
    expect(onSubmitted).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Илья", program: "Категория B — АКПП" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Заявка отправлена");
  });

  it("keeps entered data and offers a phone fallback after a delivery error", async () => {
    const user = userEvent.setup();
    const submitLeadOverride = vi.fn().mockRejectedValue(new Error("offline"));
    render(<EnrollmentForm submitLeadOverride={submitLeadOverride} />);

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "+7 (999) 123-45-67");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Не удалось отправить заявку",
    );
    expect(screen.getByLabelText("Имя")).toHaveValue("Илья");
    expect(screen.getByLabelText("Телефон")).toHaveValue(
      "+7 (999) 123-45-67",
    );
    expect(screen.getByRole("link", { name: /позвонить/i })).toHaveAttribute(
      "href",
      "tel:+74852700303",
    );
  });
});
