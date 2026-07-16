import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ReviewsPlaceholderPage from "./page";

describe("ReviewsPlaceholderPage", () => {
  it("describes the published reviews accurately without demo wording", () => {
    render(<ReviewsPlaceholderPage />);

    expect(
      screen.getByText(/На главной странице уже собраны опубликованные отзывы/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/тестовые отзывы/i)).not.toBeInTheDocument();
  });
});
