import { describe, expect, it } from "vitest";

import { benefits, tariffs } from "@/data/home-content";
import { schoolFacts } from "@/data/school-facts";

describe("verified school content", () => {
  it("stores the confirmed prices and result in one place", () => {
    expect(schoolFacts).toMatchObject({
      fullCoursePrice: "53 800 ₽",
      theoryPrice: "12 000 ₽",
      practiceCoursePrice: "41 800 ₽",
      practiceHours: 57,
      singleLessonPrice: "1 100 ₽",
      singleLessonDuration: "1,5 часа",
      firstTryPassRate: "Более 85%",
      separateExamPayment: true,
    });
  });

  it("uses only verified tariff names and prices", () => {
    expect(tariffs.map(({ name, price }) => ({ name, price }))).toEqual([
      { name: "Полный курс категории B", price: "53 800 ₽" },
      { name: "Теоретическая подготовка", price: "12 000 ₽" },
      { name: "Практическое вождение", price: "41 800 ₽" },
    ]);

    expect(JSON.stringify(tariffs)).not.toMatch(/XX XXX|МКПП|АКПП|Временная/i);
  });

  it("uses the four advantages published by the school", () => {
    expect(benefits.map((benefit) => benefit.title)).toEqual([
      "Обучение в центре Ярославля",
      "Короткие сроки обучения",
      "Опытные инструкторы",
      "Экзамен на знакомом автомобиле",
    ]);
  });
});
