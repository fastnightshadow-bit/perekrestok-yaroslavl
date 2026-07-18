import { describe, expect, it } from "vitest";

import { benefits, trainingOptions } from "@/data/home-content";
import { schoolFacts } from "@/data/school-facts";

describe("verified school content", () => {
  it("stores the confirmed prices and result in one place", () => {
    expect(schoolFacts).toMatchObject({
      fullCoursePrice: "47 600 ₽",
      theoryPrice: "14 000 ₽",
      practiceLessonPrice: "1 200 ₽",
      practiceSessions: 28,
      additionalLessonPrice: "1 300 ₽",
      transferPrice: "6 000 ₽",
      internalExamPrice: "2 000 ₽",
      firstGibddExamPrice: "2 500 ₽",
      repeatGibddExamPrice: "3 000 ₽",
      licenseDuty: "4 000 ₽",
      firstTryPassRate: "Более 85%",
      yandexRating: "4,8",
      yandexRatingCount: 55,
      separateExamPayment: true,
    });
  });

  it("uses the current category B and supporting service prices", () => {
    expect(trainingOptions.map(({ name, price }) => ({ name, price }))).toEqual([
      { name: "Категория B — МКПП / АКПП", price: "47 600 ₽" },
      { name: "Восстановление навыков", price: "1 300 ₽" },
      { name: "Переход из другой автошколы", price: "6 000 ₽" },
    ]);

    expect(JSON.stringify(trainingOptions)).not.toMatch(/XX XXX|Временная/i);
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
