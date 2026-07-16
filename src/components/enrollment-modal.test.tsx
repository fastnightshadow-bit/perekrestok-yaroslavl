import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EnrollmentModal } from "./enrollment-modal";

describe("EnrollmentModal", () => {
  it("shows the selected program, labels fields, focuses the name and locks scrolling", async () => {
    const onClose = vi.fn();

    render(
      <EnrollmentModal
        isOpen
        onClose={onClose}
        selectedProgram="Категория B — АКПП"
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
