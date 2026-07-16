import { BookOpen, CarFront, GraduationCap, Route } from "lucide-react";

import type { ProgramVisualKind } from "@/data/programs";

type ProgramVisualProps = {
  kind: ProgramVisualKind;
};

export function ProgramVisual({ kind }: ProgramVisualProps) {
  if (kind === "category-b") {
    return (
      <div className="relative h-full overflow-hidden bg-yellow-400 text-neutral-950">
        <span className="absolute -right-10 -top-10 size-48 rounded-full bg-white/35" />
        <span className="absolute bottom-7 left-7 grid size-28 place-items-center rounded-[1.5rem] bg-neutral-950 text-white shadow-[0_24px_50px_rgba(18,20,22,0.2)]">
          <GraduationCap aria-hidden="true" size={57} strokeWidth={1.25} />
        </span>
        <span className="absolute left-7 top-7 text-xs font-bold uppercase tracking-[0.17em]">
          Полный путь к правам
        </span>
      </div>
    );
  }

  if (kind === "theory") {
    return (
      <div className="relative h-full overflow-hidden bg-[#e9e5da] text-neutral-950">
        <span className="absolute -right-12 -top-14 size-52 rounded-full border-[34px] border-white/55" />
        <span className="absolute bottom-8 right-10 grid size-28 place-items-center rounded-full border border-neutral-950/10 bg-white/75 shadow-[0_20px_45px_rgba(18,20,22,0.12)] backdrop-blur-sm">
          <BookOpen aria-hidden="true" size={52} strokeWidth={1.35} />
        </span>
        <span className="absolute left-7 top-7 text-xs font-bold uppercase tracking-[0.17em] text-neutral-600">
          Понятная теория
        </span>
      </div>
    );
  }

  if (kind === "driving") {
    return (
      <div className="relative h-full overflow-hidden bg-neutral-950 text-white">
        <span className="absolute -bottom-16 -left-12 size-56 rounded-full border border-white/10" />
        <span className="absolute -bottom-8 -left-4 size-40 rounded-full border border-white/10" />
        <CarFront
          aria-hidden="true"
          className="absolute bottom-8 left-8 text-yellow-400"
          size={86}
          strokeWidth={1.15}
        />
        <span className="absolute right-8 top-8 text-5xl font-semibold tracking-[-0.08em] text-white/40">
          57 ч
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#e7edef] text-neutral-950">
      <span className="absolute -right-14 bottom-0 h-28 w-[85%] rotate-[-8deg] rounded-full border-[22px] border-white/70" />
      <span className="absolute left-8 top-8 grid size-24 place-items-center rounded-full bg-white shadow-[0_20px_45px_rgba(18,20,22,0.1)]">
        <Route aria-hidden="true" size={46} strokeWidth={1.35} />
      </span>
      <span className="absolute bottom-9 right-9 rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]">
        1,5 часа
      </span>
    </div>
  );
}
