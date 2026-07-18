import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ReviewsSection } from "./reviews-section";

describe("ReviewsSection", () => {
  it("shows published reviews and the verified Yandex Maps rating", () => {
    render(<ReviewsSection />);

    const section = screen.getByRole("region", {
      name: "Отзывы учеников",
    });

    expect(within(section).getByText("4,8")).toBeInTheDocument();
    expect(within(section).getByText(/55 оценок/i)).toBeInTheDocument();
    expect(within(section).queryByText("Временные данные")).not.toBeInTheDocument();
    expect(within(section).getAllByRole("article")).toHaveLength(9);

    for (const name of [
      "Евгения",
      "Влад",
      "Валентина",
      "Светлана",
      "Денис",
      "Татьяна",
      "Максим",
      "Вероника",
      "Елена",
    ]) {
      expect(within(section).getByText(name)).toBeInTheDocument();
    }

    expect(within(section).queryAllByRole("img")).toHaveLength(0);
  });

  it("provides lightweight review navigation and a Yandex Maps link", () => {
    render(<ReviewsSection />);

    expect(
      screen.getByRole("button", { name: "Предыдущие отзывы" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Следующие отзывы" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Смотреть все отзывы" }),
    ).toHaveAttribute(
      "href",
      "https://yandex.ru/maps/org/perekrestok/1387073255/reviews/",
    );
  });

  it("shows an empty state when reviews are unavailable", () => {
    render(<ReviewsSection items={[]} />);

    expect(
      screen.getByRole("heading", {
        name: "Отзывы временно недоступны",
      }),
    ).toBeInTheDocument();
  });
});
