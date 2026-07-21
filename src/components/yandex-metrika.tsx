"use client";

import { useEffect } from "react";

import { useCookieConsent } from "@/components/cookie-consent-provider";

type YmFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

type WindowWithYm = Window & { ym?: YmFunction };

export function YandexMetrika() {
  const { consent, hydrated } = useCookieConsent();
  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  useEffect(() => {
    if (!hydrated || !counterId) return;

    const windowWithYm = window as WindowWithYm;
    const numericCounterId = Number(counterId);

    if (consent !== "accepted") {
      windowWithYm.ym?.(numericCounterId, "destruct");
      document.querySelector("#yandex-metrika-script")?.remove();
      delete windowWithYm.ym;
      return;
    }

    if (!windowWithYm.ym) {
      const ym: YmFunction = (...args: unknown[]) => {
        ym.a = ym.a || [];
        ym.a.push(args);
      };
      ym.l = Date.now();
      windowWithYm.ym = ym;
    }

    if (!document.querySelector("#yandex-metrika-script")) {
      const script = document.createElement("script");
      script.async = true;
      script.id = "yandex-metrika-script";
      script.src = `https://mc.yandex.ru/metrika/tag.js?id=${encodeURIComponent(counterId)}`;
      document.head.append(script);
    }

    windowWithYm.ym?.(numericCounterId, "init", {
      accurateTrackBounce: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      ssr: true,
      trackLinks: true,
      url: window.location.href,
      webvisor: true,
    });
  }, [consent, counterId, hydrated]);

  return null;
}
