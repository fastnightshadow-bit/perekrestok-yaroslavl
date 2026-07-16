import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeLoadingSkeleton } from "./home-loading-skeleton";

describe("HomeLoadingSkeleton", () => {
  it("announces loading and reserves the first screen geometry", () => {
    render(<HomeLoadingSkeleton />);

    expect(
      screen.getByRole("status", { name: "Загружаем страницу" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-media-skeleton")).toBeInTheDocument();
    expect(screen.getAllByTestId("benefit-skeleton")).toHaveLength(4);
    expect(
      screen.getByTestId("loading-skeleton-content"),
    ).toHaveAttribute("aria-hidden", "true");
  });
});
