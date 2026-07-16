import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "./not-found";

describe("NotFound", () => {
  it("explains the missing page and provides useful navigation", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { name: "Страница не найдена" }),
    ).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Вернуться на главную" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: "Перейти к контактам" }),
    ).toHaveAttribute("href", "/#contacts");
  });
});
