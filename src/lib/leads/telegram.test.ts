import { afterEach, describe, expect, it, vi } from "vitest";

import {
  sendTelegramMessage,
  TelegramConfigurationError,
  TelegramDeliveryError,
} from "./telegram";

afterEach(() => vi.restoreAllMocks());

describe("sendTelegramMessage", () => {
  it("sends plain text to the configured Telegram group", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

    await sendTelegramMessage("hello", {
      token: "token",
      chatId: "-1001",
      fetchImpl,
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.telegram.org/bottoken/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          chat_id: "-1001",
          text: "hello",
          disable_web_page_preview: true,
        }),
      }),
    );
  });

  it("rejects missing server configuration", async () => {
    await expect(
      sendTelegramMessage("hello", { token: "", chatId: "" }),
    ).rejects.toBeInstanceOf(TelegramConfigurationError);
  });

  it("rejects a Telegram API failure", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false }), { status: 400 }),
    );
    await expect(
      sendTelegramMessage("hello", { token: "token", chatId: "-1", fetchImpl }),
    ).rejects.toBeInstanceOf(TelegramDeliveryError);
  });
});
