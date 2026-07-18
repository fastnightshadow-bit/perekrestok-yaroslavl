import type { QuizLeadAnswers, ValidatedLead } from "./types";

const goalLabels: Record<QuizLeadAnswers["goal"], string> = {
  manual: "механика",
  automatic: "автомат",
  undecided: "пока не решил",
};
const scheduleLabels: Record<QuizLeadAnswers["schedule"], string> = {
  morning: "утром",
  day: "днём",
  evening: "вечером",
  weekends: "в выходные",
  unknown: "график неизвестен",
};
const experienceLabels: Record<QuizLeadAnswers["experience"], string> = {
  never: "никогда не водил",
  little: "есть небольшой опыт",
  restore: "нужно восстановить навыки",
  exam: "готовится к экзамену",
};

export function formatTelegramLead(lead: ValidatedLead, date = new Date()) {
  const lines = [
    "🚗 Новая заявка с сайта",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
  ];

  if (lead.interest) lines.push(`Интерес: ${lead.interest}`);
  lines.push(`Источник: ${lead.source}`);
  if (lead.comment) lines.push(`Комментарий: ${lead.comment}`);
  if (lead.quizAnswers) {
    lines.push(`Коробка: ${goalLabels[lead.quizAnswers.goal]}`);
    lines.push(`Время занятий: ${scheduleLabels[lead.quizAnswers.schedule]}`);
    lines.push(`Опыт: ${experienceLabels[lead.quizAnswers.experience]}`);
  }

  const utm = lead.attribution;
  if (utm) {
    const campaign = [utm.utmSource, utm.utmMedium, utm.utmCampaign]
      .filter(Boolean)
      .join(" / ");
    if (campaign) lines.push(`Реклама: ${campaign}`);
    if (utm.utmContent) lines.push(`UTM content: ${utm.utmContent}`);
    if (utm.utmTerm) lines.push(`UTM term: ${utm.utmTerm}`);
  }
  if (lead.pageUrl) lines.push(`Страница: ${lead.pageUrl}`);

  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
  lines.push(`Время: ${time} МСК`);
  return lines.join("\n");
}
