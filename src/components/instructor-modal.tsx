"use client";

import { CarFront, Check, X } from "lucide-react";
import Image from "next/image";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import type { Instructor } from "@/data/instructors";

type InstructorModalProps = {
  instructor: Instructor | null;
  onClose: () => void;
  onEnroll: (instructor: Instructor) => void;
};

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const schoolAdvantages = [
  "Практические занятия с инструктором",
  "Подготовка к городским маршрутам",
  "Экзамен на знакомом учебном автомобиле",
];

export function InstructorModal({
  instructor,
  onClose,
  onEnroll,
}: InstructorModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!instructor) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [instructor, onClose]);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      event.preventDefault();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!instructor || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="modal-backdrop-enter fixed inset-0 z-[65] flex items-center justify-center overflow-y-auto bg-neutral-950/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div
        className="modal-panel-enter relative grid max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] bg-[#fafaf7] shadow-[0_35px_110px_rgba(0,0,0,0.28)] sm:max-h-[calc(100dvh-3rem)] lg:grid-cols-[0.9fr_1.1fr]"
        onKeyDown={handleDialogKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
      >
        <button
          aria-label="Закрыть информацию об инструкторе"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-neutral-700 shadow-md backdrop-blur-md transition-colors hover:bg-white hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={20} strokeWidth={1.8} />
        </button>

        <div className="relative min-h-72 overflow-hidden bg-neutral-200 sm:min-h-96 lg:min-h-[38rem]">
          <Image
            alt={`Инструктор ${instructor.name}`}
            className="object-cover"
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            src={instructor.image}
            style={{ objectPosition: instructor.imagePosition }}
          />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
            Инструктор автошколы
          </p>
          <h2
            className="mt-4 pr-10 text-3xl font-semibold tracking-[-0.05em] text-neutral-950 sm:text-5xl"
            id={titleId}
          >
            Инструктор {instructor.name}
          </h2>

          <div className="mt-7 rounded-[1.25rem] bg-neutral-100 p-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              <CarFront aria-hidden="true" size={17} strokeWidth={1.7} />
              Учебный автомобиль
            </p>
            <p className="mt-2 font-semibold text-neutral-950">
              {instructor.vehicle}
            </p>
          </div>

          <p className="mt-7 text-base leading-7 text-neutral-600">
            {instructor.description} Условия и удобное время занятий можно
            уточнить у администратора.
          </p>

          <ul className="mt-7 space-y-3">
            {schoolAdvantages.map((advantage) => (
              <li
                className="flex items-center gap-3 text-sm font-medium text-neutral-700"
                key={advantage}
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-yellow-400/25 text-neutral-950">
                  <Check aria-hidden="true" size={12} strokeWidth={2.4} />
                </span>
                {advantage}
              </li>
            ))}
          </ul>

          <Button
            className="mt-8 w-full"
            onClick={() => onEnroll(instructor)}
            size="lg"
          >
            Записаться именно к этому инструктору
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
