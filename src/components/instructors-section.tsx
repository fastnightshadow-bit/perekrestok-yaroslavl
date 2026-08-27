"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { useEnrollment } from "@/components/enrollment-provider";
import { InstructorCard } from "@/components/instructor-card";
import { InstructorModal } from "@/components/instructor-modal";
import { Button } from "@/components/ui/button";
import { instructors, type Instructor } from "@/data/instructors";

type InstructorsSectionProps = {
  items?: readonly Instructor[];
};

export function InstructorsSection({
  items = instructors,
}: InstructorsSectionProps) {
  const { openEnrollment } = useEnrollment();
  const instructorsRef = useRef<HTMLDivElement>(null);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

  const scrollInstructors = (direction: -1 | 1) => {
    const container = instructorsRef.current;

    if (!container || typeof container.scrollBy !== "function") {
      return;
    }

    container.scrollBy({
      behavior: "smooth",
      left: direction * Math.min(container.clientWidth * 0.85, 560),
    });
  };

  const closeModal = useCallback(() => {
    setSelectedInstructor(null);
  }, []);

  const enrollWithInstructor = useCallback((instructor: Instructor) => {
    openEnrollment(`Инструктор: ${instructor.name}`, "instructors");
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
            Имена, стаж и состав команды — по официальным материалам автошколы
          </p>
        </div>

        {items.length > 0 ? (
          <>
            <div className="mt-9 flex items-center justify-between gap-4 sm:hidden">
              <p className="text-sm text-neutral-500">
                Листайте, чтобы увидеть всех
              </p>
              <div className="flex gap-2">
                <Button
                  aria-label="Предыдущие инструкторы"
                  onClick={() => scrollInstructors(-1)}
                  size="icon"
                  variant="outline"
                >
                  <ArrowLeft aria-hidden="true" size={19} />
                </Button>
                <Button
                  aria-label="Следующие инструкторы"
                  onClick={() => scrollInstructors(1)}
                  size="icon"
                  variant="outline"
                >
                  <ArrowRight aria-hidden="true" size={19} />
                </Button>
              </div>
            </div>
            <div
              aria-label="Лента инструкторов"
              className="-mx-5 mt-4 flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 scroll-px-5 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
              ref={instructorsRef}
              role="group"
            >
              {items.map((instructor) => (
                <div
                  className="w-[82vw] max-w-[22rem] shrink-0 snap-start sm:w-auto sm:max-w-none"
                  key={instructor.id}
                >
                  <InstructorCard
                    instructor={instructor}
                    onOpen={setSelectedInstructor}
                  />
                </div>
              ))}
            </div>
          </>
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
