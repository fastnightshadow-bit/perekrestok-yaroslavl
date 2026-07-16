import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders a neutral message and an optional action", () => {
    render(
      <EmptyState
        action={<a href="#contacts">Связаться</a>}
        description="Администратор поможет уточнить доступные варианты."
        title="Данные временно недоступны"
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Данные временно недоступны",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Администратор поможет уточнить доступные варианты.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Связаться" }),
    ).toHaveAttribute("href", "#contacts");
  });
});
