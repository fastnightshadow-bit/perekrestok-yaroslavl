"use client";

import { Check, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Tariff } from "@/data/home-content";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  tariff: Tariff;
  onEnroll: (program: string) => void;
};

export function PricingCard({ tariff, onEnroll }: PricingCardProps) {
  return (
    <article
      aria-label={tariff.name}
      className={cn(
        "interactive-card relative flex min-w-0 flex-col rounded-[1.625rem] border bg-white p-6 shadow-[0_20px_60px_rgba(18,20,22,0.055)] hover:shadow-[0_28px_70px_rgba(18,20,22,0.085)] sm:p-8",
        tariff.isPopular
          ? "border-yellow-400/90 ring-1 ring-yellow-400/35"
          : "border-neutral-200",
      )}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
            Автошкола «Перекрёсток»
          </p>
          {tariff.isPopular ? (
            <span className="rounded-full bg-yellow-400 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-neutral-950">
              Популярный выбор
            </span>
          ) : null}
        </div>
        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.045em] text-neutral-950">
          {tariff.name}
        </h3>
        <p className="mt-3 min-h-12 text-[0.9375rem] leading-6 text-neutral-600">
          {tariff.description}
        </p>
      </div>

      <div className="mt-7 border-y border-neutral-200 py-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className="text-3xl font-semibold tracking-[-0.045em] text-neutral-950">
            {tariff.price}
          </span>
        </div>
      </div>

      <div className="mt-6 flex-1" id={`program-${tariff.id}`}>
        <p className="text-sm font-semibold text-neutral-950">
          В стоимость входит
        </p>
        <ul className="mt-4 space-y-3">
          {tariff.included.map((item) => (
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
          {tariff.installment}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <Button className="w-full" onClick={() => onEnroll(tariff.name)}>
          Записаться
        </Button>
        <a
          className="self-center text-sm font-semibold text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          href={`#program-${tariff.id}`}
        >
          Посмотреть программу
        </a>
      </div>
    </article>
  );
}
