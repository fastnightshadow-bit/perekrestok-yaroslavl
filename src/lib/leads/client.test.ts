import { describe, expect, it, vi } from "vitest";

import {
  collectLeadAttribution,
  LeadSubmissionError,
  submitLead,
} from "./client";
import type { LeadInput } from "./types";

const lead: LeadInput = {
  type: "contact",
  name: "Илья",
  phone: "+7 900 000-00-00",
  source: "contacts",
  consent: true,
  website: "",
  formStartedAt: 1_000,
};

describe("lead client", () => {
  it("collects only supported UTM values", () => {
    expect(
      collectLeadAttribution(
        new URLSearchParams("utm_source=yandex&utm_medium=cpc&other=private"),
      ),
    ).toEqual({ utmSource: "yandex", utmMedium: "cpc" });
  });

  it("posts a lead to the shared endpoint", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    await submitLead(lead, fetchImpl);
    expect(fetchImpl).toHaveBeenCalledWith(
      "/api/leads",
      expect.objectContaining({ method: "POST", body: JSON.stringify(lead) }),
    );
  });

  it("maps server and network errors to a safe error", async () => {
    const failed = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ ok: false, message: "Попробуйте ещё раз", field: "phone" }),
        { status: 400 },
      ),
    );
    await expect(submitLead(lead, failed)).rejects.toMatchObject({
      name: "LeadSubmissionError",
      field: "phone",
    });

    await expect(
      submitLead(lead, vi.fn().mockRejectedValue(new Error("private"))),
    ).rejects.toBeInstanceOf(LeadSubmissionError);
  });
});
