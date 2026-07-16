"use client";

import {
  type FormEvent,
  type RefObject,
  useId,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { isValidPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";

export type EnrollmentFormValues = {
  name: string;
  phone: string;
  program: string;
  comment: string;
};

type EnrollmentFormProps = {
  layout?: "stacked" | "contact";
  nameInputRef?: RefObject<HTMLInputElement | null>;
  onSubmitted?: (values: EnrollmentFormValues) => void;
  selectedProgram?: string;
  showComment?: boolean;
  showProgram?: boolean;
  submitLabel?: string;
};

const fieldClassName =
  "mt-2 h-13 w-full rounded-[0.875rem] border border-neutral-300 bg-white px-4 text-base text-neutral-950 outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-yellow-400/70";

export function EnrollmentForm({
  layout = "stacked",
  nameInputRef,
  onSubmitted,
  selectedProgram = "",
  showComment = false,
  showProgram = false,
  submitLabel = "Отправить заявку",
}: EnrollmentFormProps) {
  const phoneErrorId = useId();
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phone = String(formData.get("phone") ?? "").trim();

    if (!isValidPhone(phone)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }

    setPhoneError("");

    onSubmitted?.({
      comment: String(formData.get("comment") ?? ""),
      name: String(formData.get("name") ?? "").trim(),
      phone,
      program: String(formData.get("program") ?? selectedProgram),
    });
  };

  const isContactLayout = layout === "contact";

  return (
    <form
      className={cn(
        isContactLayout
          ? "grid gap-5 md:grid-cols-2"
          : "space-y-5",
      )}
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
            if (phoneError) {
              setPhoneError("");
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

      <div
        className={cn(
          isContactLayout
            ? "flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center"
            : "",
        )}
      >
        <Button
          className={cn(isContactLayout ? "w-full md:w-auto" : "w-full")}
          size="lg"
          type="submit"
        >
          {submitLabel}
        </Button>
        <p
          className={cn(
            "text-xs leading-5 text-neutral-500",
            isContactLayout ? "md:max-w-md" : "mt-4 text-center",
          )}
        >
          Отправляя форму, вы соглашаетесь с{" "}
          <a
            className="underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
            href={siteConfig.legal.privacy}
            rel="noreferrer"
            target="_blank"
          >
            политикой обработки данных
          </a>
          .
        </p>
      </div>
    </form>
  );
}
