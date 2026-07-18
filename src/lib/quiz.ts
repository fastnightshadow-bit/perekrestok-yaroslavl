import type {
  CompletedQuizAnswers,
  QuizAnswers,
  QuizLeadPayload,
} from "@/data/quiz";
import {
  collectLeadAttribution,
  submitLead,
} from "@/lib/leads/client";

export { isValidPhone } from "@/lib/phone";

export type QuizRecommendation = {
  name: string;
  description: string;
};

export function getQuizRecommendation(
  answers: QuizAnswers,
): QuizRecommendation {
  if (answers.goal === "automatic") {
    return {
      name: "Категория B — АКПП",
      description: "Комфортное обучение без переключения передач.",
    };
  }

  if (answers.goal === "manual") {
    return {
      name: "Категория B — МКПП",
      description: "Универсальный вариант обучения категории B.",
    };
  }

  return {
    name: "Категория B",
    description:
      "Администратор поможет выбрать подходящую коробку передач.",
  };
}

export function areQuizAnswersComplete(
  answers: QuizAnswers,
): answers is CompletedQuizAnswers {
  return Boolean(answers.goal && answers.schedule && answers.experience);
}

export async function submitQuizLead(payload: QuizLeadPayload): Promise<void> {
  const pageUrl = typeof window === "undefined" ? undefined : window.location.href;
  const attribution =
    typeof window === "undefined"
      ? undefined
      : collectLeadAttribution(new URLSearchParams(window.location.search));

  await submitLead({
    attribution,
    consent: true,
    formStartedAt: payload.formStartedAt,
    interest: payload.recommendedProgram,
    name: payload.name,
    pageUrl,
    phone: payload.phone,
    quizAnswers: payload.answers,
    source: "quiz",
    type: "quiz",
    website: payload.website,
  });
}
