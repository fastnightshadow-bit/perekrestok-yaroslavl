"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";
import { type FormEvent, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import type {
  CompletedQuizAnswers,
  QuizLeadPayload,
} from "@/data/quiz";
import type { Program } from "@/data/programs";
import { isValidPhone } from "@/lib/phone";

export type SubmitQuizLead = (payload: QuizLeadPayload) => Promise<void>;

type QuizResultProps = {
  answers: CompletedQuizAnswers;
  program: Program;
  submitLead: SubmitQuizLead;
  onEditAnswers: () => void;
};

type SubmissionStatus = "idle" | "loading" | "success" | "error";

const inputClassName =
  "mt-2 h-13 w-full rounded-[0.875rem] border border-white/20 bg-white/[0.07] px-4 text-base text-white outline-none transition-[border-color,box-shadow,background-color] placeholder:text-white/35 focus:border-yellow-400 focus:bg-white/[0.1] focus:ring-2 focus:ring-yellow-400/30";

const scheduleLabels: Record<CompletedQuizAnswers["schedule"], string> = {
  morning: "утром",
  day: "днём",
  evening: "вечером",
  weekends: "в выходные",
  unknown: "по гибкому графику",
};

export function QuizResult({
  answers,
  program,
  submitLead,
  onEditAnswers,
}: QuizResultProps) {
  const phoneErrorId = useId();
  const formErrorId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidPhone(phone)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }

    setPhoneError("");
    setStatus("loading");

    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        recommendedProgram: program.name,
        answers,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        aria-live="polite"
        className="flex min-h-[26rem] flex-col items-start justify-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-yellow-400 text-neutral-950">
          <CheckCircle2 aria-hidden="true" size={28} strokeWidth={1.8} />
        </span>
        <h3 className="mt-7 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          Заявка принята
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
          Результат сохранён. Администратор сможет уточнить детали программы и
          удобный график.
        </p>
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-yellow-400">
          Персональная рекомендация
        </p>
        <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
          Вам подойдёт {program.name}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
          Этот формат соответствует выбранной цели и вашему опыту.
          Занятия удобнее планировать {scheduleLabels[answers.schedule]}.
        </p>
        <div className="mt-7 rounded-[1.25rem] border border-white/10 bg-white/[0.05] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
            Формат
          </p>
          <p className="mt-2 font-semibold text-white">{program.format}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
            Объём
          </p>
          <p className="mt-2 font-semibold text-white">
            {program.volume}
          </p>
        </div>
        <button
          className="mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-white/60 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-yellow-400"
          onClick={onEditAnswers}
          type="button"
        >
          <RotateCcw aria-hidden="true" size={15} strokeWidth={1.8} />
          Изменить ответы
        </button>
      </div>

      <form
        className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 sm:p-7"
        noValidate
        onSubmit={handleSubmit}
      >
        <p className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
          Получить консультацию
        </p>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Оставьте контакты — данные уже подготовлены для будущей отправки.
        </p>

        <label className="mt-6 block text-sm font-semibold text-white/80">
          Имя
          <input
            autoComplete="name"
            className={inputClassName}
            onChange={(event) => setName(event.target.value)}
            placeholder="Как к вам обращаться"
            required
            type="text"
            value={name}
          />
        </label>

        <label className="mt-5 block text-sm font-semibold text-white/80">
          Телефон
          <input
            aria-describedby={
              phoneError
                ? phoneErrorId
                : status === "error"
                  ? formErrorId
                  : undefined
            }
            aria-invalid={Boolean(phoneError)}
            autoComplete="tel"
            className={inputClassName}
            inputMode="tel"
            onChange={(event) => {
              setPhone(event.target.value);
              if (phoneError) {
                setPhoneError("");
              }
            }}
            placeholder="+7 (___) ___-__-__"
            required
            type="tel"
            value={phone}
          />
        </label>

        {phoneError ? (
          <p
            className="mt-2 text-sm font-medium text-yellow-400"
            id={phoneErrorId}
            role="alert"
          >
            {phoneError}
          </p>
        ) : null}

        {status === "error" ? (
          <p
            className="mt-3 text-sm font-medium text-yellow-400"
            id={formErrorId}
            role="alert"
          >
            Не удалось отправить заявку. Попробуйте ещё раз.
          </p>
        ) : null}

        <Button
          className="mt-6 w-full"
          disabled={status === "loading" || !name.trim()}
          size="lg"
          type="submit"
        >
          {status === "loading" ? "Отправляем..." : "Получить консультацию"}
        </Button>
      </form>
    </div>
  );
}
