import type { CSSProperties } from "react";

import type { LearningStep } from "@/data/learning-steps";

type TimelineStepProps = {
  index: number;
  step: LearningStep;
};

export function TimelineStep({ index, step }: TimelineStepProps) {
  const Icon = step.icon;

  return (
    <li
      className="timeline-enter relative min-w-0 pl-16 before:absolute before:-bottom-9 before:left-5 before:top-5 before:w-px before:bg-neutral-300 last:before:hidden lg:rounded-[1.5rem] lg:border lg:border-neutral-200 lg:bg-white lg:p-7 lg:pl-7 lg:shadow-[0_18px_55px_rgba(18,20,22,0.045)] lg:before:hidden"
      style={{ "--timeline-delay": `${index * 55}ms` } as CSSProperties}
    >
      <span className="absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-neutral-950 shadow-[0_8px_24px_rgba(245,197,24,0.22)] lg:left-7 lg:top-7">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="lg:pl-14">
        <span className="grid size-10 place-items-center rounded-[0.875rem] border border-neutral-200 bg-white text-neutral-700 shadow-[0_12px_28px_rgba(18,20,22,0.05)] lg:bg-neutral-50">
          <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
        </span>
        <h3 className="mt-4 text-lg font-semibold leading-tight tracking-[-0.03em] text-neutral-950 sm:text-xl">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          {step.description}
        </p>
        {step.details ? (
          <ul className="mt-4 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
            {step.details.map((detail) => (
              <li className="flex items-center gap-2" key={detail}>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-yellow-400" />
                {detail}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
