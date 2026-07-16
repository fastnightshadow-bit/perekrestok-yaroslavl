import { describe, expect, it } from "vitest";

import { getQuizRecommendation, isValidPhone } from "./quiz";

describe("getQuizRecommendation", () => {
  it("recommends theory when the learner only needs theory", () => {
    expect(
      getQuizRecommendation({
        goal: "theory",
        schedule: "morning",
        experience: "never",
      }).slug,
    ).toBe("theory");
  });

  it("recommends practical training when the learner needs practice", () => {
    expect(
      getQuizRecommendation({
        goal: "practice",
        schedule: "evening",
        experience: "little",
      }).slug,
    ).toBe("driving-practice");
  });

  it("recommends the full course for a new learner", () => {
    expect(
      getQuizRecommendation({
        goal: "full-course",
        schedule: "weekends",
        experience: "never",
      }).slug,
    ).toBe("category-b");
  });

  it("prioritizes additional lessons when skills need restoring", () => {
    expect(
      getQuizRecommendation({
        goal: "undecided",
        schedule: "unknown",
        experience: "restore",
      }).slug,
    ).toBe("additional-lesson");
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
