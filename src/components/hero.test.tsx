import { screen } from "@testing-library/react";
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

    expect(
      screen.getByRole("link", { name: "Записаться на обучение" }),
    ).toHaveAttribute("href", "#enroll");
    expect(
      screen.getByRole("link", { name: "Подобрать программу" }),
    ).toHaveAttribute("href", "#programs");
  });

  it("uses the supplied school photograph with a dedicated mobile crop", () => {
    renderWithEnrollment(<Hero />);

    const image = screen.getByRole("img", {
      name: "Инструктор автошколы разговаривает с ученицей в учебном автомобиле",
    });

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("perekrestok-hero.jpg"),
    );
    expect(image).toHaveClass("object-[66%_center]", "lg:object-center");
    expect(image.parentElement).toHaveClass("col-span-5", "lg:col-span-7");
  });
});
