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
      className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-[1.25rem] border border-b-0 border-neutral-200 bg-white/95 px-4 pb-3 pt-3 shadow-[0_-12px_45px_rgba(18,20,22,0.14)] backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:mx-auto sm:max-w-xl sm:rounded-[1.25rem] sm:border sm:p-4 md:left-5 md:right-auto md:mx-0"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-neutral-950">Cookie на сайте</p>
        <button
          className="shrink-0 rounded-lg px-1.5 py-1 text-xs font-semibold text-neutral-600 outline-none transition-colors hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-yellow-400"
          onClick={openSettings}
          type="button"
        >
          Настроить
        </button>
      </div>
      <p className="mt-0.5 text-xs leading-[1.125rem] text-neutral-600 sm:mt-1 sm:text-sm sm:leading-5">
        Обязательные cookie нужны для работы сайта. Аналитика — только с
        вашего согласия. Подробнее — в{" "}
        <a
          className="underline underline-offset-2 hover:text-neutral-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          href={siteConfig.legal.cookies}
        >
          политике cookie
        </a>
        .
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:mt-3">
        <Button className="h-10 px-3" onClick={acceptAll} size="sm">
          Принять
        </Button>
        <Button
          className="h-10 px-3"
          onClick={acceptNecessary}
          size="sm"
          variant="outline"
        >
          Только необходимые
        </Button>
      </div>
    </aside>
  );
}
