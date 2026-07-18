import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { EnrollmentTrigger } from "@/components/enrollment-trigger";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { schoolFacts } from "@/data/school-facts";

const advantages = ["Центр Ярославля", "Оплата частями", "Экзамен на знакомом авто"];

function animationDelay(delay: number) {
  return { "--hero-delay": `${delay}ms` } as CSSProperties;
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-[#fafaf7] pb-8 pt-24 sm:pb-10 md:pt-28 lg:items-center lg:pb-8"
      id="hero"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 items-start gap-x-3 gap-y-8 px-5 sm:gap-x-6 sm:px-8 lg:items-center lg:gap-10 lg:px-12 xl:gap-16 xl:px-16">
        <div className="relative z-10 col-span-7 lg:col-span-5 lg:py-8">
            <p
              className="hero-enter mb-4 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-neutral-500 sm:mb-6 sm:text-sm"
              style={animationDelay(0)}
            >
              Автошкола «Перекрёсток» · Ярославль
            </p>

            <h1
              className="max-w-[12ch] text-[clamp(2.15rem,9.6vw,3.25rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-neutral-950 lg:text-[clamp(3.25rem,6.2vw,5.75rem)]"
              id="hero-title"
            >
              Спокойно научим уверенно водить
            </h1>

            <p
              className="hero-enter mt-5 max-w-xl text-sm leading-6 text-neutral-600 sm:mt-7 sm:text-lg sm:leading-8"
              style={animationDelay(160)}
            >
              Категория B на МКПП или АКПП: теория, 28 занятий с инструктором
              и подготовка к экзамену.
            </p>

            <div
              className="hero-enter mt-6 flex flex-wrap items-end gap-x-8 gap-y-3 sm:mt-8 sm:gap-y-4"
              style={animationDelay(240)}
            >
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Обучение категории B
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[2.15rem]">
                  {schoolFacts.fullCoursePrice}
                </p>
              </div>
              <div className="flex items-start gap-2 pb-1 text-xs font-semibold leading-5 text-neutral-700 sm:items-center sm:text-sm">
                <BadgeCheck
                  aria-hidden="true"
                  className="text-yellow-500"
                  size={18}
                />
                <span>{schoolFacts.firstTryPassRate} учеников сдают с первого раза</span>
              </div>
            </div>

            <div
              className="hero-enter mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row"
              style={animationDelay(320)}
            >
              <EnrollmentTrigger className="w-full sm:w-auto" size="lg" source="hero">
                Записаться на обучение
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.9} />
              </EnrollmentTrigger>
              <Button
                asChild
                className="w-full sm:w-auto"
                size="lg"
                variant="outline"
              >
                <a href="#programs">Подобрать программу</a>
              </Button>
            </div>

            <ul
              className="hero-enter mt-7 hidden flex-wrap gap-x-5 gap-y-3 border-t border-neutral-200 pt-5 text-sm font-medium text-neutral-600 sm:flex lg:mt-9"
              style={animationDelay(400)}
            >
              {advantages.map((advantage, index) => (
                <li className="flex items-center gap-5" key={advantage}>
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-4 w-px bg-neutral-300 sm:block"
                    />
                  ) : null}
                  {advantage}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="hero-media-enter relative col-span-5 min-h-[30rem] overflow-hidden rounded-[1.25rem] bg-neutral-200 shadow-[0_30px_80px_rgba(18,20,22,0.12)] sm:min-h-[38rem] sm:rounded-[1.75rem] lg:col-span-7 lg:h-[calc(100svh-8rem)] lg:max-h-[760px] lg:min-h-[620px]"
          >
            <Image
              alt="Инструктор автошколы разговаривает с ученицей в учебном автомобиле"
              className="object-cover object-[66%_center] lg:object-center"
              fill
              priority
              sizes="(max-width: 1023px) 42vw, 58vw"
              src={siteConfig.heroImage}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-white/5"
            />
            <div className="absolute bottom-5 left-5 hidden rounded-xl border border-white/25 bg-neutral-950/70 px-4 py-3 text-white shadow-lg backdrop-blur-md sm:bottom-7 sm:left-7 sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                Практика
              </p>
              <p className="mt-1 text-sm font-semibold sm:text-base">
                Спокойно. Понятно. В вашем темпе.
              </p>
            </div>
          </div>
        </div>
    </section>
  );
}
