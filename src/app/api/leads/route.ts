import { NextResponse } from "next/server";

import { formatTelegramLead } from "@/lib/leads/message";
import {
  sendTelegramMessage,
  TelegramConfigurationError,
  TelegramDeliveryError,
} from "@/lib/leads/telegram";
import type { LeadApiResponse } from "@/lib/leads/types";
import {
  LeadValidationError,
  parseLeadInput,
} from "@/lib/leads/validation";

const safeFailure = (
  status: number,
  body: Extract<LeadApiResponse, { ok: false }>,
) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return safeFailure(415, {
      ok: false,
      error: "invalid",
      message: "Форма отправлена в неверном формате",
    });
  }

  const body = await request.text();
  if (body.length > 8_000) {
    return safeFailure(413, {
      ok: false,
      error: "invalid",
      message: "Заявка содержит слишком много данных",
    });
  }

  try {
    const lead = parseLeadInput(JSON.parse(body));
    await sendTelegramMessage(formatTelegramLead(lead));
    return NextResponse.json<LeadApiResponse>({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return safeFailure(400, {
        ok: false,
        error: "invalid",
        message: "Не удалось прочитать данные формы",
      });
    }
    if (error instanceof LeadValidationError) {
      return safeFailure(400, {
        ok: false,
        error: "invalid",
        message: error.message,
        field: error.field,
      });
    }
    if (error instanceof TelegramConfigurationError) {
      return safeFailure(503, {
        ok: false,
        error: "configuration",
        message: "Отправка временно недоступна. Позвоните нам.",
      });
    }
    if (error instanceof TelegramDeliveryError) {
      return safeFailure(502, {
        ok: false,
        error: "delivery",
        message: "Не удалось отправить заявку. Попробуйте ещё раз.",
      });
    }
    return safeFailure(502, {
      ok: false,
      error: "delivery",
      message: "Не удалось отправить заявку. Попробуйте ещё раз.",
    });
  }
}
