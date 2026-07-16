"use client";

import { useCallback, useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { useEnrollment } from "@/components/enrollment-provider";
import { InstructorCard } from "@/components/instructor-card";
import { InstructorModal } from "@/components/instructor-modal";
import { instructors, type Instructor } from "@/data/instructors";

type InstructorsSectionProps = {
  items?: readonly Instructor[];
};

export function InstructorsSection({
  items = instructors,
}: InstructorsSectionProps) {
  const { openEnrollment } = useEnrollment();
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

  const closeModal = useCallback(() => {
    setSelectedInstructor(null);
  }, []);

  const enrollWithInstructor = useCallback((instructor: Instructor) => {
    openEnrollment(`Инструктор: ${instructor.name}`);
    setSelectedInstructor(null);
  }, [openEnrollment]);

  return (
    <section
      aria-labelledby="instructors-title"
      className="bg-[#fafaf7] pb-[calc(8.5rem+env(safe-area-inset-bottom))] pt-20 sm:pt-24 md:pb-28 lg:pb-32 lg:pt-28"
      id="instructors"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
            Люди, которые будут рядом
          </p>
          <h2
            className="mt-5 text-[clamp(2.35rem,4.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-neutral-950"
            id="instructors-title"
          >
            Наши инструкторы
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
            Опытные наставники, которые спокойно объясняют, поддерживают и
            помогают почувствовать уверенность за рулём.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-neutral-600">
            Имена и автомобили — по данным официального сайта автошколы
          </p>
        </div>

        {items.length > 0 ? (
          <div className="mt-10 grid min-w-0 gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((instructor) => (
              <InstructorCard
                instructor={instructor}
                key={instructor.id}
                onOpen={setSelectedInstructor}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Позвоните администратору — актуальный список инструкторов подскажем по телефону."
            title="Инструкторы временно недоступны"
          />
        )}
      </div>

      <InstructorModal
        instructor={selectedInstructor}
        onClose={closeModal}
        onEnroll={enrollWithInstructor}
      />
    </section>
  );
}
