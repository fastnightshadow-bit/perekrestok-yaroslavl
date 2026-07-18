"use client";

import { ArrowUpRight, Phone } from "lucide-react";

import { useEnrollment } from "@/components/enrollment-provider";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";

export function FinalCta() {
  const { openEnrollment } = useEnrollment();

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-[#24272a] py-20 text-white sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-80 rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-4 top-20 size-44 rounded-full border border-yellow-400/15"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16 lg:px-12 xl:px-16">
        <div className="max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-400 sm:text-sm">
            Начните с простого действия
          </p>
          <h2
            className="mt-5 text-[clamp(2.65rem,5.7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
            id="final-cta-title"
          >
            Сделайте первый шаг к водительским правам уже сегодня
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-xl sm:leading-8">
            Оставьте заявку и мы поможем подобрать программу обучения.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <Button
            className="w-full sm:w-auto lg:min-w-52"
            onClick={() =>
              openEnrollment("Заявка с финального экрана", "final-cta")
            }
            size="lg"
          >
            Записаться
            <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.8} />
          </Button>
          <Button
            asChild
            className="w-full border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10 sm:w-auto lg:min-w-52"
            size="lg"
            variant="outline"
          >
            <a href={contactDetails.phoneHref}>
              <Phone aria-hidden="true" size={18} strokeWidth={1.8} />
              Позвонить
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
