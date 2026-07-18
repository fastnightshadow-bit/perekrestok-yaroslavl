export class TelegramConfigurationError extends Error {
  constructor() {
    super("Telegram is not configured");
    this.name = "TelegramConfigurationError";
  }
}

export class TelegramDeliveryError extends Error {
  constructor() {
    super("Telegram delivery failed");
    this.name = "TelegramDeliveryError";
  }
}

type TelegramOptions = {
  token?: string;
  chatId?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

export async function sendTelegramMessage(
  text: string,
  options: TelegramOptions = {},
): Promise<void> {
  const token = options.token ?? process.env.TELEGRAM_BOT_TOKEN;
  const chatId = options.chatId ?? process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new TelegramConfigurationError();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 8_000);

  try {
    const response = await (options.fetchImpl ?? fetch)(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
        cache: "no-store",
      },
    );
    const result = (await response.json().catch(() => null)) as {
      ok?: boolean;
    } | null;
    if (!response.ok || !result?.ok) throw new TelegramDeliveryError();
  } catch (error) {
    if (error instanceof TelegramDeliveryError) throw error;
    throw new TelegramDeliveryError();
  } finally {
    clearTimeout(timeout);
  }
}
