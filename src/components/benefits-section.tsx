import { BenefitCard } from "@/components/benefit-card";
import { benefits } from "@/data/home-content";

export function BenefitsSection() {
  return (
    <section
      aria-labelledby="benefits-title"
      className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28"
      id="advantages"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
            Всё важное для спокойного старта
          </p>
          <h2
            className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
            id="benefits-title"
          >
            Почему выбирают Перекрёсток
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            Понятные условия и поддержка, чтобы сосредоточиться на главном —
            уверенном вождении.
          </p>
        </div>

        <div className="mt-10 grid min-w-0 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <BenefitCard benefit={benefit} key={benefit.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
