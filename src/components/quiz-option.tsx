import { Check } from "lucide-react";

import type { QuizOptionData } from "@/data/quiz";
import { cn } from "@/lib/utils";

type QuizOptionProps = {
  name: string;
  option: QuizOptionData;
  selected: boolean;
  onSelect: (value: QuizOptionData["id"]) => void;
};

export function QuizOption({
  name,
  option,
  selected,
  onSelect,
}: QuizOptionProps) {
  return (
    <label
      className={cn(
        "group relative flex min-h-20 cursor-pointer items-center justify-between gap-4 rounded-[1.125rem] border p-4 text-left transition-[background-color,border-color,transform] duration-200 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-offset-2 focus-within:ring-offset-neutral-950 sm:min-h-24 sm:p-5",
        selected
          ? "border-yellow-400 bg-yellow-400/12 text-white"
          : "border-white/15 bg-white/[0.045] text-white/80 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07]",
      )}
    >
      <input
        checked={selected}
        className="sr-only"
        name={name}
        onChange={() => onSelect(option.id)}
        type="radio"
        value={option.id}
      />
      <span className="text-[0.9375rem] font-semibold leading-6 sm:text-base">
        {option.label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-full border transition-colors",
          selected
            ? "border-yellow-400 bg-yellow-400 text-neutral-950"
            : "border-white/25 bg-transparent text-transparent",
        )}
      >
        <Check size={14} strokeWidth={2.5} />
      </span>
    </label>
  );
}
