import { describe, expect, it } from "vitest";

import { LeadValidationError, parseLeadInput } from "./validation";

const validLead = {
  type: "enrollment",
  name: "  Илья  ",
  phone: "+7 (900) 000-00-00",
  source: "hero",
  consent: true,
  interest: "Категория B — МКПП / АКПП",
  website: "",
  formStartedAt: 1_000,
};

describe("parseLeadInput", () => {
  it("normalizes a valid lead and drops unknown keys", () => {
    expect(parseLeadInput({ ...validLead, secret: "ignored" }, 4_000)).toEqual({
      type: "enrollment",
      name: "Илья",
      phone: "+7 (900) 000-00-00",
      source: "hero",
      consent: true,
      interest: "Категория B — МКПП / АКПП",
    });
  });

  it.each([
    [{ ...validLead, consent: false }, "consent"],
    [{ ...validLead, phone: "123" }, "phone"],
    [{ ...validLead, website: "spam" }, "request"],
    [{ ...validLead, formStartedAt: 3_500 }, "request"],
  ])("rejects invalid or automated input", (value, field) => {
    try {
      parseLeadInput(value, 4_000);
      throw new Error("Expected validation to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(LeadValidationError);
      expect((error as LeadValidationError).field).toBe(field);
    }
  });

  it("requires complete known quiz answers", () => {
    expect(() =>
      parseLeadInput(
        {
          ...validLead,
          type: "quiz",
          quizAnswers: { goal: "automatic", schedule: "evening" },
        },
        4_000,
      ),
    ).toThrow(LeadValidationError);
  });
});
