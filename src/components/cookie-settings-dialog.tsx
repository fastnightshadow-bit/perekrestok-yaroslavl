"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import { Button } from "@/components/ui/button";

export function CookieSettingsDialog() {
  const {
    acceptAll,
    acceptNecessary,
    closeSettings,
    consent,
    settingsOpen,
  } = useCookieConsent();
  const [analytics, setAnalytics] = useState(consent === "accepted");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setAnalytics(consent === "accepted");
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSettings();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [closeSettings, consent, settingsOpen]);

  if (!settingsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-neutral-950/45 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeSettings();
      }}
    >
      <div
        aria-labelledby="cookie-settings-title"
        aria-modal="true"
        className="modal-panel-enter w-full max-w-lg rounded-[1.5rem] bg-white p-5 shadow-2xl sm:p-7"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className="text-2xl font-semibold tracking-[-0.04em] text-neutral-950"
              id="cookie-settings-title"
            >
              Настройки cookie
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Выберите, какие данные можно использовать на сайте.
            </p>
          </div>
          <button
            aria-label="Закрыть настройки cookie"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-neutral-200 outline-none hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-yellow-400"
            onClick={closeSettings}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-neutral-950">Необходимые</p>
                <p className="mt-1 text-sm leading-5 text-neutral-600">
                  Сохраняют ваш выбор и обеспечивают основные функции.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
                Всегда
              </span>
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-neutral-200 p-4">
            <span>
              <span className="block font-semibold text-neutral-950">
                Аналитика
              </span>
              <span className="mt-1 block text-sm leading-5 text-neutral-600">
                Поможет понять, как посетители пользуются сайтом.
              </span>
            </span>
            <input
              checked={analytics}
              className="size-5 accent-yellow-400"
              onChange={(event) => setAnalytics(event.target.checked)}
              type="checkbox"
            />
          </label>
        </div>

        <Button
          className="mt-6 w-full"
          onClick={analytics ? acceptAll : acceptNecessary}
        >
          Сохранить выбор
        </Button>
      </div>
    </div>
  );
}
