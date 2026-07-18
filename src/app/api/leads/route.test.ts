import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

const validLead = () => ({
  type: "enrollment",
  name: "Илья",
  phone: "+7 900 000-00-00",
  source: "hero",
  consent: true,
  website: "",
  formStartedAt: Date.now() - 2_000,
});

function request(body: unknown, contentType = "application/json") {
  return new NextRequest("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": contentType },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/leads", () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "-1001";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  });

  it("delivers a valid lead", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ),
    );
    const response = await POST(request(validLead()));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it("rejects invalid content and oversized bodies", async () => {
    expect((await POST(request("plain", "text/plain"))).status).toBe(415);
    expect((await POST(request("x".repeat(8_001)))).status).toBe(413);
  });

  it("returns a safe validation error", async () => {
    const response = await POST(request({ ...validLead(), phone: "123" }));
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      ok: false,
      error: "invalid",
      field: "phone",
    });
  });

  it("reports missing configuration without exposing a secret", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    const response = await POST(request(validLead()));
    expect(response.status).toBe(503);
    expect(JSON.stringify(await response.json())).not.toContain("test-token");
  });

  it("reports Telegram delivery failure safely", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: false, description: "private" }), {
          status: 400,
        }),
      ),
    );
    const response = await POST(request(validLead()));
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({ ok: false, error: "delivery" });
  });
});
