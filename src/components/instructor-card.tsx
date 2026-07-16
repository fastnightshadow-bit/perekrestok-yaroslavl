"use client";

import { CarFront } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { Instructor } from "@/data/instructors";

type InstructorCardProps = {
  instructor: Instructor;
  onOpen: (instructor: Instructor) => void;
};

export function InstructorCard({
  instructor,
  onOpen,
}: InstructorCardProps) {
  return (
    <article
      aria-label={instructor.name}
      className="interactive-card group min-w-0 overflow-hidden rounded-[1.625rem] border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(18,20,22,0.055)] hover:border-neutral-300 hover:shadow-[0_30px_75px_rgba(18,20,22,0.095)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
        <Image
          alt={`Инструктор ${instructor.name}`}
          className="interactive-image object-cover"
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          src={instructor.image}
          style={{ objectPosition: instructor.imagePosition }}
        />
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-xl font-semibold tracking-[-0.035em] text-neutral-950">
          {instructor.name}
        </h3>
        <div className="mt-4 flex items-start gap-2 text-sm leading-6 text-neutral-600">
          <CarFront
            aria-hidden="true"
            className="mt-1 shrink-0"
            size={16}
            strokeWidth={1.7}
          />
          {instructor.vehicle}
        </div>
        <p className="mt-4 text-sm leading-6 text-neutral-600">
          {instructor.description}
        </p>
        <Button
          className="mt-5 w-full opacity-100 transition-[opacity,transform] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-y-1 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          onClick={() => onOpen(instructor)}
          variant="outline"
        >
          Подробнее
        </Button>
      </div>
    </article>
  );
}
