import { describe, expect, it } from "vitest";

import { formatTelegramLead } from "./message";

describe("formatTelegramLead", () => {
  it("formats enrollment details and omits empty fields", () => {
    const message = formatTelegramLead(
      {
        type: "enrollment",
        name: "Илья",
        phone: "+7 900 000-00-00",
        source: "hero",
        consent: true,
        interest: "Категория B",
      },
      new Date("2026-07-18T12:20:00.000Z"),
    );

    expect(message).toContain("🚗 Новая заявка с сайта");
    expect(message).toContain("Имя: Илья");
    expect(message).toContain("Интерес: Категория B");
    expect(message).not.toContain("Комментарий:");
  });

  it("converts quiz answer IDs to readable Russian labels", () => {
    const message = formatTelegramLead(
      {
        type: "quiz",
        name: "Анна",
        phone: "+7 900 000-00-00",
        source: "quiz",
        consent: true,
        quizAnswers: {
          goal: "automatic",
          schedule: "evening",
          experience: "never",
        },
      },
      new Date("2026-07-18T12:20:00.000Z"),
    );

    expect(message).toContain("Коробка: автомат");
    expect(message).toContain("Время занятий: вечером");
    expect(message).toContain("Опыт: никогда не водил");
  });
});
