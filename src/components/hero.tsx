import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { EnrollmentTrigger } from "@/components/enrollment-trigger";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { contactDetails } from "@/data/contact";
import { schoolFacts } from "@/data/school-facts";

const desktopAdvantages = [
  "Центр Ярославля",
  "Оплата частями",
  "Экзамен на знакомом авто",
];

const mobileAdvantages = [
  { icon: CalendarDays, label: "Гибкий график" },
  { icon: MapPin, label: "В центре города" },
  { icon: CreditCard, label: "Рассрочка на обучение" },
];

function animationDelay(delay: number) {
  return { "--hero-delay": `${delay}ms` } as CSSProperties;
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-neutral-950 pt-0 lg:flex lg:items-center lg:bg-[#fafaf7] lg:pb-8 lg:pt-28"
      id="hero"
    >
      <div
        className="relative mx-auto h-[100svh] w-full max-w-[1440px] px-0 lg:grid lg:h-auto lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12 xl:gap-16 xl:px-16"
        data-testid="hero-layout"
      >
        <div
          className="absolute inset-x-6 bottom-5 z-20 w-auto text-white sm:inset-x-10 sm:bottom-8 lg:relative lg:inset-auto lg:order-1 lg:col-span-5 lg:w-full lg:py-8 lg:text-neutral-950"
          data-testid="hero-content"
        >
          <p
            className="hero-enter mb-6 hidden text-sm font-bold uppercase tracking-[0.16em] text-neutral-500 lg:block"
            style={animationDelay(0)}
          >
            Автошкола «Перекрёсток» · Ярославль
          </p>

          <h1
            aria-label="Автошкола Перекрёсток — обучение вождению категории B в Ярославле"
            className="max-w-[11ch] text-[clamp(2.2rem,10.8vw,3.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] lg:max-w-[12ch] lg:text-[clamp(3.25rem,6.2vw,5.75rem)] lg:tracking-[-0.065em]"
            id="hero-title"
          >
            <span aria-hidden="true" className="lg:hidden">
              <span className="block">Научим уверенно водить</span>
              <span className="block text-yellow-400">в Ярославле</span>
            </span>
            <span aria-hidden="true" className="hidden lg:block">
              Спокойно научим уверенно водить
            </span>
          </h1>

          <p
            className="hero-enter mt-7 hidden max-w-xl text-lg leading-8 text-neutral-600 lg:block"
            style={animationDelay(160)}
          >
            Категория B на МКПП или АКПП: теория, 28 занятий с инструктором
            и подготовка к экзамену.
          </p>

          <div
            className="hero-enter mt-4 lg:hidden"
            style={animationDelay(240)}
          >
            <p className="text-sm font-medium leading-5 text-white/85">
              Категория B
              <br />
              МКПП и АКПП
            </p>
          </div>

          <div
            className="hero-enter mt-8 hidden flex-wrap items-end justify-start gap-x-8 gap-y-3 lg:flex"
            style={animationDelay(240)}
          >
            <div>
              <p className="text-sm font-medium text-neutral-500">
                Обучение категории B
              </p>
              <p className="mt-1 text-[2.15rem] font-semibold tracking-[-0.045em] text-neutral-950">
                {schoolFacts.fullCoursePrice}
              </p>
            </div>
            <div className="flex items-center gap-2 pb-1 text-sm font-semibold leading-5 text-neutral-700">
              <BadgeCheck
                aria-hidden="true"
                className="text-yellow-500"
                size={18}
              />
              <span>{schoolFacts.firstTryPassRate} учеников сдают с первого раза</span>
            </div>
          </div>

          <div
            className="hero-enter mt-5 lg:hidden"
            style={animationDelay(320)}
          >
            <EnrollmentTrigger
              className="h-12 w-full rounded-lg px-5 text-sm"
              source="hero-mobile"
            >
              Записаться на обучение
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
            </EnrollmentTrigger>
          </div>

          <div
            className="hero-enter mt-8 hidden flex-col gap-3 lg:flex lg:flex-row"
            style={animationDelay(320)}
          >
            <EnrollmentTrigger className="w-full sm:w-auto" size="lg" source="hero">
              Получить консультацию
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.9} />
            </EnrollmentTrigger>
            <Button
              asChild
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
            >
              <a href={contactDetails.phoneHref}>
                <Phone aria-hidden="true" size={18} strokeWidth={1.9} />
                Позвонить
              </a>
            </Button>
          </div>

          <ul
            className="hero-enter mt-5 grid grid-cols-3 items-start border-t border-white/20 pt-4 text-center text-[0.65rem] font-medium leading-4 text-white/85 lg:hidden"
            data-testid="mobile-advantages"
            style={animationDelay(400)}
          >
            {mobileAdvantages.map(({ icon: Icon, label }) => (
              <li
                className="grid min-w-0 grid-rows-[1.5rem_2.5rem] content-start place-items-center border-white/20 px-1.5 [&:not(:first-child)]:border-l"
                key={label}
              >
                <Icon
                  aria-hidden="true"
                  className="text-yellow-400"
                  size={20}
                  strokeWidth={1.7}
                />
                <span className="self-start text-balance">{label}</span>
              </li>
            ))}
          </ul>

          <ul
            className="hero-enter mt-9 hidden flex-wrap gap-x-5 gap-y-3 border-t border-neutral-200 pt-5 text-sm font-medium text-neutral-600 lg:flex"
            style={animationDelay(400)}
          >
            {desktopAdvantages.map((advantage, index) => (
              <li className="flex items-center gap-5" key={advantage}>
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="h-4 w-px bg-neutral-300"
                  />
                ) : null}
                {advantage}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="hero-media-enter absolute inset-0 h-[100svh] w-full overflow-hidden rounded-none bg-neutral-950 lg:relative lg:inset-auto lg:order-2 lg:col-span-7 lg:h-[calc(100svh-8rem)] lg:max-h-[760px] lg:min-h-[620px] lg:rounded-[1.75rem] lg:bg-neutral-200 lg:shadow-[0_30px_80px_rgba(18,20,22,0.12)]"
          data-testid="hero-media"
        >
          <div
            className="absolute inset-x-0 top-0 h-[86svh] [mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] lg:hidden"
            data-testid="hero-mobile-image"
          >
            <Image
              alt="Инструктор автошколы разговаривает с ученицей в учебном автомобиле"
              className="object-cover object-center"
              fill
              priority
              quality={92}
              sizes="100vw"
              src={siteConfig.heroImage}
            />
          </div>
          <Image
            alt=""
            className="hidden object-cover object-center lg:block"
            fill
            priority
            sizes="(max-width: 1023px) 1px, 58vw"
            src={siteConfig.heroImage}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-[3] h-32 bg-gradient-to-b from-white/70 via-transparent to-transparent lg:hidden"
            data-testid="hero-mobile-fade"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(8,10,12,0.01)_0%,rgba(8,10,12,0.03)_30%,rgba(8,10,12,0.18)_46%,rgba(8,10,12,0.68)_64%,rgba(8,10,12,0.94)_78%,rgb(10,11,12)_91%,rgb(10,11,12)_100%)] lg:bg-gradient-to-t lg:from-neutral-950/30 lg:via-transparent lg:to-white/5"
          />
        </div>
      </div>
    </section>
  );
}
