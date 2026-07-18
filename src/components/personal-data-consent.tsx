"use client";

import { type RefObject, useId } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type PersonalDataConsentProps = {
  checked: boolean;
  error?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onChange: (checked: boolean) => void;
  tone?: "light" | "dark";
};

export function PersonalDataConsent({
  checked,
  error = "",
  inputRef,
  onChange,
  tone = "light",
}: PersonalDataConsentProps) {
  const checkboxId = useId();
  const errorId = useId();
  const isDark = tone === "dark";

  const linkClassName = cn(
    "rounded-sm underline underline-offset-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-yellow-400",
    isDark
      ? "decoration-white/35 hover:text-white"
      : "decoration-neutral-300 hover:text-neutral-950",
  );

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-3">
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          checked={checked}
          className={cn(
            "mt-0.5 size-5 shrink-0 cursor-pointer rounded border accent-yellow-400 outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
            isDark
              ? "border-white/35 focus-visible:ring-offset-neutral-950"
              : "border-neutral-400 focus-visible:ring-offset-white",
          )}
          id={checkboxId}
          name="consent"
          onChange={(event) => onChange(event.target.checked)}
          ref={inputRef}
          required
          type="checkbox"
        />
        <div className="min-w-0">
          <label
            className={cn(
              "cursor-pointer text-xs font-medium leading-5",
              isDark ? "text-white/80" : "text-neutral-700",
            )}
            htmlFor={checkboxId}
          >
            Я даю согласие на обработку персональных данных
          </label>
          <p
            className={cn(
              "mt-1 text-xs leading-5",
              isDark ? "text-white/50" : "text-neutral-500",
            )}
          >
            Ознакомиться: {" "}
            <a
              className={linkClassName}
              href={siteConfig.legal.consent}
              rel="noreferrer"
              target="_blank"
            >
              текст согласия
            </a>{" "}
            и {" "}
            <a
              className={linkClassName}
              href={siteConfig.legal.privacy}
              rel="noreferrer"
              target="_blank"
            >
              политика обработки данных
            </a>
            .
          </p>
        </div>
      </div>
      {error ? (
        <p
          className={cn(
            "mt-2 text-xs font-semibold",
            isDark ? "text-yellow-400" : "text-red-700",
          )}
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
