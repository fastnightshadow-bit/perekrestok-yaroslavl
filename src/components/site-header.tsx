"use client";

import { Menu, Phone, X } from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { useEnrollment } from "@/components/enrollment-provider";
import { Button } from "@/components/ui/button";
import { contactDetails } from "@/data/contact";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Обучение", href: "#programs" },
  { label: "Стоимость", href: "#pricing" },
  { label: "Инструкторы", href: "#instructors" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const focusableSelector =
  'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const { openConsultation } = useEnrollment();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";

    menuDialogRef.current
      ?.querySelector<HTMLElement>(focusableSelector)
      ?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      (previouslyFocused ?? menuButton)?.focus();
    };
  }, [isMenuOpen]);

  const handleMenuKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusable = Array.from(
      menuDialogRef.current?.querySelectorAll<HTMLElement>(
        focusableSelector,
      ) ?? [],
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

  const handleEnrollmentClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    openConsultation("header");
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 md:h-20",
          isScrolled
            ? "border-b border-neutral-200/80 bg-[#fafaf7]/90 shadow-[0_8px_30px_rgba(18,20,22,0.05)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          <a
            aria-label="Перекрёсток — на главную"
            className="group flex items-center gap-3 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-yellow-400"
            href="#hero"
          >
            <span className="relative text-[1.05rem] font-extrabold tracking-[-0.055em] text-neutral-950 sm:text-xl">
              ПЕРЕКРЁСТОК
              <span
                aria-hidden="true"
                className="absolute -top-1 left-[6.9rem] size-1.5 rounded-full bg-yellow-400 transition-transform group-hover:-translate-y-0.5 sm:left-[8.25rem]"
              />
            </span>
            <span className="hidden border-l border-neutral-300 pl-3 text-[0.625rem] font-semibold uppercase leading-[1.25] tracking-[0.13em] text-neutral-500 sm:block">
              Автошкола
              <br />
              Ярославль
            </span>
          </a>

          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {navigation.map((item) => (
              <a
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              aria-label="Позвонить в автошколу"
              className="hidden size-10 place-items-center rounded-full text-neutral-950 transition-colors hover:bg-neutral-950/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 md:grid xl:hidden"
              href={contactDetails.phoneHref}
            >
              <Phone aria-hidden="true" size={19} strokeWidth={1.8} />
            </a>
            <a
              className="hidden text-right outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-yellow-400 xl:block"
              href={contactDetails.phoneHref}
            >
              <span className="block text-sm font-semibold text-neutral-950">
                {contactDetails.phoneDisplay}
              </span>
              <span className="block text-xs text-neutral-500">
                Позвонить в автошколу
              </span>
            </a>
            <Button asChild size="sm">
              <a href="#enroll" onClick={handleEnrollmentClick}>
                Записаться
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <a
              aria-label="Позвонить в автошколу"
              className="grid size-11 place-items-center rounded-full text-neutral-950 transition-colors hover:bg-neutral-950/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              href={contactDetails.phoneHref}
            >
              <Phone aria-hidden="true" size={20} strokeWidth={1.8} />
            </a>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              className="grid size-11 place-items-center rounded-full text-neutral-950 transition-colors hover:bg-neutral-950/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              onClick={() => setIsMenuOpen((current) => !current)}
              ref={menuButtonRef}
              type="button"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" size={23} strokeWidth={1.8} />
              ) : (
                <Menu aria-hidden="true" size={24} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </header>

        {isMenuOpen ? (
          <div
            aria-label="Мобильная навигация"
            aria-modal="true"
            className="menu-backdrop-enter fixed inset-0 z-40 bg-[#fafaf7] px-5 pb-8 pt-24 md:hidden"
            id="mobile-navigation"
            onKeyDown={handleMenuKeyDown}
            ref={menuDialogRef}
            role="dialog"
          >
            <nav
              aria-label="Мобильное меню"
              className="menu-panel-enter mx-auto flex max-w-lg flex-col"
            >
              {navigation.map((item, index) => (
                <a
                  className="flex items-center justify-between border-b border-neutral-200 py-5 text-2xl font-semibold tracking-[-0.03em] text-neutral-950"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="text-sm font-medium text-neutral-400"
                  >
                    0{index + 1}
                  </span>
                </a>
              ))}
              <a
                className="mt-8 text-lg font-semibold text-neutral-950"
                href={contactDetails.phoneHref}
              >
                {contactDetails.phoneDisplay}
              </a>
              <span className="mt-1 text-sm text-neutral-500">
                Позвонить в автошколу
              </span>
              <Button asChild className="mt-8 w-full" size="lg">
                <a href="#enroll" onClick={handleEnrollmentClick}>
                  Записаться на обучение
                </a>
              </Button>
            </nav>
          </div>
        ) : null}
    </>
  );
}
