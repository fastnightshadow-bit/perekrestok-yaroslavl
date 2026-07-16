"use client";

import { ArrowUpRight, Clock3, MonitorPlay } from "lucide-react";
import Link from "next/link";

import { ProgramVisual } from "@/components/program-visual";
import { Button } from "@/components/ui/button";
import type { Program } from "@/data/programs";

type ProgramCardProps = {
  program: Program;
  onEnroll: (program: string) => void;
};

export function ProgramCard({ program, onEnroll }: ProgramCardProps) {
  return (
    <article
      aria-label={program.name}
      className="interactive-card group grid min-w-0 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-[0_22px_65px_rgba(18,20,22,0.055)] hover:border-neutral-300 hover:shadow-[0_30px_80px_rgba(18,20,22,0.085)] sm:grid-cols-[0.92fr_1.08fr]"
    >
      <div className="min-h-56 overflow-hidden sm:min-h-full">
        <ProgramVisual kind={program.visual} />
      </div>

      <div className="flex min-w-0 flex-col p-6 sm:p-7 lg:p-8">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.045em] text-neutral-950 sm:text-[1.75rem]">
          {program.name}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-6 text-neutral-600">
          {program.description}
        </p>

        <dl className="mt-7 grid gap-4 border-y border-neutral-200 py-5">
          <div>
            <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              <Clock3
                aria-hidden="true"
                className="shrink-0"
                size={18}
                strokeWidth={1.7}
              />
              <span>
                Объём
              </span>
            </dt>
            <dd className="ml-[1.875rem] mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-950">
              {program.volume}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              <MonitorPlay
                aria-hidden="true"
                className="shrink-0"
                size={18}
                strokeWidth={1.7}
              />
              <span>
                Формат
              </span>
            </dt>
            <dd className="ml-[1.875rem] mt-1 text-sm font-semibold text-neutral-950">
              {program.format}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button asChild className="w-full" variant="outline">
            <Link href={`/programs/${program.slug}`}>
              Посмотреть программу
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </Link>
          </Button>
          <Button
            className="w-full"
            onClick={() => onEnroll(program.name)}
          >
            Записаться
          </Button>
        </div>
      </div>
    </article>
  );
}
