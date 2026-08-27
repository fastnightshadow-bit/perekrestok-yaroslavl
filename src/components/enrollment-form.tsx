"use client";

import { Check, CheckCircle2, Clock3, Phone } from "lucide-react";
import {
  type FormEvent,
  type RefObject,
  useId,
  useRef,
  useState,
} from "react";

import { PersonalDataConsent } from "@/components/personal-data-consent";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";
import {
  collectLeadAttribution,
  LeadSubmissionError,
  submitLead,
} from "@/lib/leads/client";
import type { LeadInput, LeadType } from "@/lib/leads/types";
import { isValidPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";

export type EnrollmentFormValues = {
  name: string;
  phone: string;
  program: string;
  comment: string;
  consent: true;
};

type EnrollmentFormProps = {
  layout?: "stacked" | "contact";
  leadType?: Extract<LeadType, "enrollment" | "contact">;
  nameInputRef?: RefObject<HTMLInputElement | null>;
  onSubmitted?: (values: EnrollmentFormValues) => void;
  selectedProgram?: string;
  showComment?: boolean;
  showProgram?: boolean;
  source?: string;
  submitLabel?: string;
  submitLeadOverride?: (input: LeadInput) => Promise<void>;
};

const fieldClassName =
  "mt-2 h-13 w-full rounded-[0.875rem] border border-neutral-300 bg-white px-4 text-base text-neutral-950 outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-yellow-400/70";

export function EnrollmentForm({
  layout = "stacked",
  leadType = "enrollment",
  nameInputRef,
  onSubmitted,
  selectedProgram = "",
  showComment = false,
  showProgram = false,
  source = "website",
  submitLabel = "Отправить заявку",
  submitLeadOverride = submitLead,
}: EnrollmentFormProps) {
  const phoneErrorId = useId();
  const [phoneError, setPhoneError] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [submittedValues, setSubmittedValues] =
    useState<EnrollmentFormValues | null>(null);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const consentRef = useRef<HTMLInputElement>(null);
  const formStartedAt = useRef(Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get("phone") ?? "").trim();

    if (!isValidPhone(phone)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }

    setPhoneError("");

    if (!consent) {
      setConsentError(
        "Подтвердите согласие на обработку персональных данных",
      );
      consentRef.current?.focus();
      return;
    }

    setConsentError("");
    setSubmissionError("");
    setStatus("submitting");

    const values: EnrollmentFormValues = {
      comment: String(formData.get("comment") ?? "").trim(),
      consent: true,
      name: String(formData.get("name") ?? "").trim(),
      phone,
      program: String(formData.get("program") ?? selectedProgram).trim(),
    };

    const pageUrl = typeof window === "undefined" ? undefined : window.location.href;
    const attribution =
      typeof window === "undefined"
        ? undefined
        : collectLeadAttribution(new URLSearchParams(window.location.search));

    try {
      await submitLeadOverride({
        attribution,
        comment: values.comment || undefined,
        consent: true,
        formStartedAt: formStartedAt.current,
        interest: values.program || undefined,
        name: values.name,
        pageUrl,
        phone: values.phone,
        source,
        type: leadType,
        website: String(formData.get("website") ?? ""),
      });
      setSubmittedValues(values);
      onSubmitted?.(values);
      setStatus("success");
    } catch (error) {
      setSubmissionError(
        error instanceof LeadSubmissionError
          ? error.message
          : "Не удалось отправить заявку. Попробуйте ещё раз",
      );
      setStatus("error");
    }
  };

  const isContactLayout = layout === "contact";

  if (status === "success") {
    return (
      <div
        aria-live="polite"
        className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 text-neutral-950 shadow-[0_20px_60px_rgba(18,20,22,0.07)] sm:p-6"
        role="status"
      >
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 aria-hidden="true" size={25} strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-green-700">
              Заявка отправлена
            </p>
            <p className="mt-1 text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
              {submittedValues?.name
                ? `${submittedValues.name}, спасибо!`
                : "Спасибо!"}
            </p>
          </div>
        </div>

        {submittedValues?.program ? (
          <div className="mt-5 rounded-2xl bg-neutral-100 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
              Вы выбрали
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">
              {submittedValues.program}
            </p>
          </div>
        ) : null}

        <div className="mt-6">
          <p className="text-sm font-semibold">Что будет дальше</p>
          <ol className="mt-3 space-y-3 text-sm leading-6 text-neutral-600">
            {[
              "Уточним ближайший набор и удобный формат обучения.",
              "Расскажем об оплате и ответим на вопросы.",
              "Подскажем, какие документы понадобятся для начала.",
            ].map((step) => (
              <li className="flex gap-3" key={step}>
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-neutral-950">
                  <Check aria-hidden="true" size={13} strokeWidth={2.4} />
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 border-t border-neutral-200 pt-5">
          <p className="flex items-start gap-2 text-sm leading-6 text-neutral-600">
            <Clock3
              aria-hidden="true"
              className="mt-1 shrink-0"
              size={16}
            />
            Администратор свяжется с вами в рабочее время: {contactDetails.hours}
          </p>
          <Button asChild className="mt-4 w-full" variant="outline">
            <a href={contactDetails.phoneHref}>
              <Phone aria-hidden="true" size={17} />
              Позвонить, если вопрос срочный
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      aria-busy={status === "submitting"}
      className={cn(isContactLayout ? "grid gap-5 md:grid-cols-2" : "space-y-5")}
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="block text-sm font-semibold text-neutral-800">
        Имя
        <input
          autoComplete="name"
          className={fieldClassName}
          name="name"
          placeholder="Как к вам обращаться"
          ref={nameInputRef}
          required
          type="text"
        />
      </label>

      <label className="block text-sm font-semibold text-neutral-800">
        Телефон
        <input
          aria-describedby={phoneError ? phoneErrorId : undefined}
          aria-invalid={Boolean(phoneError)}
          autoComplete="tel"
          className={fieldClassName}
          inputMode="tel"
          name="phone"
          onChange={() => {
            if (phoneError) setPhoneError("");
            if (status === "error") {
              setStatus("idle");
              setSubmissionError("");
            }
          }}
          placeholder="+7 (___) ___-__-__"
          required
          type="tel"
        />
      </label>
      {phoneError ? (
        <p
          className={cn(
            "-mt-3 text-sm font-medium text-red-700",
            isContactLayout && "md:col-span-2",
          )}
          id={phoneErrorId}
          role="alert"
        >
          {phoneError}
        </p>
      ) : null}

      {showProgram ? (
        <label
          className={cn(
            "block text-sm font-semibold text-neutral-800",
            isContactLayout && "md:col-span-2",
          )}
        >
          Выбранная программа
          <input
            className={`${fieldClassName} cursor-default bg-neutral-100 text-neutral-700`}
            name="program"
            readOnly
            type="text"
            value={selectedProgram}
          />
        </label>
      ) : null}

      {showComment ? (
        <label className="block text-sm font-semibold text-neutral-800 md:col-span-2">
          Комментарий
          <textarea
            className={`${fieldClassName} min-h-32 resize-y py-3.5`}
            name="comment"
            placeholder="Когда вам удобно заниматься или что важно уточнить"
            rows={4}
          />
        </label>
      ) : null}

      <label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        Не заполняйте это поле
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </label>

      <div
        className={cn(
          isContactLayout
            ? "flex flex-col gap-4 md:col-span-2 md:grid md:grid-cols-[auto_1fr] md:items-start md:gap-x-5"
            : "",
        )}
      >
        <div className={cn(isContactLayout ? "md:col-start-2" : "mb-5")}>
          <PersonalDataConsent
            checked={consent}
            error={consentError}
            inputRef={consentRef}
            onChange={(checked) => {
              setConsent(checked);
              if (checked) setConsentError("");
            }}
          />
        </div>
        <Button
          className={cn(
            isContactLayout
              ? "w-full md:col-start-1 md:row-start-1 md:w-auto"
              : "w-full",
          )}
          disabled={status === "submitting"}
          size="lg"
          type="submit"
        >
          {status === "submitting" ? "Отправляем…" : submitLabel}
        </Button>
      </div>

      {status === "error" ? (
        <p
          className={cn(
            "rounded-[0.875rem] bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-800",
            isContactLayout && "md:col-span-2",
          )}
          role="alert"
        >
          {submissionError} Можно попробовать ещё раз или{" "}
          <a className="underline underline-offset-2" href={contactDetails.phoneHref}>
            позвонить {contactDetails.phoneDisplay}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
