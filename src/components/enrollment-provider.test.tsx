import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  EnrollmentProvider,
  useEnrollment,
} from "./enrollment-provider";

function TestActions() {
  const { openEnrollment, openConsultation } = useEnrollment();

  return (
    <>
      <button onClick={() => openConsultation()} type="button">
        Консультация
      </button>
      <button
        onClick={() => openEnrollment("Категория B — АКПП")}
        type="button"
      >
        АКПП
      </button>
    </>
  );
}

function InvalidConsumer() {
  useEnrollment();
  return null;
}

describe("EnrollmentProvider", () => {
  it("opens one shared modal with an explicitly selected program", async () => {
    const user = userEvent.setup();
    render(
      <EnrollmentProvider>
        <TestActions />
      </EnrollmentProvider>,
    );

    await user.click(screen.getByRole("button", { name: "АКПП" }));

    expect(
      screen.getByRole("dialog", { name: "Заявка на обучение" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Категория B — АКПП",
    );
  });

  it("opens consultation and closes the shared modal", async () => {
    const user = userEvent.setup();
    render(
      <EnrollmentProvider>
        <TestActions />
      </EnrollmentProvider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Консультация" }),
    );
    expect(screen.getByLabelText("Выбранная программа")).toHaveValue(
      "Консультация по обучению",
    );

    const dialog = screen.getByRole("dialog", {
      name: "Заявка на обучение",
    });
    await user.click(
      screen.getByRole("button", { name: "Закрыть форму" }),
    );
    expect(dialog).not.toBeInTheDocument();
  });

  it("rejects consumers rendered outside the provider", () => {
    expect(() => render(<InvalidConsumer />)).toThrow(
      "useEnrollment must be used within EnrollmentProvider",
    );
  });
});
