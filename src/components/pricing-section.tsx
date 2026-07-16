"use client";

import { ArrowUpRight, Phone } from "lucide-react";

import { useEnrollment } from "@/components/enrollment-provider";
import { PricingCard } from "@/components/pricing-card";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";
import { tariffs } from "@/data/home-content";
import { schoolFacts } from "@/data/school-facts";

export function PricingSection() {
  const { openConsultation, openEnrollment } = useEnrollment();

  return (
    <section
      aria-labelledby="pricing-title"
      className="bg-[#fafaf7] pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-28"
      id="pricing"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              Стоимость обучения
            </p>
            <h2
              className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
              id="pricing-title"
            >
              Понятная стоимость без скрытых платежей
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:max-w-md lg:pb-1">
            Выберите подходящий формат обучения. Возможна оплата частями.
          </p>
        </div>

        <div className="mt-10 grid min-w-0 items-stretch gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {tariffs.map((tariff, index) => (
            <div
              className={index === 2 ? "md:col-span-2 lg:col-span-1" : ""}
              key={tariff.id}
            >
              <PricingCard onEnroll={openEnrollment} tariff={tariff} />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm leading-6 text-neutral-600 sm:px-6">
          Отдельное практическое занятие — {schoolFacts.singleLessonPrice} за{" "}
          {schoolFacts.singleLessonDuration}. Внутренний экзамен и экзамен
          ГИБДД оплачиваются отдельно после обучения.
        </div>

        <div
          className="mt-8 flex scroll-mt-28 flex-col gap-6 rounded-[1.5rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-[0_24px_70px_rgba(18,20,22,0.1)] sm:mt-10 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          id="enroll"
        >
          <div>
            <p className="max-w-2xl text-xl font-semibold leading-snug tracking-[-0.03em] sm:text-2xl">
              Не уверены, какой тариф выбрать? Получите консультацию
            </p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Поможем разобраться в форматах и ответим на вопросы об обучении.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              className="w-full sm:w-auto"
              onClick={openConsultation}
              size="default"
            >
              Получить консультацию
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.9} />
            </Button>
            <Button
              asChild
              className="w-full border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10 sm:w-auto"
              size="default"
              variant="outline"
            >
              <a href={contactDetails.phoneHref}>
                <Phone aria-hidden="true" size={17} strokeWidth={1.8} />
                Позвонить
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
