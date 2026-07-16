import type {
  CompletedQuizAnswers,
  QuizAnswers,
  QuizLeadPayload,
} from "@/data/quiz";
import { getProgramBySlug, type Program } from "@/data/programs";

export { isValidPhone } from "@/lib/phone";

function requireProgram(slug: string): Program {
  const program = getProgramBySlug(slug);

  if (!program) {
    throw new Error(`Program not found: ${slug}`);
  }

  return program;
}

export function getQuizRecommendation(answers: QuizAnswers): Program {
  if (answers.experience === "restore" || answers.experience === "exam") {
    return requireProgram("additional-lesson");
  }

  if (answers.goal === "theory") {
    return requireProgram("theory");
  }

  if (answers.goal === "practice") {
    return requireProgram("driving-practice");
  }

  return requireProgram("category-b");
}

export function areQuizAnswersComplete(
  answers: QuizAnswers,
): answers is CompletedQuizAnswers {
  return Boolean(answers.goal && answers.schedule && answers.experience);
}

export async function submitQuizLead(
  payload: QuizLeadPayload,
): Promise<void> {
  void payload;
  await new Promise((resolve) => window.setTimeout(resolve, 450));
}
