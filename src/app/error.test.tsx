import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ErrorPage from "./error";

describe("ErrorPage", () => {
  it("offers recovery through reset and a home link", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();

    render(<ErrorPage error={new Error("boom")} reset={reset} />);

    expect(
      screen.getByRole("heading", { name: "Что-то пошло не так" }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Попробовать снова" }),
    );
    expect(reset).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("link", { name: "Вернуться на главную" }),
    ).toHaveAttribute("href", "/");
  });
});
