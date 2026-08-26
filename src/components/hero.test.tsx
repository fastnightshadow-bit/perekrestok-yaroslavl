import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithEnrollment } from "@/test/render-with-enrollment";
import { Hero } from "./hero";

describe("Hero", () => {
  it("communicates the driving-school offer and price", () => {
    renderWithEnrollment(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: "Автошкола Перекрёсток — обучение вождению категории B в Ярославле",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Спокойно научим уверенно водить")).toBeInTheDocument();
    expect(screen.getByText("Научим уверенно водить")).toBeInTheDocument();
    expect(screen.getByText("в Ярославле")).toBeInTheDocument();
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
    expect(
      content.getByRole("link", { name: "Записаться на обучение" }),
    ).toHaveAttribute("href", "#enroll");
  });

  it("uses the original photo as a full-bleed mobile screen and restores the desktop grid", () => {
    renderWithEnrollment(<Hero />);

    const image = screen.getByRole("img", {
      name: "Инструктор автошколы разговаривает с ученицей в учебном автомобиле",
    });

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("perekrestok-hero.jpg"),
    );
    expect(
      screen.getByRole("region", {
        name: "Автошкола Перекрёсток — обучение вождению категории B в Ярославле",
      }),
    ).toHaveClass("min-h-[100svh]", "pt-0", "lg:pt-28");
    expect(screen.getByTestId("hero-layout")).toHaveClass(
      "relative",
      "px-0",
      "lg:grid",
      "lg:grid-cols-12",
    );
    expect(screen.getByTestId("hero-media")).toHaveClass(
      "h-[100svh]",
      "rounded-none",
      "w-full",
      "lg:order-2",
      "lg:col-span-7",
    );
    expect(screen.getByTestId("hero-content")).toHaveClass(
      "absolute",
      "text-white",
      "lg:relative",
      "lg:order-1",
      "lg:col-span-5",
    );
    expect(screen.getByText("Гибкий график")).toBeInTheDocument();
    expect(screen.getByText("В центре города")).toBeInTheDocument();
    expect(screen.getByText("Рассрочка на обучение")).toBeInTheDocument();
  });

  it("keeps the mobile photo crisp and fades it into the dark content area", () => {
    renderWithEnrollment(<Hero />);

    const image = screen.getByRole("img", {
      name: "Инструктор автошколы разговаривает с ученицей в учебном автомобиле",
    });
    const mobileImage = screen.getByTestId("hero-mobile-image");
    const mobileFade = screen.getByTestId("hero-mobile-fade");

    expect(image.getAttribute("src")).toContain("q=92");
    expect(mobileImage).toHaveClass(
      "h-[86svh]",
      "[mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)]",
    );
    expect(mobileFade).toHaveClass("from-white/70", "via-transparent");
  });

  it("aligns all three mobile advantages to the same two-row grid", () => {
    renderWithEnrollment(<Hero />);

    const advantages = within(screen.getByTestId("mobile-advantages"));
    const items = advantages.getAllByRole("listitem");

    expect(items).toHaveLength(3);
    for (const item of items) {
      expect(item).toHaveClass(
        "grid",
        "grid-rows-[1.5rem_2.5rem]",
        "content-start",
      );
    }
  });
});
