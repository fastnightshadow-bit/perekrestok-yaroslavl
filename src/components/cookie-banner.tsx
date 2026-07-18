"use client";

import { useCookieConsent } from "@/components/cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function CookieBanner() {
  const {
    acceptAll,
    acceptNecessary,
    consent,
    hydrated,
    openSettings,
    settingsOpen,
  } = useCookieConsent();

  if (!hydrated || consent || settingsOpen) return null;

  return (
    <aside
      aria-label="Настройки cookie"
      className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-3 right-3 z-[70] mx-auto max-w-3xl rounded-[1.25rem] border border-neutral-200 bg-white/95 p-4 shadow-[0_20px_65px_rgba(18,20,22,0.18)] backdrop-blur-xl md:bottom-5 md:left-5 md:right-auto md:mx-0 md:max-w-xl"
    >
      <p className="text-sm font-semibold text-neutral-950">Настройки cookie</p>
      <p className="mt-1 text-xs leading-5 text-neutral-600 sm:text-sm">
        Необходимые данные обеспечивают работу сайта. Аналитику подключим
        только с вашего согласия. Подробнее — в{" "}
        <a
          className="underline underline-offset-2 hover:text-neutral-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          href={siteConfig.legal.cookies}
        >
          политике cookie
        </a>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button onClick={acceptAll} size="sm">
          Принять
        </Button>
        <Button onClick={acceptNecessary} size="sm" variant="outline">
          Только необходимые
        </Button>
        <button
          className="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-600 outline-none transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-yellow-400"
          onClick={openSettings}
          type="button"
        >
          Настроить
        </button>
      </div>
    </aside>
  );
}
