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
      className="timeline-enter relative min-w-0 pl-16 lg:pl-0 lg:pt-0"
      style={{ "--timeline-delay": `${index * 45}ms` } as CSSProperties}
    >
      <span className="absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-neutral-950 shadow-[0_8px_24px_rgba(245,197,24,0.22)] lg:relative lg:left-auto lg:top-auto">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="lg:mt-7">
        <span className="grid size-10 place-items-center rounded-[0.875rem] border border-neutral-200 bg-white text-neutral-700 shadow-[0_12px_28px_rgba(18,20,22,0.05)]">
          <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
        </span>
        <h3 className="mt-4 text-lg font-semibold leading-tight tracking-[-0.03em] text-neutral-950">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          {step.description}
        </p>
      </div>
    </li>
  );
}
