"use client";

import { type CSSProperties, useState } from "react";

import {
  QuizResult,
  type SubmitQuizLead,
} from "@/components/quiz-result";
import { QuizStep } from "@/components/quiz-step";
import type {
  QuizAnswerId,
  QuizAnswers,
  QuizQuestionId,
} from "@/data/quiz";
import { quizQuestions } from "@/data/quiz";
import {
  areQuizAnswersComplete,
  getQuizRecommendation,
  submitQuizLead,
} from "@/lib/quiz";

type ProgramQuizProps = {
  submitLead?: SubmitQuizLead;
};

export function ProgramQuiz({
  submitLead: submitLeadOverride = submitQuizLead,
}: ProgramQuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const isResult = currentStep === quizQuestions.length;
  const question = quizQuestions[currentStep];
  const progress = isResult
    ? 100
    : ((currentStep + 1) / quizQuestions.length) * 100;

  const handleAnswer = (
    questionId: QuizQuestionId,
    answerId: QuizAnswerId,
  ) => {
    setAnswers((current) => ({ ...current, [questionId]: answerId }));
  };

  const handleNext = () => {
    if (!question || !answers[question.id]) {
      return;
    }

    setDirection(1);
    setCurrentStep((step) => Math.min(step + 1, quizQuestions.length));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const canShowResult = isResult && areQuizAnswersComplete(answers);
  const recommendation = canShowResult
    ? getQuizRecommendation(answers)
    : undefined;

  return (
    <section
      aria-labelledby="quiz-title"
      className="bg-[#fafaf7] pb-20 pt-4 sm:pb-24 lg:pb-28"
      id="quiz"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="overflow-hidden rounded-[2rem] bg-neutral-950 px-5 py-8 shadow-[0_30px_90px_rgba(18,20,22,0.14)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-7 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-400 sm:text-sm">
                Подбор программы
              </p>
              <h2
                className="mt-5 text-[clamp(2.15rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white"
                id="quiz-title"
              >
                Не знаете, что выбрать? Подберём программу за 2 минуты
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                Ответьте на несколько вопросов — покажем подходящий вариант
                обучения.
              </p>
            </div>

            <div className="w-full shrink-0 lg:w-64">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                <span>{isResult ? "Результат" : `Шаг ${currentStep + 1} из 3`}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-yellow-400 transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="min-h-[31rem] pt-9 sm:pt-11">
            <div
              className="quiz-step-enter"
              key={isResult ? "result" : question.id}
              style={{ "--quiz-direction": direction } as CSSProperties}
            >
              {canShowResult && recommendation ? (
                <QuizResult
                  answers={answers}
                  onEditAnswers={() => {
                    setDirection(-1);
                    setCurrentStep(quizQuestions.length - 1);
                  }}
                  recommendation={recommendation}
                  submitLead={submitLeadOverride}
                />
              ) : question ? (
                <QuizStep
                  onBack={currentStep > 0 ? handleBack : undefined}
                  onChange={handleAnswer}
                  onNext={handleNext}
                  question={question}
                  value={answers[question.id]}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
