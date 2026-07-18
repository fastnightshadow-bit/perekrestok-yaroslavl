import type {
  LeadAttribution,
  LeadType,
  QuizLeadAnswers,
  ValidatedLead,
} from "./types";

const limits = {
  name: 80,
  phone: 40,
  source: 80,
  interest: 160,
  comment: 1000,
  pageUrl: 500,
  utm: 120,
} as const;

const leadTypes = new Set<LeadType>(["enrollment", "contact", "quiz"]);
const goals = new Set<QuizLeadAnswers["goal"]>([
  "manual",
  "automatic",
  "undecided",
]);
const schedules = new Set<QuizLeadAnswers["schedule"]>([
  "morning",
  "day",
  "evening",
  "weekends",
  "unknown",
]);
const experiences = new Set<QuizLeadAnswers["experience"]>([
  "never",
  "little",
  "restore",
  "exam",
]);

export class LeadValidationError extends Error {
  constructor(
    public readonly field: string,
    message: string,
  ) {
    super(message);
    this.name = "LeadValidationError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredText(
  value: unknown,
  field: string,
  maxLength: number,
  minLength = 1,
) {
  if (typeof value !== "string") {
    throw new LeadValidationError(field, "Проверьте заполнение формы");
  }
  const normalized = value.trim();
  if (normalized.length < minLength || normalized.length > maxLength) {
    throw new LeadValidationError(field, "Проверьте заполнение формы");
  }
  return normalized;
}

function optionalText(value: unknown, field: string, maxLength: number) {
  if (value === undefined || value === null || value === "") return undefined;
  return requiredText(value, field, maxLength);
}

function parseAttribution(value: unknown): LeadAttribution | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value)) {
    throw new LeadValidationError("attribution", "Некорректные данные формы");
  }

  const result: LeadAttribution = {
    utmSource: optionalText(value.utmSource, "attribution", limits.utm),
    utmMedium: optionalText(value.utmMedium, "attribution", limits.utm),
    utmCampaign: optionalText(value.utmCampaign, "attribution", limits.utm),
    utmContent: optionalText(value.utmContent, "attribution", limits.utm),
    utmTerm: optionalText(value.utmTerm, "attribution", limits.utm),
  };

  const compact = Object.fromEntries(
    Object.entries(result).filter(([, item]) => item !== undefined),
  ) as LeadAttribution;
  return Object.keys(compact).length ? compact : undefined;
}

function parseQuizAnswers(value: unknown): QuizLeadAnswers {
  if (!isRecord(value)) {
    throw new LeadValidationError("quizAnswers", "Ответьте на вопросы квиза");
  }
  if (
    typeof value.goal !== "string" ||
    !goals.has(value.goal as QuizLeadAnswers["goal"]) ||
    typeof value.schedule !== "string" ||
    !schedules.has(value.schedule as QuizLeadAnswers["schedule"]) ||
    typeof value.experience !== "string" ||
    !experiences.has(value.experience as QuizLeadAnswers["experience"])
  ) {
    throw new LeadValidationError("quizAnswers", "Ответьте на вопросы квиза");
  }
  return {
    goal: value.goal as QuizLeadAnswers["goal"],
    schedule: value.schedule as QuizLeadAnswers["schedule"],
    experience: value.experience as QuizLeadAnswers["experience"],
  };
}

export function parseLeadInput(
  value: unknown,
  now = Date.now(),
): ValidatedLead {
  if (!isRecord(value)) {
    throw new LeadValidationError("request", "Некорректная заявка");
  }
  if (typeof value.type !== "string" || !leadTypes.has(value.type as LeadType)) {
    throw new LeadValidationError("type", "Некорректный тип заявки");
  }
  if (value.consent !== true) {
    throw new LeadValidationError("consent", "Подтвердите согласие");
  }
  if (typeof value.website !== "string" || value.website.trim()) {
    throw new LeadValidationError("request", "Не удалось отправить заявку");
  }
  if (
    typeof value.formStartedAt !== "number" ||
    !Number.isFinite(value.formStartedAt) ||
    now - value.formStartedAt < 1_500
  ) {
    throw new LeadValidationError("request", "Не удалось отправить заявку");
  }

  const phone = requiredText(value.phone, "phone", limits.phone);
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    throw new LeadValidationError("phone", "Введите корректный номер телефона");
  }

  const type = value.type as LeadType;
  const quizAnswers =
    type === "quiz" ? parseQuizAnswers(value.quizAnswers) : undefined;

  const lead: ValidatedLead = {
    type,
    name: requiredText(value.name, "name", limits.name, 2),
    phone,
    source: requiredText(value.source, "source", limits.source),
    consent: true,
  };

  const optional = {
    interest: optionalText(value.interest, "interest", limits.interest),
    comment: optionalText(value.comment, "comment", limits.comment),
    pageUrl: optionalText(value.pageUrl, "pageUrl", limits.pageUrl),
    attribution: parseAttribution(value.attribution),
    quizAnswers,
  };
  return Object.assign(
    lead,
    Object.fromEntries(
      Object.entries(optional).filter(([, item]) => item !== undefined),
    ),
  );
}
