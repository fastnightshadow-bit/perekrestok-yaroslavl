"use client";

import { Check, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TrainingOption } from "@/data/home-content";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  option: TrainingOption;
  onEnroll: (program: string) => void;
};

export function PricingCard({ option, onEnroll }: PricingCardProps) {
  return (
    <article
      aria-label={option.name}
      className={cn(
        "interactive-card flex min-w-0 flex-col rounded-[1.625rem] border bg-white p-6 shadow-[0_20px_60px_rgba(18,20,22,0.055)] hover:shadow-[0_28px_70px_rgba(18,20,22,0.085)] sm:p-8",
        option.featured ? "border-yellow-400" : "border-neutral-200",
      )}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
            Автошкола «Перекрёсток»
          </p>
          {option.featured ? (
            <span className="rounded-full bg-yellow-400 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-neutral-950">
              Популярный выбор
            </span>
          ) : null}
        </div>
        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.045em] text-neutral-950">
          {option.name}
        </h3>
        <p className="mt-3 min-h-12 text-[0.9375rem] leading-6 text-neutral-600">
          {option.description}
        </p>
      </div>

      <div className="mt-7 border-y border-neutral-200 py-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950">
            {option.price}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            {option.priceCaption}
          </span>
        </div>
      </div>

      <div className="mt-6 flex-1">
        <p className="text-sm font-semibold text-neutral-950">
          {option.includedLabel}
        </p>
        <ul className="mt-4 space-y-3">
          {option.included.map((item) => (
            <li
              className="flex items-start gap-3 text-sm leading-6 text-neutral-600"
              key={item}
            >
              <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-yellow-400/20 text-neutral-950">
                <Check aria-hidden="true" size={11} strokeWidth={2.4} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex items-start gap-3 rounded-2xl bg-neutral-100/80 p-4">
        <CreditCard
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-neutral-700"
          size={18}
          strokeWidth={1.8}
        />
        <p className="text-sm leading-5 text-neutral-600">
          {option.installment}
        </p>
      </div>

      <Button
        className="mt-6 w-full whitespace-normal text-center"
        onClick={() => onEnroll(option.name)}
      >
        Узнать стоимость и свободные места
      </Button>
    </article>
  );
}
