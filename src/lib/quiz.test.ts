import { describe, expect, it, vi } from "vitest";

import { getQuizRecommendation, isValidPhone, submitQuizLead } from "./quiz";

const { submitLeadMock } = vi.hoisted(() => ({
  submitLeadMock: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/leads/client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/leads/client")>(
    "@/lib/leads/client",
  );
  return { ...actual, submitLead: submitLeadMock };
});

describe("getQuizRecommendation", () => {
  it("recommends manual transmission when selected", () => {
    expect(
      getQuizRecommendation({
        goal: "manual",
        schedule: "morning",
        experience: "never",
      }).name,
    ).toBe("Категория B — МКПП");
  });

  it("recommends automatic transmission when selected", () => {
    expect(
      getQuizRecommendation({
        goal: "automatic",
        schedule: "evening",
        experience: "little",
      }).name,
    ).toBe("Категория B — АКПП");
  });

  it("offers help when the transmission is undecided", () => {
    expect(
      getQuizRecommendation({
        goal: "undecided",
        schedule: "unknown",
        experience: "restore",
      }).name,
    ).toBe("Категория B");
  });
});

describe("isValidPhone", () => {
  it("accepts a formatted Russian telephone number", () => {
    expect(isValidPhone("+7 (999) 123-45-67")).toBe(true);
  });

  it("rejects a short telephone number", () => {
    expect(isValidPhone("12345")).toBe(false);
  });
});

describe("submitQuizLead", () => {
  it("sends the recommendation and all answers through the shared lead client", async () => {
    await submitQuizLead({
      answers: { goal: "manual", schedule: "evening", experience: "never" },
      consent: true,
      formStartedAt: 100,
      name: "Илья",
      phone: "+7 999 123-45-67",
      recommendedProgram: "Категория B — МКПП",
      website: "",
    });

    expect(submitLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        interest: "Категория B — МКПП",
        quizAnswers: {
          goal: "manual",
          schedule: "evening",
          experience: "never",
        },
        source: "quiz",
        type: "quiz",
      }),
    );
  });
});
