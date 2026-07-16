"use client";

import { X } from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
} from "react";

import { EnrollmentForm } from "@/components/enrollment-form";

type EnrollmentModalProps = {
  isOpen: boolean;
  selectedProgram: string;
  onClose: () => void;
};

const focusableSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function EnrollmentModal({
  isOpen,
  selectedProgram,
  onClose,
}: EnrollmentModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    nameInputRef.current?.focus();

    const handleDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleDocumentKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
        <div
          aria-labelledby={titleId}
          aria-modal="true"
          className="modal-backdrop-enter fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-neutral-950/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          data-testid="enrollment-modal-backdrop"
          onMouseDown={handleBackdropMouseDown}
          role="dialog"
        >
          <div
            className="modal-panel-enter relative w-full max-w-lg rounded-[1.625rem] bg-[#fafaf7] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:p-8"
            onKeyDown={handleDialogKeyDown}
            onMouseDown={(event) => event.stopPropagation()}
            ref={dialogRef}
          >
            <button
              aria-label="Закрыть форму"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-950/[0.06] hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              onClick={onClose}
              type="button"
            >
              <X aria-hidden="true" size={20} strokeWidth={1.8} />
            </button>

            <p className="pr-12 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
              Автошкола «Перекрёсток»
            </p>
            <h2
              className="mt-4 pr-10 text-3xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-4xl"
              id={titleId}
            >
              Заявка на обучение
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600 sm:text-base">
              Оставьте контакты — администратор уточнит детали и ответит на
              вопросы.
            </p>

            <div className="mt-7">
              <EnrollmentForm
                nameInputRef={nameInputRef}
                selectedProgram={selectedProgram}
                showProgram
              />
            </div>
          </div>
        </div>
  );
}
