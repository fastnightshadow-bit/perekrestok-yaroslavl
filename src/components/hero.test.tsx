import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { Hero } from "./hero";

describe("Hero", () => {
  it("communicates the driving-school offer and price", () => {
    renderWithEnrollment(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: "Спокойно научим уверенно водить",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("47 600 ₽")).toBeInTheDocument();
    expect(
      screen.getByText(/Более 85% учеников сдают с первого раза/i),
    ).toBeInTheDocument();
  });

  it("provides primary and secondary conversion actions", () => {
    renderWithEnrollment(<Hero />);
    const content = within(screen.getByTestId("hero-content"));

    expect(
      content.getByRole("link", { name: "Получить консультацию" }),
    ).toHaveAttribute("href", "#enroll");
    expect(
      content.getByRole("link", { name: "Позвонить" }),
    ).toHaveAttribute("href", "tel:+74852700303");
  });

  it("uses an image-first mobile composition and restores the desktop grid", () => {
    renderWithEnrollment(<Hero />);

    const image = screen.getByRole("img", {
      name: "Инструктор автошколы разговаривает с ученицей в учебном автомобиле",
    });

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("perekrestok-hero.jpg"),
    );
    expect(screen.getByTestId("hero-layout")).toHaveClass(
      "flex",
      "lg:grid",
      "lg:grid-cols-12",
    );
    expect(screen.getByTestId("hero-media")).toHaveClass(
      "order-1",
      "w-full",
      "lg:order-2",
      "lg:col-span-7",
    );
    expect(screen.getByTestId("hero-content")).toHaveClass(
      "order-2",
      "lg:order-1",
      "lg:col-span-5",
    );
    expect(image).toHaveClass("object-center");
  });
});
