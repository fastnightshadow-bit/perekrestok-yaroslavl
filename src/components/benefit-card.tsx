import type { Benefit } from "@/data/home-content";

type BenefitCardProps = {
  benefit: Benefit;
};

export function BenefitCard({ benefit }: BenefitCardProps) {
  const Icon = benefit.icon;

  return (
    <article
      className="interactive-card group min-w-0 rounded-[1.5rem] border border-neutral-200/90 bg-white/80 p-6 shadow-[0_18px_45px_rgba(18,20,22,0.045)] backdrop-blur-sm hover:border-neutral-300 hover:shadow-[0_24px_55px_rgba(18,20,22,0.075)] sm:p-7"
    >
      <span className="grid size-11 place-items-center rounded-[0.875rem] bg-yellow-400/15 text-neutral-950 transition-colors duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-yellow-400">
        <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
      </span>
      <h3 className="mt-7 text-xl font-semibold leading-tight tracking-[-0.035em] text-neutral-950">
        {benefit.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-6 text-neutral-600">
        {benefit.description}
      </p>
    </article>
  );
}
