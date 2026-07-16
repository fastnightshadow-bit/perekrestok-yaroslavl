"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { useEnrollment } from "@/components/enrollment-provider";
import { ProgramCard } from "@/components/program-card";
import { Button } from "@/components/ui/button";
import { programs, type Program } from "@/data/programs";

type ProgramsSectionProps = {
  items?: readonly Program[];
};

export function ProgramsSection({
  items = programs,
}: ProgramsSectionProps) {
  const { openEnrollment } = useEnrollment();

  return (
    <section
      aria-labelledby="programs-title"
      className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28"
      id="programs"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
            Форматы обучения
          </p>
          <h2
            className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
            id="programs-title"
          >
            Выберите программу обучения
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            Сравните форматы и выберите тот, который соответствует вашей цели и
            опыту.
          </p>
        </div>

        {items.length > 0 ? (
          <>
            <div className="mt-10 grid min-w-0 gap-5 sm:mt-14 xl:grid-cols-2">
              {items.map((program) => (
                <ProgramCard
                  key={program.slug}
                  onEnroll={openEnrollment}
                  program={program}
                />
              ))}
            </div>

            <div className="mt-9 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/programs">
                  Все программы
                  <ArrowRight
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.8}
                  />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            action={
              <Button asChild variant="outline">
                <a href="#contacts">Связаться с автошколой</a>
              </Button>
            }
            description="Позвоните или напишите нам — администратор поможет подобрать доступный формат обучения."
            title="Программы временно недоступны"
          />
        )}
      </div>
    </section>
  );
}
