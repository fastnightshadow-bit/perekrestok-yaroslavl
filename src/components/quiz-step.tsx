import { ArrowLeft, ArrowRight } from "lucide-react";

import { QuizOption } from "@/components/quiz-option";
import { Button } from "@/components/ui/button";
import type {
  QuizAnswerId,
  QuizQuestion,
  QuizQuestionId,
} from "@/data/quiz";

type QuizStepProps = {
  question: QuizQuestion;
  value?: QuizAnswerId;
  onChange: (question: QuizQuestionId, answer: QuizAnswerId) => void;
  onNext: () => void;
  onBack?: () => void;
};

export function QuizStep({
  question,
  value,
  onChange,
  onNext,
  onBack,
}: QuizStepProps) {
  return (
    <div>
      <fieldset>
        <legend className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
          {question.title}
        </legend>
        <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-2">
          {question.options.map((option) => (
            <QuizOption
              key={option.id}
              name={question.id}
              onSelect={(answer) => onChange(question.id, answer)}
              option={option}
              selected={value === option.id}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onBack ? (
          <Button
            className="w-full border-white/15 bg-white/5 text-white hover:border-white/35 hover:bg-white/10 sm:w-auto"
            onClick={onBack}
            type="button"
            variant="outline"
          >
            <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.8} />
            Назад
          </Button>
        ) : (
          <span aria-hidden="true" />
        )}
        <Button
          className="w-full sm:w-auto"
          disabled={!value}
          onClick={onNext}
          type="button"
        >
          Продолжить
          <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
        </Button>
      </div>
    </div>
  );
}
