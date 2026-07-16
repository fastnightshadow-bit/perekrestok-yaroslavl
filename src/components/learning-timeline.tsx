"use client";

import { ArrowUpRight, Phone } from "lucide-react";

import { useEnrollment } from "@/components/enrollment-provider";
import { TimelineStep } from "@/components/timeline-step";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";
import { learningSteps } from "@/data/learning-steps";

export function LearningTimeline() {
  const { openEnrollment } = useEnrollment();

  return (
    <section
      aria-labelledby="learning-title"
      className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28"
      id="learning"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
            Путь к водительским правам
          </p>
          <h2
            className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
            id="learning-title"
          >
            Как проходит обучение
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            От первой заявки до получения удостоверения — понятный путь, на
            котором мы остаёмся рядом.
          </p>
        </div>

        <ol className="relative mt-12 grid min-w-0 gap-9 before:absolute before:bottom-4 before:left-5 before:top-5 before:w-px before:bg-neutral-300 lg:grid-cols-7 lg:gap-5 lg:before:bottom-auto lg:before:left-[5%] lg:before:right-[5%] lg:before:top-5 lg:before:h-px lg:before:w-auto">
          {learningSteps.map((step, index) => (
            <TimelineStep index={index} key={step.id} step={step} />
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-7 rounded-[1.75rem] bg-neutral-950 p-6 text-white shadow-[0_28px_85px_rgba(18,20,22,0.12)] sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Начните обучение уже сегодня
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
              Мы поможем пройти путь до получения водительских прав спокойно и
              уверенно.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              className="w-full sm:w-auto"
              onClick={() => openEnrollment("Запись на обучение")}
            >
              Записаться
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </Button>
            <Button
              asChild
              className="w-full border-white/20 bg-white/5 text-white hover:border-white/45 hover:bg-white/10 sm:w-auto"
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
