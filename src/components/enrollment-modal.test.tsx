import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EnrollmentModal } from "./enrollment-modal";

const { submitLeadMock } = vi.hoisted(() => ({
  submitLeadMock: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/leads/client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/leads/client")>(
    "@/lib/leads/client",
  );
  return { ...actual, submitLead: submitLeadMock };
});

describe("EnrollmentModal", () => {
  it("shows the selected program, labels fields, focuses the name and locks scrolling", async () => {
    const onClose = vi.fn();

    render(
      <EnrollmentModal
        isOpen
        onClose={onClose}
        selectedProgram="Категория B — АКПП"
        source="pricing"
      />,
    );

    expect(
      screen.getByRole("dialog", { name: "Заявка на обучение" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Категория B — АКПП",
    );
    expect(screen.getByLabelText("Телефон")).toHaveAttribute("type", "tel");

    await waitFor(() => expect(screen.getByLabelText("Имя")).toHaveFocus());
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("passes the opening section to the lead", async () => {
    const user = userEvent.setup();
    render(
      <EnrollmentModal
        isOpen
        onClose={vi.fn()}
        selectedProgram="Консультация по обучению"
        source="hero"
      />,
    );

    await user.type(screen.getByLabelText("Имя"), "Илья");
    await user.type(screen.getByLabelText("Телефон"), "+7 999 123-45-67");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Отправить заявку" }));

    await waitFor(() => expect(submitLeadMock).toHaveBeenCalled());
    expect(submitLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({ source: "hero" }),
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <EnrollmentModal
        isOpen
        onClose={onClose}
        selectedProgram="Категория B — МКПП"
      />,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("closes when the backdrop itself is clicked", () => {
    const onClose = vi.fn();

    render(
      <EnrollmentModal
        isOpen
        onClose={onClose}
        selectedProgram="Дополнительные занятия"
      />,
    );

    fireEvent.mouseDown(screen.getByTestId("enrollment-modal-backdrop"));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
